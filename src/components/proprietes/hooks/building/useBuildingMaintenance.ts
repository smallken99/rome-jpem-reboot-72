
import { useState } from 'react';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from './useBuildingInventory';
import { toast } from 'sonner';

export function useBuildingMaintenance() {
  const [isLoading, setIsLoading] = useState(false);
  const { addTransaction } = usePatrimoine();
  const { updateBuildingProperty } = useBuildingInventory();
  
  // Activer ou désactiver l'entretien automatique
  const toggleMaintenance = (buildingId: number, enabled: boolean): void => {
    updateBuildingProperty(buildingId, 'maintenanceEnabled', enabled);
    
    toast.success(
      enabled 
        ? "Entretien automatique activé" 
        : "Entretien automatique désactivé"
    );
  };
  
  // Effectuer l'entretien d'un bâtiment
  const performMaintenance = async (buildingId: number): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Trouver le bâtiment dans l'inventaire
      const building = useBuildingInventory().ownedBuildings.find(b => b.id === buildingId);
      
      if (!building) {
        toast.error("Bâtiment introuvable");
        return false;
      }
      
      // Calculer le coût de l'entretien
      // Plus le bâtiment est en mauvais état, plus cher sera l'entretien
      const maintenanceFactor = Math.max(1, (100 - building.condition) / 20);
      const maintenanceCost = Math.round(building.maintenanceCost * maintenanceFactor);
      
      // Effectuer le paiement
      addTransaction({
        amount: -maintenanceCost,
        description: `Entretien: ${building.name}`,
        category: 'Entretien',
        type: 'expense'
      });
      
      // Améliorer l'état du bâtiment
      const newCondition = Math.min(100, building.condition + 20);
      updateBuildingProperty(buildingId, 'condition', newCondition);
      updateBuildingProperty(buildingId, 'lastMaintenance', new Date());
      
      toast.success(`Entretien effectué avec succès pour ${building.name}`);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'entretien du bâtiment:", error);
      toast.error("Une erreur est survenue lors de l'entretien");
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
