
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';
import { BuildingDescription } from '@/components/proprietes/data/types/buildingTypes';
import { ruralProperties } from '@/components/proprietes/data/buildings/rural';

export const useRuralPropertyCalculator = (buildingId?: string) => {
  const { sellBuilding, calculateBuildingValue } = useBuildingSale();
  const { ownedBuildings } = useBuildingInventory();
  
  const ruralBuildings = ownedBuildings.filter(b => b.buildingType === 'rural');

  // Get building details based on ID
  const getBuildingDetails = (id?: string): BuildingDescription | null => {
    if (!id) return null;
    return ruralProperties[id] || null;
  };

  const handleAddProperty = (
    buildingId: string,
    buildingType: "urban" | "rural" | "religious" | "public",
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
    getBuildingDetails,
    buildingDetails: getBuildingDetails(buildingId),
    handleAddProperty,
    sellBuilding,
    calculateBuildingValue,
    calculateBuildingValueById
  };
};
