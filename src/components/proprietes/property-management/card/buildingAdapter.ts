
import { BuildingDescription, OwnedBuilding } from '../../types/property';

export const adaptBuildingDescriptionForCard = (building: BuildingDescription) => {
  return {
    id: building.id || '', 
    name: building.name,
    description: building.description,
    type: building.type,
    cost: building.cost || 0,
    maintenanceCost: building.maintenanceCost || 0,
    income: building.income || 0,
    piete: building.piete || 0, 
    popularite: building.popularite || 0,
    reputation: building.reputation || 0,
    production: building.production || 0,
    workers: {
      min: building.workers?.min || 0,
      optimal: building.workers?.optimal || 0,
      required: building.workers?.required || 0,
      max: building.workers?.max || 0,
      maxProfit: building.workers?.maxProfit || 0
    },
    subType: building.subType || '',
    requirements: building.requirements || {},
    maintenance: building.maintenance || {},
    security: building.security || {}
  };
};

export const getMaintenanceEfficiency = (building: OwnedBuilding) => {
  if (!building.buildingDescription) return 0;
  
  const maxEfficiency = 100;
  const currentMaintenance = building.maintenanceLevel || 0;
  
  return (currentMaintenance / maxEfficiency) * 100;
};

export const getIncomeEfficiency = (building: OwnedBuilding) => {
  if (!building.buildingDescription) return 0;
  
  const baseIncome = building.buildingDescription.income || 0;
  const maintenanceMultiplier = (building.maintenanceLevel || 0) / 100;
  
  return baseIncome * maintenanceMultiplier;
};
