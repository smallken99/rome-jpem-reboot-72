import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export interface PublicBuilding {
  id: string;
  name: string;
  type: 'temple' | 'forum' | 'basilica' | 'thermes' | 'theatre' | 'amphitheatre' | 'aqueduc' | 'route';
  level: 'village' | 'city' | 'metropolis';
  condition: number; // 0 to 100
  maintenanceCost: number;
  effects: Record<string, number>;
}

export const useBatimentsPublics = () => {
  const [publicBuildings, setPublicBuildings] = useState<PublicBuilding[]>([
    {
      id: 'temple-jupiter',
      name: 'Temple de Jupiter',
      type: 'temple',
      level: 'city',
      condition: 95,
      maintenanceCost: 5000,
      effects: {
        'bonheur': 15,
        'prestige': 10
      }
    },
    {
      id: 'forum-romain',
      name: 'Forum Romain',
      type: 'forum',
      level: 'metropolis',
      condition: 80,
      maintenanceCost: 8000,
      effects: {
        'commerce': 20,
        'ordrePublic': 10
      }
    }
  ]);

  useEffect(() => {
    // Simulate degradation over time
    const degradationInterval = setInterval(() => {
      degradeBuildings();
    }, 365 * 24 * 60 * 60 * 1000); // Every year

    return () => clearInterval(degradationInterval);
  }, []);

  const maintainBuilding = (buildingId: string, level: 'minimal' | 'normal' | 'excellent') => {
    setPublicBuildings(prev => prev.map(building => {
      if (building.id === buildingId) {
        let conditionIncrease = 0;
        switch (level) {
          case 'minimal':
            conditionIncrease = 1;
            break;
          case 'normal':
            conditionIncrease = 5;
            break;
          case 'excellent':
            conditionIncrease = 10;
            break;
        }
        return { ...building, condition: Math.min(100, building.condition + conditionIncrease) };
      }
      return building;
    }));
  };

  const degradeBuildings = (yearsPassed: number = 1) => {
    setPublicBuildings(prev => prev.map(building => {
      const degradationAmount = yearsPassed * 0.5;
      return { ...building, condition: Math.max(0, building.condition - degradationAmount) };
    }));
  };

  const addPublicBuilding = (building: PublicBuilding) => {
    setPublicBuildings(prev => [...prev, building]);
  };

  const updateBuildingCondition = (buildingId: string, newCondition: number) => {
    setPublicBuildings(prev => prev.map(building => 
      building.id === buildingId 
        ? { ...building, condition: Math.max(0, Math.min(100, newCondition)) }
        : building
    ));
  };

  return {
    publicBuildings,
    setPublicBuildings,
    maintainBuilding,
    degradeBuildings,
    addPublicBuilding,
    updateBuildingCondition
  };
};
