
import { useState } from 'react';
import { toast } from 'sonner';
import { BuildingDescription } from '../../data/types/buildingTypes';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from './useBuildingInventory';
import { OwnedBuilding } from './types';

export function useBuildingPurchase() {
  const [isLoading, setIsLoading] = useState(false);
  const { balance, updateBalance } = usePatrimoine();
  const { addBuilding } = useBuildingInventory();
  
  // Purchase a new building
  const purchaseBuilding = (
    building: BuildingDescription, 
    buildingId: string,
    buildingType: 'urban' | 'rural' | 'religious' | 'public',
    location: string,
    customName?: string
  ) => {
    setIsLoading(true);
    
    // Check if balance is sufficient
    if (balance < building.initialCost) {
      toast.error("Fonds insuffisants pour cette acquisition");
      setIsLoading(false);
      return false;
    }
    
    setTimeout(() => {
      // Create new building
      const newBuilding: OwnedBuilding = {
        id: Date.now(), // Using timestamp as simple unique ID
        buildingId,
        buildingType,
        name: customName || building.name,
        location,
        maintenanceEnabled: true,
        maintenanceCost: building.maintenanceCost,
        slaves: building.slaves ? building.slaves.required : 0,
        condition: 100, // New building in perfect condition
        purchaseDate: new Date()
      };
      
      // Add to owned buildings
      addBuilding(newBuilding);
      
      // Deduct cost from balance
      updateBalance(-building.initialCost);
      
      toast.success(`Acquisition de "${newBuilding.name}" réalisée avec succès`);
      setIsLoading(false);
      return true;
    }, 1000);
    
    return true;
  };
  
  return {
    isLoading,
    purchaseBuilding
  };
}
