
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { Building, BuildingStatus } from '@/components/maitrejeu/types/batiments';
import { GameDate } from '@/utils/types/gameDate';

/**
 * Calcule le coût de maintenance d'un bâtiment en fonction de ses propriétés
 */
export const calculateMaintenanceCost = (building: OwnedBuilding): number => {
  const baseCost = building.maintenanceCost || 0;
  const maintenanceLevel = building.maintenanceLevel || 1;
  
  // Coût de maintenance augmente avec le niveau de maintenance
  const maintenanceMultiplier = [0.5, 1, 1.5, 2, 2.5];
  const multiplierIndex = Math.min(Math.max(0, maintenanceLevel - 1), 4);
  
  // Ajustement basé sur la condition du bâtiment
  const conditionFactor = Math.max(0.5, building.condition / 100);
  
  // Coût final
  return Math.round(baseCost * maintenanceMultiplier[multiplierIndex] * conditionFactor);
};

/**
 * Calcule le revenu d'un bâtiment en fonction de ses propriétés
 */
export const calculateBuildingIncome = (building: OwnedBuilding): number => {
  const baseIncome = building.income || 0;
  const maintenanceLevel = building.maintenanceLevel || 1;
  
  // Revenus augmentent avec le niveau de maintenance
  const incomeMultiplier = [0.7, 1, 1.2, 1.4, 1.5];
  const multiplierIndex = Math.min(Math.max(0, maintenanceLevel - 1), 4);
  
  // Ajustement basé sur la condition du bâtiment
  const conditionFactor = Math.max(0.5, building.condition / 100);
  
  // Ajustement basé sur le nombre de travailleurs
  const maxWorkers = building.maxWorkers || 1;
  const workerEfficiency = Math.min(1, (building.workers || 0) / maxWorkers);
  
  // Revenu final
  return Math.round(baseIncome * incomeMultiplier[multiplierIndex] * conditionFactor * workerEfficiency);
};

/**
 * Calcule le nombre optimal de travailleurs pour un bâtiment
 */
export const calculateOptimalWorkers = (building: OwnedBuilding): number => {
  const maxWorkers = building.maxWorkers || 0;
  const condition = building.condition || 0;
  
  // Le nombre optimal de travailleurs dépend de la condition du bâtiment
  return Math.ceil(maxWorkers * (condition / 100));
};

/**
 * Détermine le taux de dégradation annuel d'un bâtiment
 */
export const calculateConditionDecay = (building: OwnedBuilding): number => {
  const maintenanceLevel = building.maintenanceLevel || 1;
  
  // Taux de dégradation par an basé sur le niveau d'entretien
  const decayRates = [5, 3, 1.5, 0.5, 0.1];
  const rateIndex = Math.min(Math.max(0, maintenanceLevel - 1), 4);
  
  return decayRates[rateIndex];
};

/**
 * Calcule la valeur actuelle d'un bâtiment
 */
export const calculateBuildingValue = (building: OwnedBuilding): number => {
  const baseValue = building.value || 0;
  const condition = building.condition || 0;
  const age = calculateBuildingAge(building);
  
  // La valeur diminue avec l'âge et augmente avec la condition
  const ageFactor = Math.max(0.5, 1 - (age / 100));
  const conditionFactor = condition / 100;
  
  return Math.round(baseValue * ageFactor * conditionFactor);
};

/**
 * Calcule l'âge du bâtiment en années
 */
export const calculateBuildingAge = (building: OwnedBuilding): number => {
  if (!building.purchaseDate) return 0;
  
  const currentDate = new Date();
  const purchaseDate = building.purchaseDate instanceof Date 
    ? building.purchaseDate 
    : new Date(building.purchaseDate);
  
  return currentDate.getFullYear() - purchaseDate.getFullYear();
};

/**
 * Détermine le statut d'un bâtiment en fonction de sa condition
 */
export const getBuildingStatusFromCondition = (condition: number): BuildingStatus => {
  if (condition >= 90) return 'excellent';
  if (condition >= 75) return 'good';
  if (condition >= 50) return 'average';
  if (condition >= 30) return 'poor';
  if (condition >= 10) return 'fair';
  return 'ruined';
};

/**
 * Détermine si un bâtiment a besoin de maintenance
 */
export const buildingNeedsMaintenance = (building: OwnedBuilding): boolean => {
  // Si condition est faible, besoin de maintenance
  if (building.condition < 70) return true;
  
  // Si la dernière maintenance était il y a plus de 6 mois
  if (building.lastMaintenance) {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const lastMaintenanceDate = building.lastMaintenance instanceof Date 
      ? building.lastMaintenance 
      : new Date(building.lastMaintenance);
    
    return lastMaintenanceDate < sixMonthsAgo;
  }
  
  // Si pas de maintenance enregistrée
  return true;
};

/**
 * Applique une dégradation naturelle à tous les bâtiments
 */
export const applyNaturalDecay = (buildings: Building[], gameDate: GameDate): Building[] => {
  return buildings.map(building => {
    // Ignorer les bâtiments en construction
    if (building.status === 'under_construction' || building.status === 'planned') {
      return building;
    }
    
    // Déterminer le facteur de dégradation
    const maintenanceLevel = building.maintenanceLevel || 1;
    const baseDecay = 1; // 1% par saison
    const maintenanceFactor = Math.max(0.2, (6 - maintenanceLevel) / 5);
    
    // Calculer la nouvelle condition
    const newCondition = Math.max(0, building.condition - (baseDecay * maintenanceFactor));
    
    // Mettre à jour le statut en fonction de la condition
    const newStatus = getBuildingStatusFromCondition(newCondition);
    
    return {
      ...building,
      condition: newCondition,
      status: newStatus
    };
  });
};
