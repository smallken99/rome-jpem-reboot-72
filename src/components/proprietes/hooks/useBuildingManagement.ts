
import { useState } from 'react';
import { useBuildingInventory } from './building/useBuildingInventory';
import { useBuildingPurchase } from './building/useBuildingPurchase';
import { useBuildingSale } from './building/useBuildingSale';
import { useBuildingMaintenance } from './building/useBuildingMaintenance';
import { useSlaveAssignment } from './building/useSlaveAssignment';
import { OwnedBuilding } from './building/types';

// Re-export the OwnedBuilding type
export type { OwnedBuilding } from './building/types';

// Unified hook that combines all building management hooks
export function useBuildingManagement() {
  // Use the individual hooks
  const { 
    ownedBuildings 
  } = useBuildingInventory();
  
  const { 
    isLoading: isPurchaseLoading, 
    purchaseBuilding 
  } = useBuildingPurchase();
  
  const { 
    isLoading: isSaleLoading, 
    calculateBuildingValue, 
    sellBuilding 
  } = useBuildingSale();
  
  const { 
    isLoading: isMaintenanceLoading, 
    toggleMaintenance, 
    performMaintenance 
  } = useBuildingMaintenance();
  
  const { 
    assignSlaves 
  } = useSlaveAssignment();
  
  // Combine loading states
  const isLoading = isPurchaseLoading || isSaleLoading || isMaintenanceLoading;
  
  const buildings = ownedBuildings;
  const balance = 150000; // Valeur temporaire pour tester
  
  // Fonction temporaire pour ajouter des propriétés
  const handleAddProperty = (
    buildingId: string,
    buildingType: "urban" | "rural" | "religious" | "public",
    location: string,
    customName?: string
  ): boolean => {
    console.log(`Adding property: ${buildingId}, ${buildingType}, ${location}, ${customName}`);
    return true;
  };
  
  return {
    ownedBuildings,
    buildings,
    isLoading,
    purchaseBuilding,
    sellBuilding,
    toggleMaintenance,
    performMaintenance,
    calculateBuildingValue,
    assignSlaves,
    handleAddProperty,
    balance,
    ruralBuildings: ownedBuildings.filter(b => b.buildingType === "rural"),
    urbanBuildings: ownedBuildings.filter(b => b.buildingType === "urban"),
    religiousBuildings: ownedBuildings.filter(b => b.buildingType === "religious"),
    publicBuildings: ownedBuildings.filter(b => b.buildingType === "public")
  };
}
