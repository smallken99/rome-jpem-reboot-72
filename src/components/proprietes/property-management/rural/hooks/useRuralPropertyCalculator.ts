
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';

export const useRuralPropertyCalculator = (buildingId?: string, size?: string, location?: string) => {
  const { sellBuilding, calculateBuildingValue } = useBuildingSale();
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

  // Adapter pour les IDs numériques ou string
  const calculateBuildingValueById = (buildingId: string | number): number => {
    const building = ruralBuildings.find(b => b.id.toString() === buildingId.toString());
    if (building) {
      return calculateBuildingValue(building);
    }
    return 0;
  };

  return {
    buildings: ruralBuildings,
    handleAddProperty,
    sellBuilding,
    calculateBuildingValue,
    calculateBuildingValueById
  };
};
