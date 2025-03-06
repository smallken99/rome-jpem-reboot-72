
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Coins, Wrench, Award } from 'lucide-react';
import { 
  urbanResidentialBuildings, 
  religiousBuildings, 
  publicBuildings,
  BuildingDescription
} from '../data/buildingDescriptions';

export const UrbanPropertiesTab: React.FC = () => {
  const [propertyCategory, setPropertyCategory] = useState<string>('residential');
  const [selectedProperty, setSelectedProperty] = useState<string>('insula');
  const [propertySize, setPropertySize] = useState<string>('moyen');
  const [propertyLocation, setPropertyLocation] = useState<string>('rome_subure');
  const [buildingDetails, setBuildingDetails] = useState<BuildingDescription | null>(null);
  
  // Effet pour mettre à jour les détails du bâtiment lorsque la sélection change
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="col-span-1 space-y-4">
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
      
      <div className="col-span-2 border-l border-rome-gold/20 pl-6">
        {buildingDetails && (
          <>
            <div className="mb-4">
              <h3 className="font-cinzel text-lg text-rome-navy mb-2">{buildingDetails.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{buildingDetails.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Coût initial</Label>
                  <div className="text-lg font-bold text-rome-navy flex items-center">
                    <Coins className="h-4 w-4 mr-2 text-rome-gold" />
                    {buildingDetails.initialCost.toLocaleString()} As
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Entretien annuel</Label>
                  <div className="text-lg font-bold text-rome-navy flex items-center">
                    <Wrench className="h-4 w-4 mr-2 text-rome-gold" />
                    {buildingDetails.maintenanceCost.toLocaleString()} As/an
                  </div>
                </div>
                {buildingDetails.income > 0 && (
                  <div className="space-y-2">
                    <Label>Revenu mensuel</Label>
                    <div className="text-lg font-bold text-rome-navy flex items-center text-green-600">
                      <Coins className="h-4 w-4 mr-2 text-green-600" />
                      {buildingDetails.income.toLocaleString()} As/mois
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Prestige</Label>
                  <div className="text-lg font-bold text-rome-navy flex items-center">
                    <Award className="h-4 w-4 mr-2 text-rome-gold" />
                    +{buildingDetails.prestige} Points
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-cinzel text-base text-rome-navy mb-2">Avantages</h4>
              <ul className="list-disc pl-5 space-y-1">
                {buildingDetails.advantages.map((advantage, index) => (
                  <li key={index}>{advantage}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <Button className="roman-btn w-full sm:w-auto">
                Lancer la construction
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
