
import { useState } from 'react';
import { useBuildingSale } from '../../rural/hooks/useBuildingSale';

interface OwnedBuilding {
  id: number;
  name: string;
  location: string;
  type: string;
  value: number;
}

export const useUrbanPropertiesTab = () => {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>([
    { id: 1, name: 'Domus du Palatin', location: 'Rome', type: 'urban', value: 120000 },
    { id: 2, name: 'Insula près du forum', location: 'Rome', type: 'urban', value: 80000 },
    { id: 3, name: 'Villa à Baïes', location: 'Campanie', type: 'urban', value: 200000 },
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
      value: 100000
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
