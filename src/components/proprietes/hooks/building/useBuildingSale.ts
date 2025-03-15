
import { useState } from 'react';
import { useBuildingInventory } from './useBuildingInventory';
import { OwnedBuilding } from './types';
import { toast } from 'sonner';

export function useBuildingSale() {
  const [isLoading, setIsLoading] = useState(false);
  const { ownedBuildings, removeBuilding } = useBuildingInventory();
  
  // Calculate the value of a building
  const calculateBuildingValue = (building: OwnedBuilding): number => {
    // Basic valuation algorithm
    const baseValue = 10000; // Example base value
    const ageDepreciation = 0.05; // 5% depreciation per year of age
    
    // Calculate the age in years
    const now = new Date();
    const age = (now.getTime() - building.purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    
    // Calculate the condition factor (100% condition = 1.0, 0% condition = 0.5)
    const conditionFactor = 0.5 + (building.condition / 200);
    
    // Apply size multiplier if available
    let sizeMultiplier = 1.0;
    if (building.size) {
      switch (building.size.toLowerCase()) {
        case 'small': sizeMultiplier = 0.7; break;
        case 'medium': sizeMultiplier = 1.0; break;
        case 'large': sizeMultiplier = 1.5; break;
        case 'huge': sizeMultiplier = 2.0; break;
        default: sizeMultiplier = 1.0;
      }
    }
    
    // Calculate the value
    const value = baseValue * (1 - ageDepreciation * age) * conditionFactor * sizeMultiplier;
    
    // Round to nearest integer
    return Math.round(value);
  };
  
  // Calculate the value of a building by its ID
  const calculateBuildingValueById = (buildingId: string | number): number => {
    const building = ownedBuildings.find(b => b.id === buildingId);
    return building ? calculateBuildingValue(building) : 0;
  };
  
  // Sell a building
  const sellBuilding = (buildingId: string | number): boolean => {
    setIsLoading(true);
    
    try {
      const building = ownedBuildings.find(b => b.id === buildingId);
      
      if (!building) {
        toast.error("Bâtiment introuvable");
        return false;
      }
      
      // Calculate the selling price
      const sellingPrice = calculateBuildingValue(building);
      
      // Remove the building from inventory
      removeBuilding(buildingId);
      
      // TODO: Add the money to the player's account
      // usePatrimoine().addTransaction({...})
      
      toast.success(`${building.name} vendu pour ${sellingPrice} As`);
      return true;
    } catch (error) {
      console.error("Erreur lors de la vente du bâtiment:", error);
      toast.error("Une erreur est survenue lors de la vente");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    calculateBuildingValue,
    calculateBuildingValueById,
    sellBuilding
  };
}
