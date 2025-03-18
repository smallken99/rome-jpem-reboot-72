
import { BuildingDescription as DataBuildingDescription } from '../../data/types/buildingTypes';
import { BuildingDescription as HookBuildingDescription } from '../../hooks/building/types';

// Helper function to adapt different building description types to a common format
export const adaptBuildingDescription = (
  buildingDetails: DataBuildingDescription | HookBuildingDescription | null
): DataBuildingDescription | null => {
  if (!buildingDetails) return null;
  
  // Create a standardized version that includes all possible properties
  const standardized: DataBuildingDescription = {
    id: buildingDetails.id || '',
    name: buildingDetails.name || '',
    description: buildingDetails.description || '',
    advantages: buildingDetails.advantages || [],
    initialCost: buildingDetails.initialCost || 0,
    maintenanceCost: buildingDetails.maintenanceCost || 0,
    prestige: buildingDetails.prestige || 0,
    income: buildingDetails.income || 0,
    piete: buildingDetails.piete || 0,
    popularite: buildingDetails.popularite || 0,
    reputation: buildingDetails.reputation || 0,
    production: buildingDetails.production || undefined,
    slaves: buildingDetails.slaves || undefined,
    basePrice: buildingDetails.basePrice || 0,
    type: buildingDetails.type || 'urban',
    subType: buildingDetails.subType || '',
    requirements: buildingDetails.requirements || '',
    maintenance: buildingDetails.maintenance || '',
    security: buildingDetails.security || ''
  };
  
  return standardized;
};
