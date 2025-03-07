
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Coins, Wrench, Award, Users, Heart, ScrollText } from 'lucide-react';
import { BuildingDescription } from '../../data/types/buildingTypes';
import { Card, CardContent } from '@/components/ui/card';

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
        </div>
        
        {/* Bonus section */}
        <div className="mt-4 mb-6">
          <h4 className="font-cinzel text-base text-rome-navy mb-3">Bonus obtenus</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {buildingDetails.prestige > 0 && (
              <Card className="bg-rome-marble/10 border-rome-gold/30">
                <CardContent className="p-3 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-rome-gold" />
                  <div>
                    <div className="text-xs text-muted-foreground">Prestige</div>
                    <div className="font-bold">+{buildingDetails.prestige} points</div>
                  </div>
                </CardContent>
              </Card>
            )}
            {buildingDetails.popularite > 0 && (
              <Card className="bg-rome-marble/10 border-rome-gold/30">
                <CardContent className="p-3 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-rome-terracotta" />
                  <div>
                    <div className="text-xs text-muted-foreground">Popularité</div>
                    <div className="font-bold">+{buildingDetails.popularite} points</div>
                  </div>
                </CardContent>
              </Card>
            )}
            {buildingDetails.piete > 0 && (
              <Card className="bg-rome-marble/10 border-rome-gold/30">
                <CardContent className="p-3 flex items-center">
                  <ScrollText className="h-5 w-5 mr-2 text-rome-navy" />
                  <div>
                    <div className="text-xs text-muted-foreground">Piété</div>
                    <div className="font-bold">+{buildingDetails.piete} points</div>
                  </div>
                </CardContent>
              </Card>
            )}
            {buildingDetails.reputation > 0 && (
              <Card className="bg-rome-marble/10 border-rome-gold/30">
                <CardContent className="p-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-rome-blue" />
                  <div>
                    <div className="text-xs text-muted-foreground">Réputation</div>
                    <div className="font-bold">+{buildingDetails.reputation} points</div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {/* Slave management section */}
      {buildingDetails.slaves && (
        <div className="mb-4">
          <h4 className="font-cinzel text-base text-rome-navy mb-2">Besoins en esclaves</h4>
          <div className="rounded-md border border-rome-gold/30 p-3 bg-rome-parchment/50">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Minimum requis</div>
                <div className="font-bold">{buildingDetails.slaves.required} esclaves</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Optimal</div>
                <div className="font-bold">{buildingDetails.slaves.optimal} esclaves</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Profit maximum</div>
                <div className="font-bold">{buildingDetails.slaves.maxProfit.toLocaleString()} As</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
