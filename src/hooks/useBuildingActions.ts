
import { useState, useCallback } from 'react';
import { useEconomy } from './useEconomy';
import { OwnedBuilding } from '@/components/proprietes/types/buildingTypes';
import { toast } from 'sonner';

interface UseBuildingActionsProps {
  initialBuildings?: OwnedBuilding[];
  onBuildingUpdated?: (building: OwnedBuilding) => void;
}

export function useBuildingActions({ initialBuildings = [], onBuildingUpdated }: UseBuildingActionsProps = {}) {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>(initialBuildings);
  const { balance, makePayment, receivePayment } = useEconomy();
  
  // Calcul du coût de maintenance par niveau
  const calculateMaintenanceCost = useCallback((building: OwnedBuilding, level: number) => {
    return Math.round(building.maintenanceCost * (level / 5));
  }, []);
  
  // Calcul du coût de sécurité par niveau
  const calculateSecurityCost = useCallback((building: OwnedBuilding, level: number) => {
    return Math.round(building.maintenanceCost * 0.5 * (level / 5));
  }, []);
  
  // Vérifier si le joueur peut se permettre un niveau de maintenance
  const canAffordMaintenance = useCallback((building: OwnedBuilding, level: number) => {
    const cost = calculateMaintenanceCost(building, level);
    return balance >= cost;
  }, [balance, calculateMaintenanceCost]);
  
  // Vérifier si le joueur peut se permettre un niveau de sécurité
  const canAffordSecurity = useCallback((building: OwnedBuilding, level: number) => {
    const cost = calculateSecurityCost(building, level);
    return balance >= cost;
  }, [balance, calculateSecurityCost]);
  
  // Effectuer une maintenance immédiate
  const performMaintenance = useCallback((buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    const maintenanceCost = Math.round(building.maintenanceCost * 0.5);
    
    if (balance < maintenanceCost) {
      toast.error(`Fonds insuffisants (${maintenanceCost} As nécessaires)`);
      return false;
    }
    
    // Effectuer le paiement
    const success = makePayment(
      maintenanceCost,
      `Maintenance de ${building.name}`,
      'Dépenses immobilières',
      `Réparation de ${building.name}`
    );
    
    if (!success) {
      toast.error("Paiement échoué");
      return false;
    }
    
    // Mettre à jour l'état du bâtiment
    const updatedBuilding = {
      ...building,
      condition: Math.min(100, building.condition + 20),
      lastMaintenance: new Date()
    };
    
    setBuildings(prev => 
      prev.map(b => b.id === buildingId ? updatedBuilding : b)
    );
    
    if (onBuildingUpdated) {
      onBuildingUpdated(updatedBuilding);
    }
    
    toast.success(`Maintenance effectuée avec succès sur ${building.name}`);
    return true;
  }, [buildings, balance, makePayment, onBuildingUpdated]);
  
  // Mettre à jour le niveau de maintenance
  const updateMaintenanceLevel = useCallback((buildingId: string, level: number) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    if (level === building.maintenanceLevel) {
      return true; // Pas de changement
    }
    
    const updatedBuilding = {
      ...building,
      maintenanceLevel: level
    };
    
    setBuildings(prev => 
      prev.map(b => b.id === buildingId ? updatedBuilding : b)
    );
    
    if (onBuildingUpdated) {
      onBuildingUpdated(updatedBuilding);
    }
    
    return true;
  }, [buildings, onBuildingUpdated]);
  
  // Mettre à jour le niveau de sécurité
  const updateSecurityLevel = useCallback((buildingId: string, level: number) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    if (level === building.securityLevel) {
      return true; // Pas de changement
    }
    
    const updatedBuilding = {
      ...building,
      securityLevel: level
    };
    
    setBuildings(prev => 
      prev.map(b => b.id === buildingId ? updatedBuilding : b)
    );
    
    if (onBuildingUpdated) {
      onBuildingUpdated(updatedBuilding);
    }
    
    return true;
  }, [buildings, onBuildingUpdated]);
  
  // Assigner des travailleurs
  const assignWorkers = useCallback((buildingId: string, workerCount: number) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    if (workerCount > (building.maxWorkers || 20)) {
      toast.error(`Ce bâtiment ne peut accueillir que ${building.maxWorkers || 20} travailleurs maximum`);
      return false;
    }
    
    const updatedBuilding = {
      ...building,
      workers: workerCount
    };
    
    setBuildings(prev => 
      prev.map(b => b.id === buildingId ? updatedBuilding : b)
    );
    
    if (onBuildingUpdated) {
      onBuildingUpdated(updatedBuilding);
    }
    
    return true;
  }, [buildings, onBuildingUpdated]);
  
  // Renommer un bâtiment
  const renameBuilding = useCallback((buildingId: string, newName: string) => {
    if (!newName.trim()) {
      toast.error("Le nom ne peut pas être vide");
      return false;
    }
    
    const building = buildings.find(b => b.id === buildingId);
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    const updatedBuilding = {
      ...building,
      name: newName
    };
    
    setBuildings(prev => 
      prev.map(b => b.id === buildingId ? updatedBuilding : b)
    );
    
    if (onBuildingUpdated) {
      onBuildingUpdated(updatedBuilding);
    }
    
    return true;
  }, [buildings, onBuildingUpdated]);
  
  // Activer/désactiver la maintenance automatique
  const toggleMaintenance = useCallback((buildingId: string, enabled: boolean) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    const updatedBuilding = {
      ...building,
      maintenanceEnabled: enabled
    };
    
    setBuildings(prev => 
      prev.map(b => b.id === buildingId ? updatedBuilding : b)
    );
    
    if (onBuildingUpdated) {
      onBuildingUpdated(updatedBuilding);
    }
    
    return true;
  }, [buildings, onBuildingUpdated]);
  
  // Collecter les revenus d'un bâtiment
  const collectIncome = useCallback((buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building || !building.income || building.income <= 0) {
      toast.error("Ce bâtiment ne génère pas de revenus");
      return false;
    }
    
    // Ajuster le revenu en fonction de l'état du bâtiment
    const conditionFactor = building.condition / 100;
    const workerFactor = building.workers ? Math.min(1, building.workers / (building.maxWorkers || 1)) : 0.5;
    const securityFactor = (building.securityLevel || 1) / 10 * 0.5 + 0.5; // Entre 0.5 et 1
    
    // Calculer le revenu ajusté
    const adjustedIncome = Math.round(
      building.income * conditionFactor * workerFactor * securityFactor
    );
    
    // Enregistrer la transaction
    receivePayment(
      adjustedIncome,
      building.name,
      "Revenus immobiliers",
      `Revenus de ${building.name}`
    );
    
    toast.success(`Revenus collectés: ${adjustedIncome} As de ${building.name}`);
    return true;
  }, [buildings, receivePayment]);
  
  // Vendre un bâtiment
  const sellBuilding = useCallback((buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    // Calculer la valeur de vente (80% de la valeur estimée)
    const saleValue = Math.round(building.value * 0.8);
    
    // Recevoir l'argent
    receivePayment(
      saleValue,
      `Vente de ${building.name}`,
      "Ventes immobilières",
      `Vente de ${building.name} à ${building.location}`
    );
    
    // Supprimer le bâtiment
    setBuildings(prev => prev.filter(b => b.id !== buildingId));
    
    toast.success(`${building.name} vendu pour ${saleValue} As`);
    return true;
  }, [buildings, receivePayment]);
  
  // Estimer la valeur d'un bâtiment
  const calculateBuildingValue = useCallback((building: OwnedBuilding) => {
    // Facteur de base
    const baseFactor = 1;
    
    // Facteur d'état (0.5 à 1.2)
    const conditionFactor = 0.5 + (building.condition / 100) * 0.7;
    
    // Facteur de localisation (peut être ajusté selon la logique du jeu)
    const locationFactor = 1;
    
    // Facteur de revenu (si le bâtiment génère des revenus)
    const incomeFactor = building.income ? 1 + (building.income / building.maintenanceCost) * 0.5 : 1;
    
    // Calculer la valeur
    return Math.round(building.value * baseFactor * conditionFactor * locationFactor * incomeFactor);
  }, []);
  
  // Estimer les revenus mensuels
  const calculateMonthlyIncome = useCallback((building: OwnedBuilding) => {
    if (!building.income) return 0;
    
    const conditionFactor = building.condition / 100;
    const workerFactor = building.workers ? Math.min(1, building.workers / (building.maxWorkers || 1)) : 0.5;
    const securityFactor = (building.securityLevel || 1) / 10 * 0.5 + 0.5; // Entre 0.5 et 1
    
    return Math.round(building.income * conditionFactor * workerFactor * securityFactor);
  }, []);
  
  // Estimer les dépenses mensuelles
  const calculateMonthlyExpenses = useCallback((building: OwnedBuilding) => {
    let expenses = 0;
    
    // Coût de maintenance
    if (building.maintenanceEnabled) {
      expenses += calculateMaintenanceCost(building, building.maintenanceLevel || 1);
    }
    
    // Coût de sécurité
    expenses += calculateSecurityCost(building, building.securityLevel || 1);
    
    // Coût des travailleurs (peut être ajusté selon la logique du jeu)
    const workerCost = (building.workers || 0) * 50; // 50 As par travailleur
    expenses += workerCost;
    
    return expenses;
  }, [calculateMaintenanceCost, calculateSecurityCost]);
  
  return {
    buildings,
    setBuildings,
    performMaintenance,
    updateMaintenanceLevel,
    updateSecurityLevel,
    assignWorkers,
    renameBuilding,
    toggleMaintenance,
    collectIncome,
    sellBuilding,
    calculateBuildingValue,
    calculateMonthlyIncome,
    calculateMonthlyExpenses,
    canAffordMaintenance,
    canAffordSecurity
  };
}
