
import { useState, useCallback } from 'react';
import { OwnedBuilding } from '../types/buildingTypes';
import { calculateIncomeByMaintenance, calculateMaintenanceCost } from '../property-management/card/buildingAdapter';

// Hook personnalisé pour gérer les bâtiments
export const useBuildings = (initialBuildings: OwnedBuilding[] = []) => {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>(initialBuildings);

  // Filtrer les bâtiments par type
  const urbanBuildings = buildings.filter(b => b.type === 'urban');
  const ruralBuildings = buildings.filter(b => b.type === 'rural');
  const religiousBuildings = buildings.filter(b => b.type === 'religious');
  const commercialBuildings = buildings.filter(b => b.type === 'commercial');
  const industrialBuildings = buildings.filter(b => b.type === 'industrial');

  // Mettre à jour le niveau d'entretien d'un bâtiment
  const updateMaintenanceLevel = useCallback((buildingId: string, level: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { ...building, maintenanceLevel: level } 
          : building
      )
    );
  }, []);

  // Mettre à jour le niveau de sécurité d'un bâtiment
  const updateSecurityLevel = useCallback((buildingId: string, level: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { ...building, securityLevel: level } 
          : building
      )
    );
  }, []);

  // Mettre à jour le nombre de travailleurs d'un bâtiment
  const updateWorkers = useCallback((buildingId: string, workers: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { ...building, workers } 
          : building
      )
    );
  }, []);

  // Rénover un bâtiment pour améliorer son état
  const renovateBuilding = useCallback((buildingId: string) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { ...building, condition: 100 } 
          : building
      )
    );
  }, []);

  // Vendre un bâtiment
  const sellBuilding = useCallback((buildingId: string) => {
    setBuildings(prev => prev.filter(building => building.id !== buildingId));
  }, []);

  // Trouver un bâtiment par son ID
  const findBuildingById = useCallback((buildingId: string) => {
    return buildings.find(building => building.id === buildingId);
  }, [buildings]);

  // Calculer le revenu total annuel
  const calculateAnnualIncome = useCallback(() => {
    return buildings.reduce((total, building) => {
      return total + calculateIncomeByMaintenance(building);
    }, 0);
  }, [buildings]);

  // Calculer le coût total d'entretien
  const calculateMaintenanceCosts = useCallback(() => {
    return buildings.reduce((total, building) => {
      return total + calculateMaintenanceCost(building);
    }, 0);
  }, [buildings]);

  // Calculer le ratio de rentabilité global
  const calculateProfitability = useCallback(() => {
    const totalIncome = calculateAnnualIncome();
    const totalCosts = calculateMaintenanceCosts();
    
    if (totalCosts === 0) return 100; // Pour éviter la division par zéro
    return Math.round((totalIncome / totalCosts) * 100);
  }, [calculateAnnualIncome, calculateMaintenanceCosts]);

  return {
    buildings,
    urbanBuildings,
    ruralBuildings,
    religiousBuildings,
    commercialBuildings,
    industrialBuildings,
    updateMaintenanceLevel,
    updateSecurityLevel,
    updateWorkers,
    renovateBuilding,
    sellBuilding,
    findBuildingById,
    calculateAnnualIncome,
    calculateMaintenanceCosts,
    calculateProfitability
  };
};
