
import { useEffect, useState } from 'react';
import { buildingService } from '@/services/buildingService';
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { adaptOwnedBuilding } from '@/utils/typeAdapters';

/**
 * Hook pour la gestion des bâtiments
 */
export function useBuildings() {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>(
    buildingService.getAllBuildings().map(adaptOwnedBuilding)
  );
  const [stats, setStats] = useState(buildingService.calculateBuildingStats());
  
  useEffect(() => {
    // S'abonner aux changements de bâtiments
    const unsubscribe = buildingService.subscribeToBuildings(newBuildings => {
      setBuildings(newBuildings.map(adaptOwnedBuilding));
      setStats(buildingService.calculateBuildingStats());
    });
    
    // Nettoyage
    return () => {
      unsubscribe();
    };
  }, []);
  
  // Update a building's income with a multiplier
  const updateBuildingIncome = (factor: number) => {
    buildings.forEach(building => {
      if (building.income) {
        const updatedBuilding = {
          ...building,
          income: Math.round((building.income || 0) * factor)
        };
        buildingService.updateBuilding(String(building.id));
      }
    });
  };
  
  // Update a building's maintenance cost with a multiplier
  const updateMaintenanceCost = (factor: number) => {
    buildings.forEach(building => {
      const updatedBuilding = {
        ...building,
        maintenanceCost: Math.round((building.maintenanceCost || 0) * factor),
        maintenance: Math.round((building.maintenance || 0) * factor)
      };
      buildingService.updateBuilding(String(building.id));
    });
  };
  
  return {
    buildings,
    stats,
    // Fonctions de gestion des bâtiments
    addBuilding: (buildingData: any) => {
      const adaptedBuilding = adaptOwnedBuilding(buildingData);
      return buildingService.addBuilding(adaptedBuilding);
    },
    removeBuilding: buildingService.removeBuilding.bind(buildingService),
    updateBuilding: (id: string | number) => {
      return buildingService.updateBuilding(String(id));
    },
    updateBuildingProperty: buildingService.updateBuildingProperty.bind(buildingService),
    getBuilding: (id: string | number) => {
      const building = buildingService.getBuilding(String(id));
      return building ? adaptOwnedBuilding(building) : null;
    },
    getBuildingsByType: (type: string) => {
      return buildingService.getBuildingsByType(type).map(adaptOwnedBuilding);
    },
    // Fonctions économiques liées aux bâtiments
    purchaseBuilding: buildingService.purchaseBuilding.bind(buildingService),
    sellBuilding: buildingService.sellBuilding.bind(buildingService),
    collectBuildingIncome: buildingService.collectBuildingIncome.bind(buildingService),
    collectAllBuildingIncomes: buildingService.collectAllBuildingIncomes.bind(buildingService),
    performMaintenance: buildingService.performMaintenance.bind(buildingService),
    // Fonctions de calcul
    calculateBuildingIncome: buildingService.calculateBuildingIncome.bind(buildingService),
    calculateMaintenanceCost: buildingService.calculateMaintenanceCost.bind(buildingService),
    calculateBuildingStats: buildingService.calculateBuildingStats.bind(buildingService),
    applyUpgrade: buildingService.applyUpgrade.bind(buildingService),
    // Added functions for equilibre effects
    updateBuildingIncome,
    updateMaintenanceCost
  };
}
