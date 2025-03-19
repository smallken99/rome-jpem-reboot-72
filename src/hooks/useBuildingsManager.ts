
import { useState, useCallback } from 'react';
import { OwnedBuilding } from '@/types/buildings';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Hook pour la gestion des bâtiments
export const useBuildingsManager = () => {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>([]);

  // Ajouter un nouveau bâtiment
  const addBuilding = useCallback((buildingData: Partial<OwnedBuilding>) => {
    const newBuilding: OwnedBuilding = {
      id: uuidv4(),
      buildingId: buildingData.buildingId || uuidv4(),
      buildingType: buildingData.buildingType || 'unknown',
      name: buildingData.name || 'Nouveau bâtiment',
      location: buildingData.location || 'Rome',
      type: buildingData.type || 'other',
      maintenanceEnabled: buildingData.maintenanceEnabled !== false,
      maintenanceCost: buildingData.maintenanceCost || 0,
      slaves: buildingData.slaves || 0,
      condition: buildingData.condition || 100,
      purchaseDate: buildingData.purchaseDate || new Date(),
      maintenanceLevel: buildingData.maintenanceLevel || 2,
      securityLevel: buildingData.securityLevel || 1,
      income: buildingData.income || 0
    };
    
    setBuildings(prev => [...prev, newBuilding]);
    return newBuilding.id;
  }, []);

  // Supprimer un bâtiment
  const removeBuilding = useCallback((id: string) => {
    setBuildings(prev => prev.filter(building => building.id !== id));
  }, []);

  // Rechercher un bâtiment par ID
  const findBuilding = useCallback((id: string) => {
    return buildings.find(building => building.id === id);
  }, [buildings]);

  // Mettre à jour un bâtiment
  const updateBuilding = useCallback((id: string, updates: Partial<OwnedBuilding>) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id ? { ...building, ...updates } : building
      )
    );
  }, []);

  // Rénover un bâtiment
  const renovateBuilding = useCallback((id: string) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id 
          ? { ...building, condition: Math.min(100, building.condition + 25) } 
          : building
      )
    );
    
    toast.success("Bâtiment rénové avec succès");
  }, []);

  // Calculer les statistiques des bâtiments
  const calculateBuildingStats = useCallback(() => {
    const stats = {
      totalValue: 0,
      totalIncome: 0,
      totalMaintenance: 0,
      propertyCount: buildings.length,
      averageCondition: 0
    };
    
    if (buildings.length === 0) return stats;
    
    buildings.forEach(building => {
      stats.totalValue += calculateBuildingValue(building);
      stats.totalIncome += building.income || 0;
      stats.totalMaintenance += building.maintenanceCost;
      stats.averageCondition += building.condition;
    });
    
    stats.averageCondition /= buildings.length;
    
    return stats;
  }, [buildings]);
  
  // Calculer la valeur d'un bâtiment
  const calculateBuildingValue = (building: OwnedBuilding): number => {
    // Valeur de base (par défaut 50,000 As si inconnue)
    const baseValue = 50000;
    
    // Facteur de condition (0.5 à 1.0)
    const conditionFactor = 0.5 + (building.condition / 200); 
    
    // Facteur de localisation (0.8 à 1.2)
    const locationFactor = building.location.includes('Rome') ? 1.2 : 
                           building.location.includes('Italia') ? 1.0 : 0.8;
    
    // Facteur de type de bâtiment
    const typeFactor = building.buildingType === 'temple' ? 1.5 :
                       building.buildingType === 'villa' ? 1.3 :
                       building.buildingType === 'domus' ? 1.2 :
                       building.buildingType === 'insula' ? 1.0 : 1.1;
    
    return Math.round(baseValue * conditionFactor * locationFactor * typeFactor);
  };

  return {
    buildings,
    addBuilding,
    removeBuilding,
    findBuilding,
    updateBuilding,
    renovateBuilding,
    calculateBuildingStats,
    calculateBuildingValue
  };
};
