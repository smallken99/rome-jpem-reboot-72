
import { OwnedBuilding } from '@/components/proprietes/types/property';

export const calculateMaintenanceCost = (building: OwnedBuilding): number => {
  const baseCost = building.maintenanceCost || 0;
  const maintenanceLevel = building.maintenanceLevel || 1;
  
  // Coût de maintenance augmente avec le niveau de maintenance
  const maintenanceMultiplier = [0.5, 1, 1.5, 2, 2.5];
  
  // Ajustement basé sur la condition du bâtiment
  const conditionFactor = Math.max(0.5, building.condition / 100);
  
  // Coût final
  return Math.round(baseCost * maintenanceMultiplier[maintenanceLevel - 1] * conditionFactor);
};

export const calculateIncomeByMaintenance = (building: OwnedBuilding): number => {
  const baseIncome = building.income || 0;
  const maintenanceLevel = building.maintenanceLevel || 1;
  
  // Revenus augmentent avec le niveau de maintenance
  const incomeMultiplier = [0.7, 1, 1.2, 1.4, 1.5];
  
  // Ajustement basé sur la condition du bâtiment
  const conditionFactor = Math.max(0.5, building.condition / 100);
  
  // Ajustement basé sur le nombre de travailleurs
  const workerEfficiency = Math.min(1, (building.workers || 0) / (building.maxWorkers || 1));
  
  // Revenu final
  return Math.round(baseIncome * incomeMultiplier[maintenanceLevel - 1] * conditionFactor * workerEfficiency);
};

export const calculateOptimalWorkers = (building: OwnedBuilding): number => {
  const maxWorkers = building.maxWorkers || 0;
  const condition = building.condition || 0;
  
  // Le nombre optimal de travailleurs dépend de la condition du bâtiment
  return Math.ceil(maxWorkers * (condition / 100));
};

export const calculateConditionDecay = (building: OwnedBuilding): number => {
  const maintenanceLevel = building.maintenanceLevel || 1;
  
  // Taux de dégradation par an basé sur le niveau d'entretien
  const decayRates = [5, 3, 1.5, 0.5, 0.1];
  
  return decayRates[maintenanceLevel - 1];
};
