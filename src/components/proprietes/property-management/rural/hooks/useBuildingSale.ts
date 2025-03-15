
import { useState } from 'react';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { toast } from 'sonner';

export function useBuildingSale() {
  const [isLoading, setIsLoading] = useState(false);
  const { buildingSold } = usePatrimoine();
  const { removeBuilding, ownedBuildings } = useBuildingInventory();
  
  // Calculer la valeur d'un bâtiment par ID
  const estimateBuildingValue = (buildingId: number): number => {
    const building = ownedBuildings.find(b => b.id === buildingId);
    if (!building) return 0;
    
    // Base value based on maintenance cost
    const baseValue = building.maintenanceCost * 10;
    
    // Apply condition modifier
    const conditionFactor = building.condition / 100;
    
    // Apply age depreciation
    const ageInDays = (new Date().getTime() - building.purchaseDate.getTime()) / (1000 * 60 * 60 * 24);
    const ageFactor = Math.max(0.6, 1 - (ageInDays / 365) * 0.05); // 5% depreciation per year, minimum 60% of base value
    
    // Calculate final value
    const value = Math.round(baseValue * conditionFactor * ageFactor);
    
    return value;
  };
  
  // Vendre un bâtiment (version synchrone)
  const sellBuilding = (buildingId: number): boolean => {
    try {
      // Trouver le bâtiment dans l'inventaire
      const building = ownedBuildings.find(b => b.id === buildingId);
      
      if (!building) {
        toast.error("Bâtiment introuvable");
        return false;
      }
      
      // Calculer la valeur du bâtiment
      const value = estimateBuildingValue(buildingId);
      
      // Supprimer le bâtiment de l'inventaire
      removeBuilding(buildingId);
      
      // Enregistrer la transaction financière
      buildingSold(building.name, value);
      
      toast.success(`${building.name} vendu pour ${value.toLocaleString()} As`);
      return true;
    } catch (error) {
      console.error("Erreur lors de la vente du bâtiment:", error);
      toast.error("Une erreur est survenue lors de la vente");
      return false;
    }
  };
  
  // Fonction pour la compatibilité avec la version asynchrone
  const saleBuilding = (buildingId: number): boolean => {
    return sellBuilding(buildingId);
  };
  
  return {
    isLoading,
    estimateBuildingValue,
    sellBuilding,
    saleBuilding
  };
}
