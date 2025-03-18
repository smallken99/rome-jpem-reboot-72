
import { useState, useCallback } from 'react';
import { useBuildingInventory } from './building/useBuildingInventory';
import { useBuildingSale } from './building/useBuildingSale';
import { useBuildingPurchase } from './building/useBuildingPurchase';
import { useBuildingMaintenance } from './building/useBuildingMaintenance';
import { useSlaveAssignment } from './building/useSlaveAssignment';
import { OwnedBuilding } from './building/types';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { toast } from 'sonner';

export function useBuildingManagement() {
  const { buildings, ownedBuildings, addBuilding, updateBuildingProperty } = useBuildingInventory();
  const { sellBuilding, calculateBuildingValue } = useBuildingSale();
  const { purchaseBuilding } = useBuildingPurchase();
  const { toggleMaintenance, performMaintenance } = useBuildingMaintenance();
  const { assignSlaves } = useSlaveAssignment();
  const { balance, buildingPurchased, buildingSold } = usePatrimoine();
  
  // Filter buildings by type
  const urbanBuildings = buildings.filter(b => b.buildingType === 'urban');
  const ruralBuildings = buildings.filter(b => b.buildingType === 'rural');
  const religiousBuildings = buildings.filter(b => b.buildingType === 'religious');
  const publicBuildings = buildings.filter(b => b.buildingType === 'public');
  
  // Add property with a custom name
  const handleAddProperty = useCallback((
    buildingId: string,
    buildingType: "urban" | "rural" | "religious" | "public",
    location: string,
    customName?: string
  ): boolean => {
    try {
      // Generate a unique ID
      const newId = Date.now();
      
      // Default values for a new building
      const newBuilding: OwnedBuilding = {
        id: newId,
        buildingId,
        name: customName || `Bâtiment ${buildingType} à ${location}`,
        buildingType,
        location,
        maintenanceEnabled: true,
        maintenanceCost: 1000, // Default value
        slaves: 0,
        condition: 100,
        purchaseDate: new Date()
      };
      
      // Add building to inventory
      addBuilding(newBuilding);
      
      // Record financial transaction
      buildingPurchased(newBuilding.name, 5000); // Example cost
      
      toast.success(`Propriété ${buildingType} ajoutée avec succès!`);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la propriété:", error);
      toast.error("Échec de l'ajout de la propriété");
      return false;
    }
  }, [addBuilding, buildingPurchased]);
  
  // Handle selling a building
  const handleSellBuilding = useCallback((buildingId: string | number): boolean => {
    try {
      // Find the building to get its value
      const building = buildings.find(b => b.id === buildingId);
      
      if (!building) {
        toast.error("Bâtiment introuvable");
        return false;
      }
      
      // Calculate sale value
      const value = calculateBuildingValue(building);
      
      // Sell the building (remove from inventory)
      const success = sellBuilding(buildingId);
      
      if (success) {
        // Record financial transaction
        buildingSold(building.name, value);
        
        toast.success(`${building.name} vendu pour ${value} As!`);
        return true;
      } else {
        toast.error("La vente n'a pas pu être complétée");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la vente du bâtiment:", error);
      toast.error("Une erreur est survenue lors de la vente");
      return false;
    }
  }, [buildings, calculateBuildingValue, sellBuilding, buildingSold]);
  
  // Calculate total property value
  const calculateTotalPropertyValue = useCallback((): number => {
    return buildings.reduce((total, building) => {
      return total + calculateBuildingValue(building);
    }, 0);
  }, [buildings, calculateBuildingValue]);
  
  // Calculate estimated annual income from properties
  const calculateAnnualIncome = useCallback((): number => {
    // In a real app, this would calculate based on property type, location, etc.
    return buildings.reduce((total, building) => {
      // Example calculation
      const baseIncome = building.buildingType === 'rural' ? 5000 : 3000;
      const conditionFactor = building.condition / 100;
      return total + (baseIncome * conditionFactor);
    }, 0);
  }, [buildings]);
  
  // Get counts and statistics
  const getPropertyStats = useCallback(() => {
    return {
      totalCount: buildings.length,
      urbanCount: urbanBuildings.length,
      ruralCount: ruralBuildings.length,
      religiousCount: religiousBuildings.length,
      publicCount: publicBuildings.length,
      totalValue: calculateTotalPropertyValue(),
      annualIncome: calculateAnnualIncome(),
      propertyNeedingMaintenance: buildings.filter(b => b.condition < 70).length
    };
  }, [
    buildings, 
    urbanBuildings, 
    ruralBuildings, 
    religiousBuildings, 
    publicBuildings, 
    calculateTotalPropertyValue, 
    calculateAnnualIncome
  ]);
  
  return {
    // Building collections
    buildings,
    urbanBuildings,
    ruralBuildings,
    religiousBuildings,
    publicBuildings,
    
    // Financial info
    balance,
    
    // Building operations
    handleAddProperty,
    sellBuilding: handleSellBuilding,
    toggleMaintenance,
    performMaintenance,
    assignSlaves,
    calculateBuildingValue,
    
    // Statistics
    getPropertyStats,
    calculateTotalPropertyValue,
    calculateAnnualIncome
  };
}
