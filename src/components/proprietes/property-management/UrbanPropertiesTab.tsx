
import React, { useState } from 'react';
import { UrbanPropertySelector } from './urban/UrbanPropertySelector';
import { UrbanPropertyDetails } from './urban/UrbanPropertyDetails';
import { useUrbanPropertyCalculator } from './hooks/useUrbanPropertyCalculator';

export const UrbanPropertiesTab: React.FC = () => {
  const [propertyCategory, setPropertyCategory] = useState<string>('residential');
  const [selectedProperty, setSelectedProperty] = useState<string>('insula');
  const [propertySize, setPropertySize] = useState<string>('moyen');
  const [propertyLocation, setPropertyLocation] = useState<string>('rome_subure');
  
  const buildingDetails = useUrbanPropertyCalculator(
    propertyCategory,
    selectedProperty,
    propertySize,
    propertyLocation
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="col-span-1">
        <UrbanPropertySelector
          propertyCategory={propertyCategory}
          setPropertyCategory={setPropertyCategory}
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
          propertySize={propertySize}
          setPropertySize={setPropertySize}
          propertyLocation={propertyLocation}
          setPropertyLocation={setPropertyLocation}
        />
      </div>
      
      <div className="col-span-2 border-l border-rome-gold/20 pl-6">
        <UrbanPropertyDetails buildingDetails={buildingDetails} />
      </div>
    </div>
  );
};
