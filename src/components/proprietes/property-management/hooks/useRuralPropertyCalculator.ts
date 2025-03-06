
import { useState, useEffect } from 'react';
import { ruralProperties, BuildingDescription } from '../../data/buildingDescriptions';

export const useRuralPropertyCalculator = (
  selectedProperty: string,
  propertySize: string,
  propertyLocation: string
) => {
  const [propertyDetails, setPropertyDetails] = useState<BuildingDescription | null>(null);
  
  useEffect(() => {
    const property = ruralProperties[selectedProperty];
    
    if (property) {
      let costMultiplier = propertySize === 'petit' ? 0.7 : propertySize === 'grand' ? 1.5 : 1;
      let locationMultiplier = {
        'latium': 1.2,
        'campanie': 1.1,
        'etrurie': 0.9,
        'apulie': 0.8,
        'sicile': 0.7
      }[propertyLocation] || 1;

      // Calcul des coûts ajustés
      const adjustedProperty = {
        ...property,
        initialCost: Math.round(property.initialCost * costMultiplier * locationMultiplier),
        maintenanceCost: Math.round(property.maintenanceCost * costMultiplier),
        income: property.income ? Math.round(property.income * costMultiplier * locationMultiplier) : 0,
        production: property.production ? {
          ...property.production,
          amount: Math.round(property.production.amount * costMultiplier)
        } : undefined
      };
      
      setPropertyDetails(adjustedProperty);
    } else {
      setPropertyDetails(null);
    }
  }, [selectedProperty, propertySize, propertyLocation]);

  return propertyDetails;
};
