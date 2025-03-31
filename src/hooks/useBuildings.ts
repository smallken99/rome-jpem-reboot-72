
import { useEffect, useState } from 'react';
import { buildingService } from '@/services/buildingService';
import { OwnedBuilding } from '@/components/proprietes/types/property';

/**
 * Hook pour la gestion des bâtiments simplifié
 */
export function useBuildings() {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>(buildingService.getAllBuildings());
  const [stats, setStats] = useState(buildingService.calculateBuildingStats());
  
  useEffect(() => {
    // S'abonner aux changements de bâtiments
    const unsubscribe = buildingService.subscribeToBuildings(newBuildings => {
      setBuildings(newBuildings);
      setStats(buildingService.calculateBuildingStats());
    });
    
    // Nettoyage
    return () => {
      unsubscribe();
    };
  }, []);
  
  return {
    buildings,
    stats,
    // Fonctions de gestion des bâtiments
    addBuilding: buildingService.addBuilding.bind(buildingService),
    removeBuilding: buildingService.removeBuilding.bind(buildingService),
    updateBuilding: buildingService.updateBuilding.bind(buildingService),
    updateBuildingProperty: buildingService.updateBuildingProperty.bind(buildingService),
    getBuilding: buildingService.getBuilding.bind(buildingService),
    getBuildingsByType: buildingService.getBuildingsByType.bind(buildingService),
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
    applyUpgrade: buildingService.applyUpgrade.bind(buildingService)
  };
}
