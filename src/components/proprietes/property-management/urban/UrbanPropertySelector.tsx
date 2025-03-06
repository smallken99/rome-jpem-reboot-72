
import React from 'react';
import { Label } from '@/components/ui/label';
import { 
  urbanResidentialBuildings, 
  religiousBuildings, 
  publicBuildings
} from '../../data/buildingDescriptions';

interface UrbanPropertySelectorProps {
  propertyCategory: string;
  setPropertyCategory: (value: string) => void;
  selectedProperty: string;
  setSelectedProperty: (value: string) => void;
  propertySize: string;
  setPropertySize: (value: string) => void;
  propertyLocation: string;
  setPropertyLocation: (value: string) => void;
}

export const UrbanPropertySelector: React.FC<UrbanPropertySelectorProps> = ({
  propertyCategory,
  setPropertyCategory,
  selectedProperty,
  setSelectedProperty,
  propertySize,
  setPropertySize,
  propertyLocation,
  setPropertyLocation,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setPropertyCategory(category);
    
    // Réinitialiser la propriété sélectionnée en fonction de la nouvelle catégorie
    switch (category) {
      case 'residential':
        setSelectedProperty('insula');
        break;
      case 'religious':
        setSelectedProperty('autel');
        break;
      case 'public':
        setSelectedProperty('statue');
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="propertyCategory">Catégorie</Label>
        <select 
          id="propertyCategory" 
          className="w-full rounded-md border border-rome-gold/30 p-2"
          value={propertyCategory}
          onChange={handleCategoryChange}
        >
          <option value="residential">Bâtiments d'habitation</option>
          <option value="religious">Bâtiments religieux</option>
          <option value="public">Bâtiments publics</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="propertyType">Type de propriété</Label>
        <select 
          id="propertyType" 
          className="w-full rounded-md border border-rome-gold/30 p-2"
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
        >
          {propertyCategory === 'residential' && (
            Object.keys(urbanResidentialBuildings).map((key) => (
              <option key={key} value={key}>{urbanResidentialBuildings[key].name}</option>
            ))
          )}
          {propertyCategory === 'religious' && (
            Object.keys(religiousBuildings).map((key) => (
              <option key={key} value={key}>{religiousBuildings[key].name}</option>
            ))
          )}
          {propertyCategory === 'public' && (
            Object.keys(publicBuildings).map((key) => (
              <option key={key} value={key}>{publicBuildings[key].name}</option>
            ))
          )}
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="propertySize">Taille</Label>
        <select 
          id="propertySize" 
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
        <Label htmlFor="propertyLocation">Emplacement</Label>
        <select 
          id="propertyLocation" 
          className="w-full rounded-md border border-rome-gold/30 p-2"
          value={propertyLocation}
          onChange={(e) => setPropertyLocation(e.target.value)}
        >
          <option value="rome_forum">Rome - Forum</option>
          <option value="rome_palatin">Rome - Palatin</option>
          <option value="rome_subure">Rome - Subure</option>
          <option value="ostie">Ostie</option>
          <option value="campanie">Campanie</option>
        </select>
      </div>
    </div>
  );
};
