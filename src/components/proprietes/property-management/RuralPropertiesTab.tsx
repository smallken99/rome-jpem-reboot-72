
import React, { useState } from 'react';
import { RuralPropertySelector } from './rural/RuralPropertySelector';
import { RuralPropertyDetails } from './rural/RuralPropertyDetails';
import { useRuralPropertyCalculator } from './hooks/useRuralPropertyCalculator';

export const RuralPropertiesTab: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>('domaine_cereales');
  const [propertySize, setPropertySize] = useState<string>('moyen');
  const [propertyLocation, setPropertyLocation] = useState<string>('latium');
  
  const propertyDetails = useRuralPropertyCalculator(
    selectedProperty,
    propertySize,
    propertyLocation
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="col-span-1">
        <RuralPropertySelector
          selectedProperty={selectedProperty}
          setSelectedProperty={setSelectedProperty}
          propertySize={propertySize}
          setPropertySize={setPropertySize}
          propertyLocation={propertyLocation}
          setPropertyLocation={setPropertyLocation}
        />
      </div>
      
      <div className="col-span-2 border-l border-rome-gold/20 pl-6">
        <RuralPropertyDetails propertyDetails={propertyDetails} />
      </div>
    </div>
  );
};
