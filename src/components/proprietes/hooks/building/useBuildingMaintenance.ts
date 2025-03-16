
import { useState } from 'react';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from './useBuildingInventory';
import { toast } from 'sonner';

export function useBuildingMaintenance() {
  const [isLoading, setIsLoading] = useState(false);
  const patrimoine = usePatrimoine();
  const { updateBuildingProperty, ownedBuildings } = useBuildingInventory();
  
  // Activer ou désactiver l'entretien automatique
  const toggleMaintenance = (buildingId: number | string, enabled: boolean): void => {
    updateBuildingProperty(buildingId, 'maintenanceEnabled', enabled);
    
    toast.success(
      enabled 
        ? "Entretien automatique activé" 
        : "Entretien automatique désactivé"
    );
  };
  
  // Effectuer l'entretien d'un bâtiment
  const performMaintenance = async (buildingId: number | string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Trouver le bâtiment dans l'inventaire
      const building = ownedBuildings.find(b => b.id === buildingId);
      
      if (!building) {
        toast.error("Bâtiment introuvable");
        return false;
      }
      
      // Calculer le coût de l'entretien
      // Plus le bâtiment est en mauvais état, plus cher sera l'entretien
      const maintenanceFactor = Math.max(1, (100 - building.condition) / 20);
      const maintenanceCost = Math.round(building.maintenanceCost * maintenanceFactor);
      
      // Vérifier si le joueur a les fonds suffisants
      if (maintenanceCost > patrimoine.balance) {
        toast.error(`Fonds insuffisants pour l'entretien (coût: ${maintenanceCost.toLocaleString()} As)`);
        return false;
      }
      
      // Effectuer le paiement via le patrimoine
      patrimoine.addTransaction({
        amount: -maintenanceCost,
        description: `Entretien: ${building.name}`,
        category: "Entretien",
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
  
  // Simuler la dégradation automatique des bâtiments au fil du temps
  const degradeBuildings = () => {
    ownedBuildings.forEach(building => {
      // Les bâtiments sans entretien se dégradent plus vite
      const degradationRate = building.maintenanceEnabled ? 1 : 2;
      
      // Calculer la nouvelle condition (ne pas descendre en dessous de 10%)
      const newCondition = Math.max(10, building.condition - degradationRate);
      
      // Mettre à jour la condition du bâtiment
      if (newCondition !== building.condition) {
        updateBuildingProperty(building.id, 'condition', newCondition);
      }
    });
  };
  
  // Appliquer l'entretien automatique aux bâtiments qui l'ont activé
  const applyAutomaticMaintenance = () => {
    // Filtrer les bâtiments avec entretien automatique activé
    const buildingsToMaintain = ownedBuildings.filter(b => b.maintenanceEnabled && b.condition < 95);
    
    let totalCost = 0;
    const maintainedBuildings: string[] = [];
    
    // Calculer le coût total de maintenance
    buildingsToMaintain.forEach(building => {
      const maintenanceCost = Math.round(building.maintenanceCost);
      totalCost += maintenanceCost;
      maintainedBuildings.push(building.name);
    });
    
    // Vérifier si les fonds sont suffisants
    if (totalCost > 0 && totalCost <= patrimoine.balance) {
      // Effectuer le paiement
      patrimoine.addTransaction({
        amount: -totalCost,
        description: `Entretien automatique: ${maintainedBuildings.join(', ')}`,
        category: "Entretien",
        type: 'expense'
      });
      
      // Appliquer l'entretien à chaque bâtiment
      buildingsToMaintain.forEach(building => {
        const newCondition = Math.min(100, building.condition + 15);
        updateBuildingProperty(building.id, 'condition', newCondition);
        updateBuildingProperty(building.id, 'lastMaintenance', new Date());
      });
      
      if (maintainedBuildings.length > 0) {
        toast.success(`Entretien automatique effectué pour ${maintainedBuildings.length} bâtiments`);
      }
      
      return true;
    } else if (totalCost > 0) {
      toast.error("Fonds insuffisants pour l'entretien automatique");
      return false;
    }
    
    return true;
  };
  
  return {
    isLoading,
    toggleMaintenance,
    performMaintenance,
    degradeBuildings,
    applyAutomaticMaintenance
  };
}
