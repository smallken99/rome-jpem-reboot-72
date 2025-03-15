
import { useState } from 'react';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from './useBuildingInventory';
import { BuildingPurchaseOptions, OwnedBuilding } from './types';
import { toast } from 'sonner';

export function useBuildingPurchase() {
  const [isLoading, setIsLoading] = useState(false);
  const { balance, buildingPurchased } = usePatrimoine();
  const { addBuilding } = useBuildingInventory();
  
  const purchaseBuilding = async (options: BuildingPurchaseOptions): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Vérifier si les fonds sont suffisants
      if (options.initialCost > balance) {
        toast.error("Fonds insuffisants pour acheter cette propriété");
        return false;
      }
      
      // Crée un nouveau bâtiment
      const newBuilding: OwnedBuilding = {
        id: Date.now(),
        buildingId: options.buildingId,
        buildingType: options.type,
        name: options.name,
        location: options.location,
        maintenanceEnabled: true,
        maintenanceCost: options.maintenanceCost,
        slaves: options.slaves || 0,
        condition: 100, // Nouveau bâtiment en parfait état
        purchaseDate: new Date()
      };
      
      // Ajouter le bâtiment à l'inventaire
      addBuilding(newBuilding);
      
      // Enregistrer la transaction financière
      buildingPurchased(options.name, options.initialCost);
      
      toast.success(`${options.name} acquis avec succès!`);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'achat du bâtiment:", error);
      toast.error("Une erreur est survenue lors de l'achat");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    purchaseBuilding
  };
}
