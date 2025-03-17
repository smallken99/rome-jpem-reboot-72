
import { useState } from 'react';
import { useBuildingInventory } from './useBuildingInventory';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { toast } from 'sonner';

export function useBuildingMaintenance() {
  const [isLoading, setIsLoading] = useState(false);
  const { updateBuildingProperty } = useBuildingInventory();
  const { addTransaction } = usePatrimoine();
  
  // Toggle maintenance setting for a building
  const toggleMaintenance = (buildingId: number | string, enabled: boolean = true): boolean => {
    try {
      updateBuildingProperty(buildingId, 'maintenanceEnabled', enabled);
      
      toast.success(
        enabled 
          ? "Maintenance activée" 
          : "Maintenance désactivée",
        {
          description: enabled 
            ? "L'entretien régulier préviendra la détérioration." 
            : "Le bâtiment se dégradera plus rapidement sans entretien."
        }
      );
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la modification des paramètres de maintenance:", error);
      toast.error("Une erreur est survenue");
      return false;
    }
  };
  
  // Perform maintenance operation on a building
  const performMaintenance = async (
    buildingId: number | string, 
    level: 'basic' | 'standard' | 'premium' = 'standard'
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Get the building from inventory
      const { ownedBuildings } = useBuildingInventory();
      const building = ownedBuildings.find(b => b.id === buildingId);
      
      if (!building) {
        toast.error("Bâtiment introuvable");
        return false;
      }
      
      // Calculate the maintenance cost based on level
      let maintenanceCost = building.maintenanceCost;
      let conditionImprovement = 20;
      
      switch(level) {
        case 'basic':
          maintenanceCost = Math.round(building.maintenanceCost * 0.6);
          conditionImprovement = 10;
          break;
        case 'premium':
          maintenanceCost = Math.round(building.maintenanceCost * 1.5);
          conditionImprovement = 40;
          break;
      }
      
      // Register the transaction
      addTransaction({
        amount: -maintenanceCost,
        description: `Maintenance ${level} de ${building.name}`,
        category: "Entretien",
        type: 'expense'
      });
      
      // Update the building condition
      const newCondition = Math.min(100, building.condition + conditionImprovement);
      updateBuildingProperty(buildingId, 'condition', newCondition);
      updateBuildingProperty(buildingId, 'lastMaintenance', new Date());
      
      toast.success(
        "Maintenance effectuée",
        {
          description: `La condition de ${building.name} est maintenant de ${newCondition}% (+${conditionImprovement}%).`
        }
      );
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la maintenance:", error);
      toast.error("Une erreur est survenue lors de la maintenance");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    toggleMaintenance,
    performMaintenance
  };
}
