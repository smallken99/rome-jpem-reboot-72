
import { useState, useEffect, useCallback } from 'react';
import { PropertyStats, Building, PropertyUpgrade } from '@/types/proprietes';
import { toast } from '@/components/ui-custom/toast';

export const useBuildingManagement = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  
  const [stats, setStats] = useState<PropertyStats>({
    totalIncome: 0,
    totalMaintenance: 0,
    totalValue: 0,
    totalProperties: 0,
  });
  
  useEffect(() => {
    // Calculate building stats
    if (buildings.length > 0) {
      const totalIncome = buildings.reduce((sum, b) => sum + (b.income || 0), 0);
      const totalMaintenance = buildings.reduce((sum, b) => sum + b.maintenance, 0);
      const totalValue = buildings.reduce((sum, b) => sum + b.value, 0);
      
      setStats({
        totalIncome,
        totalMaintenance,
        totalValue,
        totalProperties: buildings.length,
        yearlyMaintenance: totalMaintenance * 4 // Quarterly
      });
    }
  }, [buildings]);
  
  const addBuilding = useCallback((newBuilding: Omit<Building, 'id'>) => {
    const buildingId = `building-${Date.now()}`;
    const building = {
      ...newBuilding,
      id: buildingId,
      income: newBuilding.income || 0,
    };
    
    setBuildings(prev => [...prev, building as Building]);
    toast.success(`Property acquired: ${building.name}`);
    return buildingId;
  }, []);
  
  const sellBuilding = useCallback((buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return 0;
    
    const sellPrice = Math.floor(building.value * 0.85); // Sell at 85% of value
    
    setBuildings(prev => prev.filter(b => b.id !== buildingId));
    toast.success(`Property sold: ${building.name} for ${sellPrice} denarii`);
    
    return sellPrice;
  }, [buildings]);
  
  const maintainBuilding = useCallback((buildingId: string, amount: number) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return false;
    
    const updatedBuilding = {
      ...building, 
      condition: Math.min(100, building.condition + amount),
      status: "good"
    };
    
    setBuildings(prev => 
      prev.map(b => b.id === buildingId ? updatedBuilding : b)
    );
    
    toast.success(`Maintenance performed on ${building.name}`);
    return true;
  }, [buildings]);
  
  const installUpgrade = useCallback((buildingId: string, upgradeId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return false;
    
    // Check if building already has upgrades array
    const existingUpgrades = building.upgrades || [];
    
    // Only install if not already installed
    if (existingUpgrades.some(u => u.id === upgradeId)) {
      return false;
    }
    
    // Add the upgrade
    const upgrades = [
      ...existingUpgrades,
      { id: upgradeId } as PropertyUpgrade
    ];
    
    setBuildings(prev => 
      prev.map(b => b.id === buildingId ? { ...b, upgrades } : b)
    );
    
    toast.success(`Upgrade installed on ${building.name}`);
    return true;
  }, [buildings]);

  return {
    buildings,
    selectedBuilding,
    setSelectedBuilding,
    stats,
    addBuilding,
    sellBuilding,
    maintainBuilding,
    installUpgrade
  };
};
