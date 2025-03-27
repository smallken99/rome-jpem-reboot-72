import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PropertyType, PropertyUpgrade } from '@/types/proprietes';

export interface Building {
  id: string;
  type: string;
  name: string;
  location: string;
  value: number;
  maintenance: number;
  condition: number;
  workers?: number;
  securityLevel?: number;
  maintenanceLevel?: number;
}

export interface PropertyStats {
  totalProperties: number;
  totalValue: number;
  totalIncome: number;
  totalMaintenance: number;
  urbanProperties: number;
  ruralProperties: number;
  commercialProperties: number;
  yearlyIncome?: number;
}

export const useBuildingManagement = (initialBuildings: Building[] = []) => {
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(buildings[0] || {
    id: 'default',
    name: '',
    type: 'domus',
    size: 0,
    cost: 0,
    value: 0,
    income: 0,
    maintenance: 0,
    status: 'good',
    description: '',
    location: ''
  });

  const stats: PropertyStats = {
    totalValue: buildings.reduce((sum, bldg) => sum + bldg.value, 0),
    yearlyIncome: buildings.reduce((sum, bldg) => sum + bldg.income, 0),
    yearlyMaintenance: buildings.reduce((sum, bldg) => sum + bldg.maintenance, 0),
    netYearlyProfit: buildings.reduce((sum, bldg) => sum + bldg.income - bldg.maintenance, 0),
    propertyCount: buildings.length,
    buildingCount: buildings.length,
    upgradePotential: 0
  };

  const addBuilding = (newBuilding: Omit<Building, 'id'>) => {
    const id = `building-${uuidv4()}`;
    const building = { ...newBuilding, id };
    setBuildings(prev => [...prev, building]);
    toast.success(`${building.name} ajouté avec succès`);
    return id;
  };

  const sellBuilding = (buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return 0;
    
    setBuildings(prev => prev.filter(b => b.id !== buildingId));
    toast.success(`${building.name} vendu avec succès`);
    return building.value;
  };

  const maintainBuilding = (buildingId: string, amount: number) => {
    const buildingIndex = buildings.findIndex(b => b.id === buildingId);
    if (buildingIndex === -1) return false;
    
    setBuildings(prev => {
      const updated = [...prev];
      const building = { ...updated[buildingIndex] };
      building.status = 'good';
      updated[buildingIndex] = building;
      return updated;
    });
    
    toast.success(`Entretien effectué avec succès`);
    return true;
  };

  const installUpgrade = (buildingId: string, upgradeId: string) => {
    const buildingIndex = buildings.findIndex(b => b.id === buildingId);
    if (buildingIndex === -1) return false;
    
    setBuildings(prev => {
      const updated = [...prev];
      const building = { ...updated[buildingIndex] };
      
      if (!building.upgrades) building.upgrades = [];
      
      building.upgrades = building.upgrades.map(upgrade => 
        upgrade.id === upgradeId ? { ...upgrade, installed: true } : upgrade
      );
      
      updated[buildingIndex] = building;
      return updated;
    });
    
    toast.success(`Amélioration installée avec succès`);
    return true;
  };

  const updateMaintenanceEnabled = (buildingId: string, enabled: boolean) => {
    return true;
  };

  const updateBuildingCondition = (buildingId: string, condition: number) => {
    return true;
  };

  const assignSlaves = (buildingId: string, count: number) => {
    return true;
  };

  return {
    buildings,
    selectedBuilding,
    setSelectedBuilding,
    stats,
    addBuilding,
    sellBuilding,
    maintainBuilding,
    installUpgrade,
    updateMaintenanceEnabled,
    updateBuildingCondition,
    assignSlaves
  };
};
