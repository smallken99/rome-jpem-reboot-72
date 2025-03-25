
import { useState, useEffect } from 'react';
import { useBuildingInventory } from './useBuildingInventory';
import { useBuildingSale } from './useBuildingSale';
import { useEconomy } from '@/hooks/useEconomy';
import { OwnedBuilding } from './types';
import { toast } from 'sonner';

export function useOwnedBuildings() {
  const { 
    buildings, 
    updateBuildingProperty, 
    performBuildingMaintenance, 
    toggleBuildingMaintenance,
    collectBuildingIncome 
  } = useBuildingInventory();
  
  const { 
    sellBuilding,
    calculateBuildingValue
  } = useBuildingSale();
  
  // Effectuer une maintenance sur un bâtiment
  const performMaintenance = (buildingId: string): boolean => {
    try {
      const result = performBuildingMaintenance(buildingId);
      if (result) {
        toast.success("Maintenance effectuée avec succès");
      } else {
        toast.error("La maintenance n'a pas pu être effectuée");
      }
      return result;
    } catch (error) {
      console.error("Erreur lors de la maintenance:", error);
      toast.error("Une erreur est survenue lors de la maintenance");
      return false;
    }
  };
  
  // Activer/désactiver la maintenance automatique
  const toggleMaintenanceStatus = (buildingId: string, enabled: boolean): boolean => {
    try {
      updateBuildingProperty(buildingId, 'maintenanceEnabled', enabled);
      toast.success(enabled ? "Maintenance activée" : "Maintenance désactivée");
      return true;
    } catch (error) {
      console.error("Erreur lors du changement de statut de maintenance:", error);
      toast.error("Une erreur est survenue");
      return false;
    }
  };
  
  // Renommer un bâtiment
  const renameBuilding = (buildingId: string, newName: string): boolean => {
    try {
      if (!newName.trim()) {
        toast.error("Le nom ne peut pas être vide");
        return false;
      }
      
      updateBuildingProperty(buildingId, 'name', newName);
      toast.success("Bâtiment renommé avec succès");
      return true;
    } catch (error) {
      console.error("Erreur lors du renommage du bâtiment:", error);
      toast.error("Une erreur est survenue lors du renommage");
      return false;
    }
  };
  
  // Collecter les revenus d'un bâtiment
  const collectIncome = (buildingId: string): boolean => {
    try {
      const income = collectBuildingIncome(buildingId);
      return income > 0;
    } catch (error) {
      console.error("Erreur lors de la collecte des revenus:", error);
      toast.error("Une erreur est survenue lors de la collecte des revenus");
      return false;
    }
  };
  
  // Obtenir la valeur estimée d'un bâtiment
  const getEstimatedValue = (buildingId: string): number => {
    const building = buildings.find(b => b.id.toString() === buildingId);
    if (!building) return 0;
    
    return calculateBuildingValue(building);
  };
  
  // Calculer l'efficacité d'un bâtiment (simple version)
  const getEfficiency = (buildingId: string): number => {
    const building = buildings.find(b => b.id.toString() === buildingId);
    if (!building) return 0;
    
    // Facteur d'état du bâtiment
    const conditionFactor = building.condition / 100;
    
    // Facteur de maintenance (si la maintenance est activée)
    const maintenanceFactor = building.maintenanceEnabled ? 1.0 : 0.7;
    
    // Facteur d'esclaves (simplifié)
    let slavesFactor = 0.5; // Valeur de base si pas d'esclaves
    if (building.slaves && building.slaves > 0) {
      // Supposons un nombre optimal d'esclaves de 10 pour cet exemple
      const optimalSlaves = 10;
      slavesFactor = Math.min(1.2, (building.slaves / optimalSlaves) * 0.7 + 0.5);
    }
    
    // Calculer l'efficacité totale (0-100%)
    const rawEfficiency = conditionFactor * maintenanceFactor * slavesFactor * 100;
    
    // Limiter entre 0 et 100
    return Math.min(100, Math.max(0, rawEfficiency));
  };
  
  return {
    ownedBuildings: buildings,
    performMaintenance,
    toggleMaintenanceStatus,
    renameBuilding,
    sellBuilding,
    collectIncome,
    getEstimatedValue,
    getEfficiency
  };
}
