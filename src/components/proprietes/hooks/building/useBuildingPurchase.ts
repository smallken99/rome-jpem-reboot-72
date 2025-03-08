
import { useState } from 'react';
import { toast } from 'sonner';
import { BuildingDescription } from '../../data/types/buildingTypes';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from './useBuildingInventory';
import { OwnedBuilding } from './types';
import { useEconomy } from '@/hooks/useEconomy';

export function useBuildingPurchase() {
  const [isLoading, setIsLoading] = useState(false);
  const { addBuilding } = useBuildingInventory();
  const economy = useEconomy();
  
  // Purchase a new building
  const purchaseBuilding = (
    building: BuildingDescription, 
    buildingId: string,
    buildingType: 'urban' | 'rural' | 'religious' | 'public' | 'military',
    location: string,
    customName?: string
  ) => {
    setIsLoading(true);
    
    // Check if balance is sufficient using the economy system
    if (!economy.canAfford(building.initialCost)) {
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
      
      // Make the transaction using the economy system
      const success = economy.makePayment(
        building.initialCost,
        "Vendeur de propriété",
        "Immobilier",
        `Achat de "${newBuilding.name}" à ${location}`
      );
      
      if (success) {
        toast.success(`Acquisition de "${newBuilding.name}" réalisée avec succès`);
      } else {
        // This should not happen since we checked canAfford before, but just in case
        toast.error("La transaction a échoué");
      }
      
      setIsLoading(false);
      return success;
    }, 1000);
    
    return true;
  };
  
  return {
    isLoading,
    purchaseBuilding,
    balance: economy.balance, // Provide balance from economy system
  };
}
