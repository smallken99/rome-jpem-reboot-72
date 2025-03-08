
import { useState } from 'react';
import { toast } from 'sonner';
import { PublicBuilding } from '../types/buildingTypes';
import { mockPublicBuildings } from '../data/mockBuildingsData';

export const usePublicBuildings = () => {
  const [publicBuildings, setPublicBuildings] = useState<PublicBuilding[]>(mockPublicBuildings);

  // Effectuer la maintenance d'un bâtiment
  const maintainBuilding = (buildingId: string, level: 'minimal' | 'standard' | 'excellent') => {
    setPublicBuildings(prev => prev.map(building => {
      if (building.id !== buildingId) return building;
      
      // Calculer l'amélioration de la condition selon le niveau de maintenance
      let conditionImprovement = 0;
      let costMultiplier = 1;
      
      switch (level) {
        case 'minimal':
          conditionImprovement = 5;
          costMultiplier = 0.7;
          break;
        case 'standard':
          conditionImprovement = 15;
          costMultiplier = 1;
          break;
        case 'excellent':
          conditionImprovement = 30;
          costMultiplier = 1.5;
          break;
      }
      
      const newCondition = Math.min(100, building.condition + conditionImprovement);
      const maintenanceCost = Math.round(building.maintenanceCost * costMultiplier);
      
      toast.success(`Maintenance effectuée: ${building.name}`, {
        description: `Condition améliorée de ${conditionImprovement}%. Coût: ${maintenanceCost} As.`
      });
      
      return {
        ...building,
        condition: newCondition,
        maintenanceLevel: level,
        lastMaintenance: 705 // Remplacer par l'année actuelle du jeu
      };
    }));
  };
  
  // Dégrader l'état des bâtiments avec le temps
  const degradeBuildings = (yearsPassed: number = 1) => {
    setPublicBuildings(prev => prev.map(building => {
      // Calculer la dégradation en fonction du niveau de maintenance
      let degradationRate = 0;
      
      switch (building.maintenanceLevel) {
        case 'minimal':
          degradationRate = 8 * yearsPassed;
          break;
        case 'standard':
          degradationRate = 5 * yearsPassed;
          break;
        case 'excellent':
          degradationRate = 2 * yearsPassed;
          break;
      }
      
      // Si le bâtiment n'a pas été entretenu depuis longtemps, augmenter la dégradation
      const currentYear = 705; // À remplacer par l'année actuelle du jeu
      const yearsSinceLastMaintenance = building.lastMaintenance 
        ? currentYear - building.lastMaintenance 
        : 0;
      
      if (yearsSinceLastMaintenance > 3) {
        degradationRate += (yearsSinceLastMaintenance - 3) * 2;
      }
      
      const newCondition = Math.max(0, building.condition - degradationRate);
      
      // Si la condition tombe en dessous de 30%, le bâtiment est endommagé
      let status = building.constructionStatus;
      if (newCondition < 30 && status === 'completed') {
        status = 'damaged';
        toast.warning(`Le bâtiment ${building.name} est en mauvais état et nécessite des réparations urgentes.`);
      }
      
      return {
        ...building,
        condition: newCondition,
        constructionStatus: status
      };
    }));
  };

  // Ajouter un nouveau bâtiment public à la liste
  const addPublicBuilding = (building: PublicBuilding) => {
    setPublicBuildings(prev => [...prev, building]);
  };

  return {
    publicBuildings,
    setPublicBuildings,
    maintainBuilding,
    degradeBuildings,
    addPublicBuilding
  };
};
