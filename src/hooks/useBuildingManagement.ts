
import { useState, useCallback } from 'react';
import { OwnedBuilding, BuildingType } from '@/types/buildings';
import { useEconomy } from './useEconomy';
import { toast } from 'sonner';

export const useBuildingManagement = (initialBuildings: OwnedBuilding[] = []) => {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>(initialBuildings);
  const { makePayment, receivePayment } = useEconomy();
  
  // Ajouter un bâtiment
  const addBuilding = useCallback((building: Omit<OwnedBuilding, 'id'>): string => {
    const newId = `building-${Date.now()}`;
    const newBuilding: OwnedBuilding = {
      ...building,
      id: newId,
      condition: building.condition || 100,
      maintenanceEnabled: building.maintenanceEnabled || false,
      purchaseDate: building.purchaseDate || new Date()
    };
    
    setBuildings(prev => [...prev, newBuilding]);
    return newId;
  }, []);
  
  // Acheter un bâtiment
  const purchaseBuilding = useCallback((building: Omit<OwnedBuilding, 'id'>, cost: number): string | null => {
    // Vérifier si les fonds sont suffisants
    if (!makePayment(cost, "Vendeur de propriété", "Acquisition immobilière", `Achat de ${building.name}`)) {
      return null;
    }
    
    return addBuilding(building);
  }, [makePayment, addBuilding]);
  
  // Vendre un bâtiment
  const sellBuilding = useCallback((buildingId: string | number): boolean => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return false;
    
    // Calculer la valeur de vente (exemple: 80% de la valeur d'achat)
    const saleValue = (building.maintenanceCost || 0) * 100 * (building.condition / 100);
    
    // Recevoir le paiement
    receivePayment(saleValue, "Acheteur de propriété", "Vente immobilière", `Vente de ${building.name}`);
    
    // Supprimer le bâtiment
    setBuildings(prev => prev.filter(b => b.id !== buildingId));
    
    return true;
  }, [buildings, receivePayment]);
  
  // Activer/désactiver la maintenance automatique
  const updateMaintenanceEnabled = useCallback((buildingId: string | number, enabled: boolean): void => {
    setBuildings(prev => prev.map(building => 
      building.id === buildingId 
        ? { ...building, maintenanceEnabled: enabled } 
        : building
    ));
  }, []);
  
  // Mettre à jour le niveau de maintenance
  const updateMaintenanceLevel = useCallback((buildingId: string | number, level: number): void => {
    setBuildings(prev => prev.map(building => 
      building.id === buildingId 
        ? { ...building, maintenanceLevel: level } 
        : building
    ));
  }, []);
  
  // Mettre à jour le niveau de sécurité
  const updateSecurityLevel = useCallback((buildingId: string | number, level: number): void => {
    setBuildings(prev => prev.map(building => 
      building.id === buildingId 
        ? { ...building, securityLevel: level } 
        : building
    ));
  }, []);
  
  // Mettre à jour l'état du bâtiment
  const updateBuildingCondition = useCallback((buildingId: string | number, newCondition: number): boolean => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return false;
    
    // Calculer le coût des réparations
    const repairCost = newCondition > building.condition 
      ? Math.round((newCondition - building.condition) * 50)
      : 0;
    
    // Si le coût est supérieur à 0, effectuer le paiement
    if (repairCost > 0) {
      const paymentSuccess = makePayment(
        repairCost, 
        "Travaux de réparation", 
        "Entretien des propriétés", 
        `Réparation de ${building.name}`
      );
      
      if (!paymentSuccess) return false;
    }
    
    // Mettre à jour l'état du bâtiment
    setBuildings(prev => prev.map(b => 
      b.id === buildingId 
        ? { ...b, condition: newCondition } 
        : b
    ));
    
    return true;
  }, [buildings, makePayment]);
  
  // Effectuer une rénovation complète
  const renovateBuilding = useCallback((buildingId: string | number): boolean => {
    return updateBuildingCondition(buildingId, 100);
  }, [updateBuildingCondition]);
  
  // Assigner des esclaves à un bâtiment
  const assignSlaves = useCallback((buildingId: string | number, count: number): void => {
    setBuildings(prev => prev.map(building => 
      building.id === buildingId 
        ? { ...building, slaves: count } 
        : building
    ));
  }, []);
  
  // Mettre à jour le nombre de travailleurs
  const updateWorkers = useCallback((buildingId: string | number, workers: number): void => {
    setBuildings(prev => prev.map(building => 
      building.id === buildingId 
        ? { ...building, workers } 
        : building
    ));
  }, []);
  
  // Trouver un bâtiment par ID
  const findBuildingById = useCallback((id: string | number): OwnedBuilding | undefined => {
    return buildings.find(building => building.id === id);
  }, [buildings]);
  
  return {
    buildings,
    addBuilding,
    purchaseBuilding,
    sellBuilding,
    updateMaintenanceEnabled,
    updateMaintenanceLevel,
    updateSecurityLevel,
    updateBuildingCondition,
    renovateBuilding,
    assignSlaves,
    updateWorkers,
    findBuildingById
  };
};
