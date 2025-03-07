
import { useState } from 'react';
import { toast } from 'sonner';
import { useBuildingInventory } from './useBuildingInventory';

export function useSlaveAssignment() {
  const { ownedBuildings, updateBuildingProperty } = useBuildingInventory();
  
  // Assign slaves to a building
  const assignSlaves = (buildingId: number, slaveCount: number) => {
    updateBuildingProperty(buildingId, 'slaves', slaveCount);
    
    const building = ownedBuildings.find(b => b.id === buildingId);
    if (building) {
      toast.success(`${slaveCount} esclaves assignés à ${building.name}`);
    }
  };
  
  return {
    assignSlaves
  };
}
