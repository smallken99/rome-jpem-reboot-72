
import { useState } from 'react';
import { toast } from 'sonner';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from './useBuildingInventory';
import { OwnedBuilding } from './types';

export function useBuildingSale() {
  const [isLoading, setIsLoading] = useState(false);
  const { updateBalance } = usePatrimoine();
  const { ownedBuildings, removeBuilding } = useBuildingInventory();
  
  // Calculate market value of a building
  const calculateBuildingValue = (buildingId: number): number => {
    const building = ownedBuildings.find(b => b.id === buildingId);
    
    if (!building) return 0;
    
    // Value depends on building condition and location
    // Using a simplified formula
    const baseValue = building.maintenanceCost * 25; // Approximation of base value
    const conditionMultiplier = building.condition / 100;
    
    return Math.round(baseValue * conditionMultiplier);
  };
  
  // Sell an existing building
  const sellBuilding = (buildingId: number, estimatedValue: number) => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Find building
      const buildingToSell = ownedBuildings.find(b => b.id === buildingId);
      
      if (!buildingToSell) {
        toast.error("Bâtiment introuvable");
        setIsLoading(false);
        return false;
      }
      
      // Remove building from list
      removeBuilding(buildingId);
      
      // Add sale amount to balance
      updateBalance(estimatedValue);
      
      toast.success(`Vente de "${buildingToSell.name}" réalisée pour ${estimatedValue.toLocaleString()} As`);
      setIsLoading(false);
      return true;
    }, 1000);
    
    return true;
  };
  
  return {
    isLoading,
    calculateBuildingValue,
    sellBuilding
  };
}
