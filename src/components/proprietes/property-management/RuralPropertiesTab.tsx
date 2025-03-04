
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Coins, Wrench } from 'lucide-react';

export const RuralPropertiesTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="col-span-1 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ruralType">Type de propriété</Label>
          <select id="ruralType" className="w-full rounded-md border border-rome-gold/30 p-2">
            <optgroup label="Domaines (production agricole)">
              <option value="domaine_cereales">Culture céréalière</option>
              <option value="domaine_vignoble">Vignoble</option>
              <option value="domaine_oliviers">Oliveraies</option>
            </optgroup>
            <optgroup label="Pâturages (production animale)">
              <option value="paturage_equides">Élevage d'équidés</option>
              <option value="paturage_bovins">Élevage de bovins</option>
              <option value="paturage_moutons">Élevage de moutons</option>
            </optgroup>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ruralSize">Taille</Label>
          <select id="ruralSize" className="w-full rounded-md border border-rome-gold/30 p-2">
            <option value="petit">Petit</option>
            <option value="moyen">Moyen</option>
            <option value="grand">Grand</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ruralLocation">Région</Label>
          <select id="ruralLocation" className="w-full rounded-md border border-rome-gold/30 p-2">
            <option value="latium">Latium</option>
            <option value="campanie">Campanie</option>
            <option value="etrurie">Étrurie</option>
            <option value="apulie">Apulie</option>
            <option value="sicile">Sicile</option>
          </select>
        </div>
      </div>
      
      <div className="col-span-2 border-l border-rome-gold/20 pl-6">
        <div className="mb-4">
          <h4 className="font-cinzel text-base text-rome-navy mb-2">Détails d'acquisition</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prix d'achat</Label>
              <div className="text-lg font-bold text-rome-navy flex items-center">
                <Coins className="h-4 w-4 mr-2 text-rome-gold" />
                75,000 As
              </div>
            </div>
            <div className="space-y-2">
              <Label>Coûts d'exploitation</Label>
              <div className="text-lg font-bold text-rome-navy flex items-center">
                <Wrench className="h-4 w-4 mr-2 text-rome-gold" />
                5,000 As/an
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-cinzel text-base text-rome-navy mb-2">Production</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>200 modii de blé par an</li>
            <li>Valeur estimée: 8,000 As</li>
            <li>Capacité de stockage nécessaire: 200 modii</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <Button className="roman-btn w-full sm:w-auto">Acquérir le domaine</Button>
        </div>
      </div>
    </div>
  );
};
