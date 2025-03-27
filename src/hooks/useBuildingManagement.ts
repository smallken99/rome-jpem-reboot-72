
import { useState, useCallback } from 'react';
import { Building, PropertyStats, PropertyUpgrade } from '@/types/proprietes';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const useBuildingManagement = (initialBuildings: Building[] = []) => {
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  // Calculate property statistics
  const calculateStats = useCallback((): PropertyStats => {
    const totalValue = buildings.reduce((sum, building) => sum + building.value, 0);
    const yearlyIncome = buildings.reduce((sum, building) => sum + building.income, 0);
    const yearlyMaintenance = buildings.reduce((sum, building) => sum + building.maintenance, 0);
    const netYearlyProfit = yearlyIncome - yearlyMaintenance;
    
    // Calculate potential upgrades (as a percentage of current value)
    const upgradePotential = buildings.length > 0 ? 
      Math.floor((buildings.filter(b => b.status !== 'excellent').length / buildings.length) * 100) : 0;

    return {
      totalValue,
      yearlyIncome,
      yearlyMaintenance,
      netYearlyProfit,
      propertyCount: buildings.length,
      buildingCount: buildings.length,
      upgradePotential
    };
  }, [buildings]);

  // Add a new building
  const addBuilding = useCallback((newBuilding: Omit<Building, 'id'>): string => {
    const buildingWithId = {
      ...newBuilding,
      id: uuidv4()
    };
    
    setBuildings(prev => [...prev, buildingWithId as Building]);
    toast.success(`Propriété "${newBuilding.name}" acquise avec succès`);
    return buildingWithId.id;
  }, []);

  // Sell a building
  const sellBuilding = useCallback((buildingId: string): number => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) {
      toast.error("Propriété non trouvée");
      return 0;
    }

    // Calculate sell value (80-90% of actual value depending on status)
    const statusMultiplier = {
      'excellent': 0.9,
      'good': 0.85,
      'fair': 0.8,
      'poor': 0.7,
      'dilapidated': 0.6,
    };
    
    const sellPrice = Math.floor(building.value * (statusMultiplier[building.status] || 0.8));

    setBuildings(prev => prev.filter(b => b.id !== buildingId));
    
    if (selectedBuilding?.id === buildingId) {
      setSelectedBuilding(null);
    }
    
    toast.success(`Propriété "${building.name}" vendue pour ${sellPrice.toLocaleString()} as`);
    return sellPrice;
  }, [buildings, selectedBuilding]);

  // Perform maintenance on a building
  const maintainBuilding = useCallback((buildingId: string, amount: number): boolean => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) {
      toast.error("Propriété non trouvée");
      return false;
    }

    // Determine new status based on current status and maintenance amount
    const calculateNewStatus = (currentStatus: string, maintenance: number, value: number): Building['status'] => {
      const maintenanceRatio = maintenance / value;
      
      // Extensive maintenance (>10% of value)
      if (maintenanceRatio >= 0.1) {
        return 'excellent';
      }
      
      // Good maintenance (5-10% of value)
      if (maintenanceRatio >= 0.05) {
        if (currentStatus === 'dilapidated') return 'poor';
        if (currentStatus === 'poor') return 'fair';
        if (currentStatus === 'fair') return 'good';
        return 'excellent';
      }
      
      // Minimal maintenance (2-5% of value)
      if (maintenanceRatio >= 0.02) {
        if (currentStatus === 'dilapidated') return 'dilapidated';
        if (currentStatus === 'poor') return 'poor';
        if (currentStatus === 'fair') return 'fair';
        if (currentStatus === 'good') return 'good';
        return 'good';
      }
      
      // Inadequate maintenance
      return currentStatus as Building['status'];
    };

    const newStatus = calculateNewStatus(building.status, amount, building.value);
    
    setBuildings(prev => 
      prev.map(b => 
        b.id === buildingId 
          ? { ...b, status: newStatus } 
          : b
      )
    );
    
    if (selectedBuilding?.id === buildingId) {
      setSelectedBuilding(prev => prev ? { ...prev, status: newStatus } : null);
    }
    
    toast.success(`Maintenance effectuée sur "${building.name}"`);
    return true;
  }, [buildings, selectedBuilding]);

  // Install an upgrade
  const installUpgrade = useCallback((buildingId: string, upgradeId: string): boolean => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building || !building.upgrades) {
      toast.error("Propriété ou amélioration non trouvée");
      return false;
    }

    const upgrade = building.upgrades.find(u => u.id === upgradeId);
    if (!upgrade) {
      toast.error("Amélioration non trouvée");
      return false;
    }

    if (upgrade.installed) {
      toast.info("Cette amélioration est déjà installée");
      return false;
    }

    // Apply the upgrade effects
    const newValue = building.value + (upgrade.valueBonus || 0);
    const newIncome = building.income + (upgrade.incomeBonus || 0);

    // Mark upgrade as installed and update building stats
    setBuildings(prev => 
      prev.map(b => {
        if (b.id === buildingId) {
          return {
            ...b,
            value: newValue,
            income: newIncome,
            upgrades: b.upgrades?.map(u => 
              u.id === upgradeId ? { ...u, installed: true } : u
            )
          };
        }
        return b;
      })
    );
    
    if (selectedBuilding?.id === buildingId) {
      setSelectedBuilding(prev => {
        if (!prev) return null;
        
        return {
          ...prev,
          value: newValue,
          income: newIncome,
          upgrades: prev.upgrades?.map(u => 
            u.id === upgradeId ? { ...u, installed: true } : u
          )
        };
      });
    }
    
    toast.success(`Amélioration "${upgrade.name}" installée avec succès`);
    return true;
  }, [buildings, selectedBuilding]);

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
