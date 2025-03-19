
import { Building, BuildingDescription, OwnedBuilding } from '../../types/buildingTypes';

export const adaptBuildingForCard = (building: OwnedBuilding) => {
  if (!building) return null;
  
  const description = building.description || {} as BuildingDescription;
  
  // Garantir que toutes les propriétés existent
  return {
    id: building.id,
    name: building.name,
    type: building.type,
    status: building.status || 'normal',
    location: building.location || 'Roma',
    value: building.value || 0,
    size: building.size || 0,
    slaves: building.slaves || [],
    description: description,
    
    // Définit des valeurs par défaut pour les propriétés qui pourraient ne pas exister
    income: description.income || 0,
    piete: description.piete || 0,
    popularite: description.popularite || 0,
    reputation: description.reputation || 0,
    production: description.production || null,
    workforce: {
      required: building.workforce?.required || 0,
      optimal: building.workforce?.optimal || 0,
      maxProfit: building.workforce?.maxProfit || 0
    },
    condition: building.condition || 100,
    subType: description.subType || null,
    requirements: description.requirements || [],
    maintenance: building.maintenance || {
      baseCost: 100,
      current: 50,
      lastUpdate: new Date().toISOString()
    },
    security: building.security || 50,
    
    // Renvoie l'objet building complet pour accès à d'autres propriétés si nécessaire
    original: building
  };
};

// Utiliser cette fonction pour obtenir un bâtiment adapté pour l'affichage
export const getBuildingForDisplay = (building: OwnedBuilding) => {
  return adaptBuildingForCard(building);
};

// Utiliser cette fonction pour calculer le revenu d'un bâtiment
export const calculateBuildingIncome = (building: OwnedBuilding): number => {
  const adapted = adaptBuildingForCard(building);
  if (!adapted) return 0;
  
  const baseIncome = adapted.income || 0;
  
  // Ajustement en fonction de l'état de maintenance
  const maintenanceMultiplier = adapted.maintenance.current / 50;
  
  // Ajustement en fonction du personnel
  let workforceMultiplier = 1;
  if (adapted.workforce && adapted.workforce.required > 0) {
    const currentWorkforce = adapted.slaves?.length || 0;
    const optimalWorkforce = adapted.workforce.optimal;
    
    if (currentWorkforce < adapted.workforce.required) {
      // Si le personnel est insuffisant, le revenu est réduit
      workforceMultiplier = 0.5;
    } else if (currentWorkforce >= optimalWorkforce) {
      // Si le personnel est optimal ou plus, le revenu est maximal
      workforceMultiplier = 1.2;
    } else {
      // Si le personnel est entre le minimum et l'optimal
      const ratio = (currentWorkforce - adapted.workforce.required) / 
                   (optimalWorkforce - adapted.workforce.required);
      workforceMultiplier = 0.6 + (ratio * 0.6);
    }
  }
  
  return Math.round(baseIncome * maintenanceMultiplier * workforceMultiplier);
};
