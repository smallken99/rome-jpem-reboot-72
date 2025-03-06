
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Coins, Wrench, Award } from 'lucide-react';
import { BuildingDescription } from '../../data/types/buildingTypes';

interface UrbanPropertyDetailsProps {
  buildingDetails: BuildingDescription | null;
}

export const UrbanPropertyDetails: React.FC<UrbanPropertyDetailsProps> = ({ buildingDetails }) => {
  if (!buildingDetails) return null;

  return (
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
  );
};
