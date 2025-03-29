
import { OwnedBuilding } from '../../types/property';

export const calculateMaintenanceCost = (building: OwnedBuilding): number => {
  const baseCost = building.maintenanceCost || 0;
  const maintenanceLevel = building.maintenanceLevel || 0;
  const sizeFactor = building.size || 1;
  
  // Higher maintenance level means higher costs
  const levelFactor = maintenanceLevel / 100;
  
  return Math.round(baseCost * sizeFactor * levelFactor);
};

export const calculateIncomeByMaintenance = (building: OwnedBuilding): number => {
  const baseIncome = building.income || 0;
  const maintenanceLevel = building.maintenanceLevel || 0;
  const condition = building.condition || 0;
  
  // Income is affected by both maintenance level and condition
  const maintenanceFactor = maintenanceLevel / 100;
  const conditionFactor = condition / 100;
  
  return Math.round(baseIncome * maintenanceFactor * conditionFactor);
};
