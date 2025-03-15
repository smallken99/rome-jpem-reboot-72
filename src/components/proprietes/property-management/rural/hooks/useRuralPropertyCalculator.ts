
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';

export const useRuralPropertyCalculator = () => {
  const { sellBuilding, calculateBuildingValue, calculateBuildingValueById } = useBuildingSale();
  const { ownedBuildings } = useBuildingInventory();
  
  const ruralBuildings = ownedBuildings.filter(b => b.buildingType === 'rural');

  const handleAddProperty = (
    buildingId: string,
    buildingType: "rural" | "urban" | "religious" | "public",
    location: string,
    customName?: string
  ): boolean => {
    // Implémentation fictive
    return true;
  };

  return {
    buildings: ruralBuildings,
    handleAddProperty,
    sellBuilding,
    calculateBuildingValue,
    calculateBuildingValueById
  };
};
