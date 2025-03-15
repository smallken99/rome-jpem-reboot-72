
import { BuildingDescription as DataBuildingDescription } from '../../data/types/buildingTypes';
import { BuildingDescription as HookBuildingDescription } from '../../hooks/building/types';

export function adaptBuildingDescription(buildingDetails: DataBuildingDescription | HookBuildingDescription | null): HookBuildingDescription | null {
  if (!buildingDetails) return null;
  
  return {
    id: buildingDetails.id || '',
    name: buildingDetails.name,
    description: buildingDetails.description,
    basePrice: buildingDetails.basePrice || buildingDetails.initialCost,
    maintenanceCost: buildingDetails.maintenanceCost,
    type: buildingDetails.type || "rural",
    advantages: buildingDetails.advantages,
    initialCost: buildingDetails.initialCost,
    prestige: buildingDetails.prestige,
    slaves: buildingDetails.slaves ? {
      required: buildingDetails.slaves.required,
      optimal: buildingDetails.slaves.optimal,
      maxProfit: buildingDetails.slaves.maxProfit || 0
    } : undefined
  };
}
