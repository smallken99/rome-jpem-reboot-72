
import { useEffect, useState, useCallback } from 'react';
import { Property, Building, PropertyUpgrade } from '@/types/proprietes';
import { toast } from '@/components/ui-custom/toast';
import { v4 as uuidv4 } from 'uuid';

export interface PropertyStats {
  totalValue: number;
  yearlyIncome: number;
  yearlyMaintenance: number;
  totalProperties: number;
  netYearlyIncome: number;
}

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  type: string;
  name: string;
  location: string;
  value: number;
  maintenance: number;
  condition: number;
  workers?: number;
  securityLevel?: number;
  maintenanceLevel?: number;
  status?: string;
  upgrades?: PropertyUpgrade[];
  income?: number;
}

export const useBuildingManagement = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  
  // Calculate property portfolio stats
  const calculateStats = useCallback(() => {
    const stats: PropertyStats = {
      totalValue: 0,
      yearlyIncome: 0,
      yearlyMaintenance: 0,
      totalProperties: buildings.length,
      netYearlyIncome: 0
    };
    
    buildings.forEach(building => {
      stats.totalValue += building.value;
      stats.yearlyIncome += building.income || 0;
      stats.yearlyMaintenance += building.maintenance;
    });
    
    stats.netYearlyIncome = stats.yearlyIncome - stats.yearlyMaintenance;
    
    return stats;
  }, [buildings]);
  
  // Add a new building to the portfolio
  const addBuilding = useCallback((newBuilding: Omit<Building, 'id'>) => {
    const building = {
      ...newBuilding,
      id: uuidv4()
    };
    
    setBuildings(prev => [...prev, building as Building]);
    toast.success(`${building.name} a été ajouté à votre portfolio immobilier`);
    
    return building.id;
  }, []);
  
  // Sell a building and remove it from the portfolio
  const sellBuilding = useCallback((buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    
    if (!building) {
      toast.error("Propriété introuvable");
      return 0;
    }
    
    setBuildings(prev => prev.filter(b => b.id !== buildingId));
    toast.success(`${building.name} a été vendu avec succès`);
    
    return building.value;
  }, [buildings]);
  
  // Maintain a building to improve its condition
  const maintainBuilding = useCallback((buildingId: string, amount: number) => {
    const building = buildings.find(b => b.id === buildingId);
    
    if (!building) {
      toast.error("Propriété introuvable");
      return false;
    }
    
    setBuildings(prev => 
      prev.map(b => {
        if (b.id === buildingId) {
          return {
            ...b,
            condition: Math.min(100, b.condition + amount * 5)
          };
        }
        return b;
      })
    );
    
    toast.success(`Maintenance effectuée sur ${building.name}`);
    return true;
  }, [buildings]);
  
  // Install an upgrade on a building
  const installUpgrade = useCallback((buildingId: string, upgradeId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    
    if (!building) {
      toast.error("Propriété introuvable");
      return false;
    }
    
    // Check if upgrade already installed
    const hasUpgrade = building.upgrades && building.upgrades.some(u => u.id === upgradeId);
    
    if (hasUpgrade) {
      toast.error("Cette amélioration est déjà installée");
      return false;
    }
    
    // Implement upgrade installation
    setBuildings(prev => 
      prev.map(b => {
        if (b.id === buildingId) {
          return {
            ...b,
            upgrades: [...(b.upgrades || []), { id: upgradeId }]
          };
        }
        return b;
      })
    );
    
    toast.success(`Amélioration installée sur ${building.name}`);
    return true;
  }, [buildings]);

  // Additional methods required by components
  const updateMaintenanceEnabled = () => {};
  const updateBuildingCondition = () => {};
  const assignSlaves = () => {};

  const stats = calculateStats();
  
  useEffect(() => {
    // Initialize with example buildings
    if (buildings.length === 0) {
      setBuildings([
        {
          id: '1',
          type: 'domus',
          name: 'Domus du Palatin',
          location: 'Quartier du Palatin',
          value: 200000,
          maintenance: 5000,
          condition: 80,
          income: 0
        },
        {
          id: '2',
          type: 'insula',
          name: 'Insula de Subure',
          location: 'Quartier de Subure',
          value: 120000,
          maintenance: 3000,
          condition: 60,
          income: 12000
        }
      ]);
    }
  }, [buildings.length]);
  
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
