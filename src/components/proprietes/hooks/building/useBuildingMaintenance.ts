
import { useState } from 'react';
import { toast } from 'sonner';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from './useBuildingInventory';
import { useEconomy } from '@/hooks/useEconomy';

export function useBuildingMaintenance() {
  const [isLoading, setIsLoading] = useState(false);
  const { balance } = usePatrimoine();
  const { ownedBuildings, updateBuildingProperty } = useBuildingInventory();
  const economy = useEconomy();
  
  // Toggle maintenance of a building
  const toggleMaintenance = (buildingId: number, enabled: boolean) => {
    updateBuildingProperty(buildingId, 'maintenanceEnabled', enabled);
    
    const building = ownedBuildings.find(b => b.id === buildingId);
    if (building) {
      toast.success(`Entretien ${enabled ? 'activé' : 'désactivé'} pour ${building.name}`);
      
      if (enabled) {
        updateBuildingProperty(buildingId, 'lastMaintenance', new Date());
      }
    }
  };
  
  // Perform maintenance on a building
  const performMaintenance = (buildingId: number) => {
    setIsLoading(true);
    
    const building = ownedBuildings.find(b => b.id === buildingId);
    
    if (!building) {
      toast.error("Bâtiment introuvable");
      setIsLoading(false);
      return false;
    }
    
    if (!economy.canAfford(building.maintenanceCost)) {
      toast.error("Fonds insuffisants pour effectuer l'entretien");
      setIsLoading(false);
      return false;
    }
    
    setTimeout(() => {
      // Update condition and maintenance date
      updateBuildingProperty(buildingId, 'condition', 100);
      updateBuildingProperty(buildingId, 'lastMaintenance', new Date());
      
      // Deduct maintenance cost using economy system
      const success = economy.makePayment(
        building.maintenanceCost,
        "Service d'entretien",
        "Maintenance"
      );
      
      toast.success(`Entretien de "${building.name}" effectué avec succès`);
      setIsLoading(false);
      return true;
    }, 1000);
    
    return true;
  };
  
  return {
    isLoading,
    toggleMaintenance,
    performMaintenance,
    balance // Still provide the balance for UI
  };
}
