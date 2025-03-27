
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Property, PropertyUpgrade, Building } from '@/types/proprietes';
import { toast } from '@/components/ui-custom/toast';

export interface PropertyStats {
  totalProperties: number;
  totalValue: number;
  totalIncome: number;
  totalMaintenance: number;
  urbanProperties: number;
  ruralProperties: number;
  commercialProperties: number;
  yearlyIncome?: number;
  yearlyMaintenance?: number;
}

export const useBuildingManagement = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building>({} as Building);
  
  // Calculate property statistics
  const calculateStats = useCallback((): PropertyStats => {
    return {
      totalProperties: buildings.length,
      totalValue: buildings.reduce((sum, b) => sum + b.value, 0),
      totalIncome: buildings.reduce((sum, b) => sum + (b.income || 0), 0),
      totalMaintenance: buildings.reduce((sum, b) => sum + b.maintenance, 0),
      urbanProperties: buildings.filter(b => b.type === 'urban' || b.type === 'domus' || b.type === 'insula').length,
      ruralProperties: buildings.filter(b => b.type === 'rural' || b.type === 'villa').length,
      commercialProperties: buildings.filter(b => b.type === 'commercial').length,
      yearlyIncome: buildings.reduce((sum, b) => sum + (b.income || 0) * 12, 0)
    };
  }, [buildings]);
  
  // Add a new building
  const addBuilding = useCallback((newBuilding: Omit<Building, 'id'>): string => {
    const buildingWithId = {
      ...newBuilding,
      id: uuidv4()
    };
    
    setBuildings(prev => [...prev, buildingWithId as Building]);
    return buildingWithId.id;
  }, []);
  
  // Sell an existing building
  const sellBuilding = useCallback((buildingId: string): number => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return 0;
    
    const sellValue = Math.floor(building.value * 0.7); // 70% of value
    setBuildings(prev => prev.filter(b => b.id !== buildingId));
    
    toast.success(`Bâtiment vendu pour ${sellValue} deniers`);
    return sellValue;
  }, [buildings]);
  
  // Maintain a building
  const maintainBuilding = useCallback((buildingId: string, amount: number): boolean => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return false;
    
    // Maintenance improves condition by 10% per 1000 deniers
    const conditionImprovement = Math.min(10, Math.floor(amount / 1000) * 10);
    const newCondition = Math.min(100, building.condition + conditionImprovement);
    
    setBuildings(prev => prev.map(b => {
      if (b.id === buildingId) {
        return {
          ...b,
          condition: newCondition,
          status: newCondition > 80 ? 'excellent' : 
                 newCondition > 60 ? 'good' : 
                 newCondition > 40 ? 'fair' : 
                 newCondition > 20 ? 'poor' : 'dilapidated'
        };
      }
      return b;
    }));
    
    toast.success(`Bâtiment entretenu, condition améliorée à ${newCondition}%`);
    return true;
  }, [buildings]);
  
  // Install upgrade on building
  const installUpgrade = useCallback((buildingId: string, upgradeId: string): boolean => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return false;
    
    const upgrades = building.upgrades || [];
    const upgradeExists = upgrades.some(u => u.id === upgradeId);
    if (upgradeExists) {
      upgrades.forEach(u => {
        if (u.id === upgradeId) u.installed = true;
      });
    }
    
    setBuildings(prev => prev.map(b => {
      if (b.id === buildingId) {
        return { ...b, upgrades };
      }
      return b;
    }));
    
    toast.success('Amélioration installée avec succès');
    return true;
  }, [buildings]);
  
  return {
    buildings,
    selectedBuilding,
    setSelectedBuilding,
    stats: calculateStats(),
    addBuilding,
    sellBuilding,
    maintainBuilding,
    installUpgrade
  };
};

export default useBuildingManagement;
