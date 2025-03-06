
import { useState, useEffect } from 'react';
import { 
  urbanResidentialBuildings, 
  religiousBuildings, 
  publicBuildings,
  BuildingDescription
} from '../../data/buildingDescriptions';

export const useUrbanPropertyCalculator = (
  propertyCategory: string,
  selectedProperty: string,
  propertySize: string,
  propertyLocation: string
) => {
  const [buildingDetails, setBuildingDetails] = useState<BuildingDescription | null>(null);
  
  useEffect(() => {
    let building: BuildingDescription | undefined;
    
    switch (propertyCategory) {
      case 'residential':
        building = urbanResidentialBuildings[selectedProperty];
        break;
      case 'religious':
        building = religiousBuildings[selectedProperty];
        break;
      case 'public':
        building = publicBuildings[selectedProperty];
        break;
    }
    
    if (building) {
      // Ajuster les coûts en fonction de la taille
      let costMultiplier = 1;
      switch (propertySize) {
        case 'petit':
          costMultiplier = 0.7;
          break;
        case 'moyen':
          costMultiplier = 1;
          break;
        case 'grand':
          costMultiplier = 1.5;
          break;
      }
      
      // Ajuster les coûts en fonction de l'emplacement
      let locationMultiplier = 1;
      switch (propertyLocation) {
        case 'rome_forum':
          locationMultiplier = 2;
          break;
        case 'rome_palatin':
          locationMultiplier = 1.8;
          break;
        case 'rome_subure':
          locationMultiplier = 1;
          break;
        case 'ostie':
          locationMultiplier = 0.8;
          break;
        case 'campanie':
          locationMultiplier = 0.7;
          break;
      }
      
      setBuildingDetails({
        ...building,
        initialCost: Math.round(building.initialCost * costMultiplier * locationMultiplier),
        maintenanceCost: Math.round(building.maintenanceCost * costMultiplier),
        income: building.income ? Math.round(building.income * costMultiplier * locationMultiplier) : 0
      });
    } else {
      setBuildingDetails(null);
    }
  }, [propertyCategory, selectedProperty, propertySize, propertyLocation]);

  return buildingDetails;
};
