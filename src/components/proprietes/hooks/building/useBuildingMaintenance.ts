
import { useState } from 'react';
import { useBuildingInventory } from './useBuildingInventory';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useEconomy } from '@/hooks/useEconomy';
import { toast } from 'sonner';

export function useBuildingMaintenance() {
  const [isLoading, setIsLoading] = useState(false);
  const { updateBuildingProperty, buildings } = useBuildingInventory();
  const { addTransaction } = usePatrimoine();
  const { canAfford, makePayment } = useEconomy();
  
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
  
  // Check if a building needs maintenance
  const needsMaintenance = (buildingId: number | string): boolean => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return false;
    
    // If condition is below 70%, maintenance is needed
    if (building.condition < 70) return true;
    
    // If the last maintenance was done more than 6 months ago
    if (building.lastMaintenance) {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return new Date(building.lastMaintenance) < sixMonthsAgo;
    }
    
    // If no maintenance has ever been done
    return true;
  };
  
  // Calculate maintenance cost based on building condition and level
  const calculateMaintenanceCost = (
    buildingId: number | string,
    level: 'basic' | 'standard' | 'premium' = 'standard'
  ): number => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return 0;
    
    let baseCost = building.maintenanceCost;
    
    // Adjust cost based on current condition - worse condition means higher cost
    const conditionFactor = (100 - building.condition) / 100 + 0.5;
    
    // Adjust based on maintenance level
    let levelMultiplier = 1.0;
    switch(level) {
      case 'basic': 
        levelMultiplier = 0.6;
        break;
      case 'premium':
        levelMultiplier = 1.5;
        break;
      default:
        levelMultiplier = 1.0;
    }
    
    return Math.round(baseCost * conditionFactor * levelMultiplier);
  };
  
  // Get estimates for different maintenance options
  const getMaintenanceOptions = (buildingId: number | string) => {
    return {
      basic: {
        cost: calculateMaintenanceCost(buildingId, 'basic'),
        improvement: 10,
        description: "Entretien minimal"
      },
      standard: {
        cost: calculateMaintenanceCost(buildingId, 'standard'),
        improvement: 20,
        description: "Entretien standard"
      },
      premium: {
        cost: calculateMaintenanceCost(buildingId, 'premium'),
        improvement: 40,
        description: "Entretien complet"
      }
    };
  };
  
  // Perform maintenance operation on a building
  const performMaintenance = async (
    buildingId: number | string, 
    level: 'basic' | 'standard' | 'premium' = 'standard'
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Get the building from inventory
      const building = buildings.find(b => b.id === buildingId);
      
      if (!building) {
        toast.error("Bâtiment introuvable");
        return false;
      }
      
      // Calculate the maintenance cost based on level
      const maintenanceOptions = getMaintenanceOptions(buildingId);
      const selectedOption = maintenanceOptions[level];
      
      // Vérifier si le joueur a assez d'argent
      if (!canAfford(selectedOption.cost)) {
        toast.error(`Fonds insuffisants pour effectuer cette maintenance (${selectedOption.cost} As requis)`);
        return false;
      }
      
      // Effectuer le paiement via useEconomy
      const paymentResult = makePayment(
        selectedOption.cost, 
        "Service de maintenance", 
        "Entretien", 
        `Maintenance ${level} de ${building.name}`
      );
      
      if (!paymentResult) {
        toast.error("Problème lors du paiement");
        return false;
      }
      
      // Update the building condition
      const newCondition = Math.min(100, building.condition + selectedOption.improvement);
      updateBuildingProperty(buildingId, 'condition', newCondition);
      updateBuildingProperty(buildingId, 'lastMaintenance', new Date());
      
      toast.success(
        "Maintenance effectuée",
        {
          description: `La condition de ${building.name} est maintenant de ${newCondition}% (+${selectedOption.improvement}%).`
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
  
  // Vérifier si le joueur peut se permettre de faire la maintenance
  const canPerformMaintenance = (buildingId: number | string, level: 'basic' | 'standard' | 'premium' = 'standard'): boolean => {
    const options = getMaintenanceOptions(buildingId);
    const cost = options[level].cost;
    return canAfford(cost);
  };
  
  return {
    isLoading,
    toggleMaintenance,
    performMaintenance,
    needsMaintenance,
    calculateMaintenanceCost,
    getMaintenanceOptions,
    canPerformMaintenance
  };
}
