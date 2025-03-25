
import { useState } from 'react';
import { useBuildingInventory } from './useBuildingInventory';
import { useEconomy } from '@/hooks/useEconomy';
import { SlaveAssignment } from './types';
import { toast } from 'sonner';

export function useSlaveAssignment() {
  const [totalSlaves, setTotalSlaves] = useState(50); // Valeur fictive pour le nombre total d'esclaves
  const [assignedSlaves, setAssignedSlaves] = useState(0);
  const { updateBuildingProperty, buildings } = useBuildingInventory();
  const { makePayment } = useEconomy();
  
  // Calculer le nombre d'esclaves déjà assignés
  const calculateAssignedSlaves = () => {
    return buildings.reduce((total, building) => total + (building.slaves || 0), 0);
  };
  
  // Obtenir le nombre d'esclaves disponibles
  const getAvailableSlaves = () => {
    const currentlyAssigned = calculateAssignedSlaves();
    setAssignedSlaves(currentlyAssigned);
    return totalSlaves - currentlyAssigned;
  };
  
  // Acheter de nouveaux esclaves
  const purchaseSlaves = (count: number, pricePerSlave = 1000): boolean => {
    if (count <= 0) {
      toast.error("Le nombre d'esclaves doit être supérieur à zéro");
      return false;
    }
    
    const totalCost = count * pricePerSlave;
    
    // Effectuer le paiement
    const paymentSuccess = makePayment(
      totalCost,
      "Marché aux esclaves",
      "Achat d'esclaves",
      `Achat de ${count} esclaves`
    );
    
    if (paymentSuccess) {
      // Augmenter le nombre total d'esclaves
      setTotalSlaves(prev => prev + count);
      toast.success(`${count} esclaves achetés pour ${totalCost.toLocaleString()} As`);
      return true;
    } else {
      toast.error("Fonds insuffisants pour acheter ces esclaves");
      return false;
    }
  };
  
  // Assigner des esclaves à un bâtiment
  const assignSlaves = (buildingId: number | string, slaveCount: number): boolean => {
    try {
      // Vérifier que le nombre d'esclaves est valide
      if (slaveCount < 0) {
        toast.error("Le nombre d'esclaves ne peut pas être négatif");
        return false;
      }
      
      const building = buildings.find(b => b.id.toString() === buildingId.toString());
      if (!building) {
        toast.error("Bâtiment introuvable");
        return false;
      }
      
      const currentSlaves = building.slaves || 0;
      const diff = slaveCount - currentSlaves;
      
      // Si on veut ajouter des esclaves, vérifier qu'on en a assez de disponibles
      if (diff > 0) {
        const available = getAvailableSlaves();
        if (diff > available) {
          toast.error(`Pas assez d'esclaves disponibles. Disponibles: ${available}`);
          return false;
        }
      }
      
      // Mettre à jour le nombre d'esclaves
      updateBuildingProperty(buildingId, 'slaves', slaveCount);
      
      if (diff > 0) {
        toast.success(`${diff} esclaves supplémentaires assignés à ${building.name}`);
      } else if (diff < 0) {
        toast.success(`${Math.abs(diff)} esclaves retirés de ${building.name}`);
      } else {
        toast.info(`Pas de changement dans le nombre d'esclaves`);
      }
      
      return true;
    } catch (error) {
      console.error("Erreur lors de l'assignation des esclaves:", error);
      toast.error("Une erreur est survenue lors de l'assignation des esclaves");
      return false;
    }
  };
  
  // Alias pour assignSlaves (pour compatibilité avec le code existant)
  const assignSlavesToBuilding = (buildingId: string, count: number): boolean => {
    return assignSlaves(buildingId, count);
  };
  
  // Obtenir les assignations actuelles des esclaves
  const getCurrentAssignments = (): SlaveAssignment[] => {
    return buildings.map(building => ({
      buildingId: building.id,
      buildingName: building.name,
      count: building.slaves || 0,
      maxCount: calcOptimalSlaveCount(building),
      efficiency: calculateEfficiency(building)
    }));
  };
  
  // Calculer le nombre optimal d'esclaves pour un bâtiment
  const calcOptimalSlaveCount = (building: any): number => {
    // Cette logique pourrait être plus complexe en fonction du type de bâtiment
    switch (building.buildingType) {
      case 'rural':
        return 30; // Les domaines ruraux nécessitent plus d'esclaves
      case 'urban':
        return building.size === 'large' ? 15 : (building.size === 'medium' ? 10 : 5);
      case 'religious':
        return 3; // Les temples ont besoin de peu d'esclaves
      default:
        return 5;
    }
  };
  
  // Calculer l'efficacité actuelle des esclaves dans un bâtiment
  const calculateEfficiency = (building: any): number => {
    const optimal = calcOptimalSlaveCount(building);
    const current = building.slaves || 0;
    
    if (current === 0) return 0;
    if (optimal === 0) return 100;
    
    // Si on a plus que le nombre optimal, l'efficacité diminue (rendements décroissants)
    if (current > optimal) {
      return Math.max(50, 100 - ((current - optimal) / optimal) * 50);
    }
    
    // Si on a moins que le nombre optimal, l'efficacité est proportionnelle
    return (current / optimal) * 100;
  };
  
  // Alias pour calculateEfficiency (pour compatibilité avec le code existant)
  const getEfficiency = (buildingId: string): number => {
    const building = buildings.find(b => b.id.toString() === buildingId);
    return building ? calculateEfficiency(building) : 0;
  };
  
  return {
    assignSlaves,
    assignSlavesToBuilding,
    getAvailableSlaves,
    purchaseSlaves,
    totalSlaves,
    assignedSlaves,
    getCurrentAssignments,
    calcOptimalSlaveCount,
    calculateEfficiency,
    getEfficiency
  };
}
