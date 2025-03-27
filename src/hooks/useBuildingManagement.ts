
import { useState } from 'react';
import { Building, PropertyStats } from '@/types/proprietes';
import { useCallback } from 'react';

export const useBuildingManagement = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  // Calculate some stats based on buildings
  const calculateStats = (): PropertyStats => {
    return buildings.reduce(
      (acc, building) => {
        acc.totalIncome += building.income || 0;
        acc.totalMaintenance += building.maintenance || 0;
        acc.totalValue += building.value || 0;
        return acc;
      },
      {
        totalIncome: 0,
        totalMaintenance: 0,
        totalValue: 0,
        yearlyMaintenance: 0,
        totalProperties: buildings.length,
      }
    );
  };

  const addBuilding = useCallback((newBuilding: Omit<Building, 'id'>) => {
    const id = `building-${Date.now()}`;
    const building = { ...newBuilding, id };
    setBuildings(prev => [...prev, building]);
    return id;
  }, []);

  const sellBuilding = useCallback((buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return 0;

    setBuildings(prev => prev.filter(b => b.id !== buildingId));
    return building.value * 0.7; // 70% of value when selling
  }, [buildings]);

  const maintainBuilding = useCallback((buildingId: string, amount: number) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return false;

    setBuildings(prev =>
      prev.map(b => {
        if (b.id === buildingId) {
          return {
            ...b,
            condition: Math.min(100, b.condition + amount * 0.5),
            maintenance: b.maintenance + amount * 0.1,
          };
        }
        return b;
      })
    );
    return true;
  }, [buildings]);

  const installUpgrade = useCallback((buildingId: string, upgradeId: string) => {
    // Find the building and apply the upgrade
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return false;

    // In a real implementation, you would apply the effects of the upgrade
    setBuildings(prev =>
      prev.map(b => {
        if (b.id === buildingId) {
          return {
            ...b,
            upgrades: [...(b.upgrades || []), { id: upgradeId, installed: true }],
            maintenance: b.maintenance * 1.05, // 5% increase in maintenance
            value: b.value * 1.1, // 10% increase in value
          };
        }
        return b;
      })
    );
    return true;
  }, [buildings]);

  const stats = calculateStats();

  return {
    buildings,
    selectedBuilding,
    setSelectedBuilding,
    stats,
    addBuilding,
    sellBuilding,
    maintainBuilding,
    installUpgrade,
    // Additional methods needed
    updateMaintenanceEnabled: () => {}, // Placeholder
    updateBuildingCondition: () => {}, // Placeholder  
    assignSlaves: () => {}, // Placeholder
  };
};
