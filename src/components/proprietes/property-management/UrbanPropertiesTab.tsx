
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Coins, Wrench } from 'lucide-react';

export const UrbanPropertiesTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="col-span-1 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="propertyType">Type de propriété</Label>
          <select id="propertyType" className="w-full rounded-md border border-rome-gold/30 p-2">
            <optgroup label="Bâtiments d'Habitation">
              <option value="insula">Insula</option>
              <option value="villa">Villa</option>
              <option value="domus">Domus</option>
            </optgroup>
            <optgroup label="Bâtiments Religieux">
              <option value="statuaire">Statuaire</option>
              <option value="autel">Autel</option>
              <option value="temple">Temple</option>
            </optgroup>
            <optgroup label="Bâtiments Publics">
              <option value="statue">Statue</option>
              <option value="maison_indigents">Maison des Indigents</option>
              <option value="thermes">Thermes</option>
            </optgroup>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="propertySize">Taille</Label>
          <select id="propertySize" className="w-full rounded-md border border-rome-gold/30 p-2">
            <option value="petit">Petit</option>
            <option value="moyen">Moyen</option>
            <option value="grand">Grand</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="propertyLocation">Emplacement</Label>
          <select id="propertyLocation" className="w-full rounded-md border border-rome-gold/30 p-2">
            <option value="rome_forum">Rome - Forum</option>
            <option value="rome_palatin">Rome - Palatin</option>
            <option value="rome_subure">Rome - Subure</option>
            <option value="ostie">Ostie</option>
            <option value="campanie">Campanie</option>
          </select>
        </div>
      </div>
      
      <div className="col-span-2 border-l border-rome-gold/20 pl-6">
        <div className="mb-4">
          <h4 className="font-cinzel text-base text-rome-navy mb-2">Détails de construction</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Coût initial</Label>
              <div className="text-lg font-bold text-rome-navy flex items-center">
                <Coins className="h-4 w-4 mr-2 text-rome-gold" />
                25,000 As
              </div>
            </div>
            <div className="space-y-2">
              <Label>Entretien annuel</Label>
              <div className="text-lg font-bold text-rome-navy flex items-center">
                <Wrench className="h-4 w-4 mr-2 text-rome-gold" />
                1,200 As/an
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-cinzel text-base text-rome-navy mb-2">Avantages</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>+5 Points de popularité</li>
            <li>Logement pour 8 clients</li>
            <li>Revenu mensuel de 400 As</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <Button className="roman-btn w-full sm:w-auto">Lancer la construction</Button>
        </div>
      </div>
    </div>
  );
};
