import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Coins, Wrench, Crop, Award } from 'lucide-react';
import { ruralProperties, BuildingDescription } from '../data/buildingDescriptions';

export const RuralPropertiesTab: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>('domaine_cereales');
  const [propertySize, setPropertySize] = useState<string>('moyen');
  const [propertyLocation, setPropertyLocation] = useState<string>('latium');
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="col-span-1 space-y-4">
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
      
      <div className="col-span-2 border-l border-rome-gold/20 pl-6">
        {propertyDetails && (
          <>
            <div className="mb-4">
              <h3 className="font-cinzel text-lg text-rome-navy mb-2">{propertyDetails.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{propertyDetails.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prix d'achat</Label>
                  <div className="text-lg font-bold text-rome-navy flex items-center">
                    <Coins className="h-4 w-4 mr-2 text-rome-gold" />
                    {propertyDetails.initialCost.toLocaleString()} As
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Coûts d'exploitation</Label>
                  <div className="text-lg font-bold text-rome-navy flex items-center">
                    <Wrench className="h-4 w-4 mr-2 text-rome-gold" />
                    {propertyDetails.maintenanceCost.toLocaleString()} As/an
                  </div>
                </div>
                {propertyDetails.income > 0 && (
                  <div className="space-y-2">
                    <Label>Revenu annuel</Label>
                    <div className="text-lg font-bold text-rome-navy flex items-center text-green-600">
                      <Coins className="h-4 w-4 mr-2 text-green-600" />
                      {propertyDetails.income.toLocaleString()} As/an
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Prestige</Label>
                  <div className="text-lg font-bold text-rome-navy flex items-center">
                    <Award className="h-4 w-4 mr-2 text-rome-gold" />
                    +{propertyDetails.prestige} Points
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-cinzel text-base text-rome-navy mb-2">Production</h4>
              {propertyDetails.production && (
                <ul className="list-disc pl-5 space-y-1">
                  <li>Type: {propertyDetails.production.type}</li>
                  <li>Quantité: {propertyDetails.production.amount} {propertyDetails.production.unit}</li>
                </ul>
              )}
            </div>
            
            <div className="mb-4">
              <h4 className="font-cinzel text-base text-rome-navy mb-2">Avantages</h4>
              <ul className="list-disc pl-5 space-y-1">
                {propertyDetails.advantages.map((advantage, index) => (
                  <li key={index}>{advantage}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6">
              <Button className="roman-btn w-full sm:w-auto">
                Acquérir le domaine
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
