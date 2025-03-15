
import { useState } from 'react';
import { OwnedBuilding } from './types';

export function useBuildingInventory() {
  // Initial building inventory state
  const [ownedBuildings, setOwnedBuildings] = useState<OwnedBuilding[]>([
    {
      id: 1,
      buildingId: 'insula',
      buildingType: 'urban',
      name: 'Insula de la Via Sacra',
      location: 'Rome - Via Sacra',
      maintenanceEnabled: true,
      maintenanceCost: 1200,
      slaves: 3,
      condition: 85,
      purchaseDate: new Date(2023, 1, 15)
    },
    {
      id: 2,
      buildingId: 'domaine_vignoble',
      buildingType: 'rural',
      name: 'Domaine viticole de Campanie',
      location: 'Campanie',
      maintenanceEnabled: true,
      maintenanceCost: 6000,
      slaves: 25,
      condition: 92,
      purchaseDate: new Date(2022, 5, 10)
    },
    {
      id: 3,
      buildingId: 'villa_urbana',
      buildingType: 'urban',
      name: 'Villa Urbana du Palatin',
      location: 'Rome - Palatin',
      maintenanceEnabled: true,
      maintenanceCost: 5000,
      slaves: 12,
      condition: 95,
      purchaseDate: new Date(2022, 3, 20)
    },
    {
      id: 4,
      buildingId: 'temple',
      buildingType: 'religious',
      name: 'Temple de Minerve',
      location: 'Rome - Forum',
      maintenanceEnabled: false,
      maintenanceCost: 4000,
      slaves: 0,
      condition: 75,
      purchaseDate: new Date(2023, 8, 5)
    }
  ]);

  // Function to add a new building to inventory
  const addBuilding = (newBuilding: OwnedBuilding) => {
    setOwnedBuildings(prev => [...prev, newBuilding]);
  };

  // Function to remove a building from inventory
  const removeBuilding = (buildingId: number | string) => {
    setOwnedBuildings(prev => prev.filter(b => b.id !== buildingId));
  };

  // Function to update a building in inventory
  const updateBuilding = (updatedBuilding: OwnedBuilding) => {
    setOwnedBuildings(prev => 
      prev.map(building => 
        building.id === updatedBuilding.id ? updatedBuilding : building
      )
    );
  };

  // Function to update a specific property of a building
  const updateBuildingProperty = <K extends keyof OwnedBuilding>(
    buildingId: number | string, 
    property: K, 
    value: OwnedBuilding[K]
  ) => {
    setOwnedBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { ...building, [property]: value }
          : building
      )
    );
  };

  // Add the missing methods for compatibility
  const toggleBuildingMaintenance = (buildingId: number | string) => {
    const building = ownedBuildings.find(b => b.id === buildingId);
    if (building) {
      updateBuildingProperty(buildingId, 'maintenanceEnabled', !building.maintenanceEnabled);
      return true;
    }
    return false;
  };

  const performBuildingMaintenance = (buildingId: number | string) => {
    const building = ownedBuildings.find(b => b.id === buildingId);
    if (building) {
      updateBuildingProperty(buildingId, 'condition', Math.min(100, building.condition + 20));
      updateBuildingProperty(buildingId, 'lastMaintenance', new Date());
      return true;
    }
    return false;
  };

  // Alias buildings to ownedBuildings for compatibility
  const buildings = ownedBuildings;

  return {
    ownedBuildings,
    buildings,  // Alias for compatibility
    addBuilding,
    removeBuilding,
    updateBuilding,
    updateBuildingProperty,
    toggleBuildingMaintenance,
    performBuildingMaintenance
  };
}
