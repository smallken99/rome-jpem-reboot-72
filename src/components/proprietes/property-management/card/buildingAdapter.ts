
import { BuildingDescription, OwnedBuilding } from '../../types/buildingTypes';

// Fonction pour adapter les données d'un bâtiment
export const adaptBuildingDescription = (building: BuildingDescription): BuildingDescription => {
  return {
    id: building.id,
    name: building.name,
    type: building.type,
    description: building.description,
    cost: building.cost,
    maintenanceCost: building.maintenanceCost,
    income: building.income || 0,
    piete: building.piete || 0,
    popularite: building.popularite || 0,
    reputation: building.reputation || 0,
    production: building.production || 0,
    workers: {
      required: building.workers.required,
      optimal: building.workers.optimal,
      maxProfit: building.workers.maxProfit || 0,
    },
    subType: building.subType || '',
    requirements: building.requirements || [],
    maintenance: building.maintenance || 0,
    security: building.security || 0
  };
};

// Fonction pour calculer le revenu en fonction du niveau d'entretien
export const calculateIncomeByMaintenance = (building: OwnedBuilding): number => {
  if (!building.buildingDescription) return 0;
  
  const baseIncome = building.buildingDescription.income || 0;
  const maintenanceMultiplier = getMaintenanceMultiplier(building.maintenanceLevel);
  const conditionMultiplier = building.condition / 100;
  
  return Math.round(baseIncome * maintenanceMultiplier * conditionMultiplier);
};

// Fonction pour obtenir le multiplicateur en fonction du niveau d'entretien
export const getMaintenanceMultiplier = (level: number): number => {
  switch (level) {
    case 0: return 0.5;  // Minimal
    case 1: return 0.75; // Basic
    case 2: return 1.0;  // Standard
    case 3: return 1.25; // High
    case 4: return 1.5;  // Luxury
    default: return 1.0;
  }
};

// Fonction pour calculer le coût d'entretien en fonction du niveau
export const calculateMaintenanceCost = (building: OwnedBuilding): number => {
  if (!building.buildingDescription) return 0;
  
  const baseCost = building.buildingDescription.maintenanceCost;
  const maintenanceMultiplier = getMaintenanceMultiplier(building.maintenanceLevel);
  
  return Math.round(baseCost * maintenanceMultiplier);
};
