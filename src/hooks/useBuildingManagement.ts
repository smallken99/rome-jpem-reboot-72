
import { useState, useCallback } from 'react';
import { OwnedBuilding, BuildingType } from '@/types/buildings';
import { toast } from 'sonner';

// Données de test pour les bâtiments
const initialBuildings: OwnedBuilding[] = [
  {
    id: 'building-1',
    buildingId: 'domus-1',
    name: 'Domus Palatina',
    buildingType: 'urban',
    type: 'domus',
    location: 'Rome',
    condition: 85,
    maintenanceLevel: 2,
    income: 0,
    workers: 5,
    slaves: 5,
    securityLevel: 2,
    description: 'Une magnifique maison patricienne située près du forum',
    maintenanceCost: 500,
    maintenanceEnabled: true,
    purchaseDate: new Date('2023-01-15')
  },
  {
    id: 'building-2',
    buildingId: 'insula-1',
    name: 'Insula de la Via Sacra',
    buildingType: 'urban',
    type: 'insula',
    location: 'Rome',
    condition: 70,
    maintenanceLevel: 1,
    income: 3000,
    workers: 2,
    slaves: 2,
    securityLevel: 1,
    description: 'Un immeuble locatif de trois étages avec plusieurs appartements et boutiques',
    maintenanceCost: 800,
    maintenanceEnabled: true,
    purchaseDate: new Date('2022-08-10')
  },
  {
    id: 'building-3',
    buildingId: 'villa-1',
    name: 'Villa Rustica',
    buildingType: 'rural',
    type: 'villa',
    location: 'Campanie',
    condition: 90,
    maintenanceLevel: 3,
    income: 5000,
    workers: 25,
    slaves: 25,
    securityLevel: 2,
    description: 'Une vaste propriété rurale produisant du vin et de l\'huile d\'olive',
    maintenanceCost: 1200,
    maintenanceEnabled: true,
    purchaseDate: new Date('2023-03-22')
  }
];

export const useBuildings = (initialState = initialBuildings) => {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>(initialState);
  
  // Trouver un bâtiment par son ID
  const findBuildingById = useCallback((id: string): OwnedBuilding | undefined => {
    return buildings.find(building => building.id === id);
  }, [buildings]);
  
  // Ajouter un nouveau bâtiment
  const addBuilding = useCallback((building: Omit<OwnedBuilding, 'id'>) => {
    const newId = `building-${buildings.length + 1}`;
    const newBuilding: OwnedBuilding = {
      ...building,
      id: newId
    };
    
    setBuildings(prev => [...prev, newBuilding]);
    toast.success(`${building.name} a été ajouté à vos propriétés`);
    
    return newId;
  }, [buildings]);
  
  // Mettre à jour un bâtiment existant
  const updateBuilding = useCallback((id: string, updates: Partial<OwnedBuilding>) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id ? { ...building, ...updates } : building
      )
    );
  }, []);
  
  // Vendre un bâtiment
  const sellBuilding = useCallback((id: string): boolean => {
    const building = findBuildingById(id);
    if (!building) return false;
    
    setBuildings(prev => prev.filter(b => b.id !== id));
    toast.success(`${building.name} a été vendu avec succès`);
    
    return true;
  }, [findBuildingById]);
  
  // Mettre à jour le niveau d'entretien
  const updateMaintenanceLevel = useCallback((id: string, level: number) => {
    updateBuilding(id, { maintenanceLevel: level });
    toast.success("Niveau d'entretien mis à jour");
  }, [updateBuilding]);
  
  // Mettre à jour le niveau de sécurité
  const updateSecurityLevel = useCallback((id: string, level: number) => {
    updateBuilding(id, { securityLevel: level });
    toast.success("Niveau de sécurité mis à jour");
  }, [updateBuilding]);
  
  // Activer/désactiver la maintenance
  const updateMaintenanceEnabled = useCallback((id: string, enabled: boolean) => {
    updateBuilding(id, { maintenanceEnabled: enabled });
    toast.success(enabled ? "Maintenance activée" : "Maintenance désactivée");
  }, [updateBuilding]);
  
  // Mettre à jour l'état du bâtiment
  const updateBuildingCondition = useCallback((id: string, condition: number) => {
    updateBuilding(id, { condition: Math.min(100, Math.max(0, condition)) });
  }, [updateBuilding]);
  
  // Rénover complètement un bâtiment
  const renovateBuilding = useCallback((id: string) => {
    updateBuilding(id, { condition: 100 });
    toast.success("Bâtiment entièrement rénové");
  }, [updateBuilding]);
  
  // Assigner des esclaves à un bâtiment
  const assignSlaves = useCallback((id: string, count: number) => {
    updateBuilding(id, { slaves: count, workers: count });
    toast.success(`${count} esclaves assignés`);
    return true;
  }, [updateBuilding]);
  
  // Mettre à jour le nombre de travailleurs
  const updateWorkers = useCallback((id: string, workers: number) => {
    updateBuilding(id, { workers });
    toast.success(`${workers} travailleurs assignés`);
  }, [updateBuilding]);
  
  // Calculer le revenu mensuel d'un bâtiment
  const calculateMonthlyIncome = useCallback((id: string): number => {
    const building = findBuildingById(id);
    if (!building) return 0;
    
    // Facteur basé sur l'état du bâtiment
    const conditionFactor = building.condition / 100;
    
    // Facteur basé sur les travailleurs (simplifié)
    const workerFactor = building.workers 
      ? Math.min(1.5, (building.workers / 10) + 0.5) 
      : 0.5;
    
    const baseIncome = building.income || 0;
    return Math.round(baseIncome * conditionFactor * workerFactor);
  }, [findBuildingById]);
  
  // Calculer le coût de maintenance mensuel
  const calculateMaintenanceCost = useCallback((id: string): number => {
    const building = findBuildingById(id);
    if (!building || !building.maintenanceEnabled) return 0;
    
    const baseCost = building.maintenanceCost || 0;
    const maintenanceLevelFactor = (building.maintenanceLevel || 1) * 0.3 + 0.7;
    
    return Math.round(baseCost * maintenanceLevelFactor);
  }, [findBuildingById]);
  
  return {
    buildings,
    findBuildingById,
    addBuilding,
    updateBuilding,
    sellBuilding,
    updateMaintenanceLevel,
    updateSecurityLevel,
    updateMaintenanceEnabled,
    updateBuildingCondition,
    renovateBuilding,
    assignSlaves,
    updateWorkers,
    calculateMonthlyIncome,
    calculateMaintenanceCost
  };
};
