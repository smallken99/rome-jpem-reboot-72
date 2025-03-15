
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';

export const useUrbanPropertyCalculator = () => {
  const { sellBuilding, calculateBuildingValue, calculateBuildingValueById } = useBuildingSale();
  const { ownedBuildings } = useBuildingInventory();
  
  const urbanBuildings = ownedBuildings.filter(b => b.buildingType === 'urban');

  const handleAddProperty = (
    buildingId: string,
    buildingType: "urban" | "rural" | "religious" | "public",
    location: string,
    customName?: string
  ): boolean => {
    // Implémentation fictive
    return true;
  };

  return {
    buildings: urbanBuildings,
    handleAddProperty,
    sellBuilding,
    calculateBuildingValue,
    calculateBuildingValueById
  };
};
