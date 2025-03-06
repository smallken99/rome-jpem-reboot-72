
import React from 'react';
import { Label } from '@/components/ui/label';
import { ruralProperties } from '../../data/buildings';

interface RuralPropertySelectorProps {
  selectedProperty: string;
  setSelectedProperty: (value: string) => void;
  propertySize: string;
  setPropertySize: (value: string) => void;
  propertyLocation: string;
  setPropertyLocation: (value: string) => void;
}

export const RuralPropertySelector: React.FC<RuralPropertySelectorProps> = ({
  selectedProperty,
  setSelectedProperty,
  propertySize,
  setPropertySize,
  propertyLocation,
  setPropertyLocation,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ruralType">Type de propriété</Label>
        <select 
          id="ruralType" 
          className="w-full rounded-md border border-rome-gold/30 p-2"
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
        >
          <optgroup label="Domaines (production agricole)">
            {['domaine_cereales', 'domaine_vignoble', 'domaine_oliviers'].map((key) => (
              <option key={key} value={key}>{ruralProperties[key].name}</option>
            ))}
          </optgroup>
          <optgroup label="Pâturages (production animale)">
            {['paturage_equides', 'paturage_bovins', 'paturage_moutons'].map((key) => (
              <option key={key} value={key}>{ruralProperties[key].name}</option>
            ))}
          </optgroup>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ruralSize">Taille</Label>
        <select 
          id="ruralSize" 
          className="w-full rounded-md border border-rome-gold/30 p-2"
          value={propertySize}
          onChange={(e) => setPropertySize(e.target.value)}
        >
          <option value="petit">Petit</option>
          <option value="moyen">Moyen</option>
          <option value="grand">Grand</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ruralLocation">Région</Label>
        <select 
          id="ruralLocation" 
          className="w-full rounded-md border border-rome-gold/30 p-2"
          value={propertyLocation}
          onChange={(e) => setPropertyLocation(e.target.value)}
        >
          <option value="latium">Latium</option>
          <option value="campanie">Campanie</option>
          <option value="etrurie">Étrurie</option>
          <option value="apulie">Apulie</option>
          <option value="sicile">Sicile</option>
        </select>
      </div>
    </div>
  );
};
