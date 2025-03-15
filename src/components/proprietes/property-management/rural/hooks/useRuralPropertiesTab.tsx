
import { useState } from 'react';
import { useBuildingSale } from './useBuildingSale';

interface OwnedBuilding {
  id: number;
  name: string;
  location: string;
  type: string;
  value: number;
}

export const useRuralPropertiesTab = () => {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>([
    { id: 1, name: 'Ferme d\'olives', location: 'Latium', type: 'rural', value: 50000 },
    { id: 2, name: 'Vignoble', location: 'Campanie', type: 'rural', value: 75000 },
    { id: 3, name: 'Ferme de blé', location: 'Sicile', type: 'rural', value: 100000 },
  ]);

  const { saleBuilding, estimateBuildingValue, sellBuilding } = useBuildingSale();

  const handleAddProperty = (
    buildingId: string, 
    buildingType: "urban" | "rural" | "religious" | "public", 
    location: string, 
    customName?: string
  ): boolean => {
    // Pour cet exemple, on retourne toujours true
    if (!buildingId || !location) return false;
    
    const newBuilding: OwnedBuilding = {
      id: Date.now(),
      name: customName || `Nouvelle propriété ${buildings.length + 1}`,
      location,
      type: buildingType,
      value: 50000
    };
    
    setBuildings(prev => [...prev, newBuilding]);
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
