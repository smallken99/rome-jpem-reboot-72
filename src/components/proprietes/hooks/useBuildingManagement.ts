
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
  
  return {
    ownedBuildings,
    isLoading,
    purchaseBuilding,
    sellBuilding,
    toggleMaintenance,
    performMaintenance,
    calculateBuildingValue,
    assignSlaves
  };
}
