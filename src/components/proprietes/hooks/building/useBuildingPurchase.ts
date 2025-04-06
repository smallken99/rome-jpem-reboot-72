
import { useState } from 'react';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from './useBuildingInventory';
import { BuildingPurchaseOptions, OwnedBuilding } from './types';
import { toast } from 'sonner';
import { adaptOwnedBuilding } from '@/utils/typeAdapters';

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
        id: String(Date.now()),
        buildingId: options.buildingId,
        buildingType: options.type,
        type: options.type,
        name: options.name,
        location: options.location,
        maintenanceEnabled: true,
        maintenanceCost: options.maintenanceCost,
        maintenance: options.maintenanceCost,
        slaves: options.slaves || 0,
        condition: 100, // Nouveau bâtiment en parfait état
        purchaseDate: new Date(),
        // Champs requis
        value: options.initialCost,
        income: options.income || 0,
        workers: 0,
        securityLevel: 1,
        maintenanceLevel: 1,
        size: options.size || 100,
        maxWorkers: options.maxWorkers || 5,
        description: options.description || ''
      };
      
      // Ajouter le bâtiment à l'inventaire
      const adaptedBuilding = adaptOwnedBuilding(newBuilding);
      addBuilding(adaptedBuilding);
      
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
