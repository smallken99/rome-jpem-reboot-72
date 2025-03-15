
import { OwnedBuilding } from '../../hooks/building/types';
import { useBuildingSale } from './useBuildingSale';

export const useRuralPropertyCalculator = () => {
  const { saleBuilding, estimateBuildingValue, sellBuilding } = useBuildingSale();
  
  const buildings: OwnedBuilding[] = [];

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
    buildings,
    handleAddProperty,
    saleBuilding,
    sellBuilding,
    estimateBuildingValue
  };
};
