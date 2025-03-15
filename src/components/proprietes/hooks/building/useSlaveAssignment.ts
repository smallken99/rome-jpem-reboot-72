
import { useBuildingInventory } from './useBuildingInventory';
import { toast } from 'sonner';

export function useSlaveAssignment() {
  const { updateBuildingProperty } = useBuildingInventory();
  
  // Assigner des esclaves à un bâtiment
  const assignSlaves = (buildingId: number, slaveCount: number): boolean => {
    try {
      // Vérifier que le nombre d'esclaves est valide
      if (slaveCount < 0) {
        toast.error("Le nombre d'esclaves ne peut pas être négatif");
        return false;
      }
      
      // Mettre à jour le nombre d'esclaves
      updateBuildingProperty(buildingId, 'slaves', slaveCount);
      
      toast.success(`${slaveCount} esclaves assignés avec succès`);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'assignation des esclaves:", error);
      toast.error("Une erreur est survenue lors de l'assignation des esclaves");
      return false;
    }
  };
  
  return {
    assignSlaves
  };
}
