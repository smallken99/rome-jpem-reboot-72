
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export const SuccessionRules: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Règles de Succession</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] pr-4">
          <div className="space-y-4 text-sm">
            <p>
              <strong>Primogéniture masculine</strong> - Le fils aîné est l'héritier présomptif de la famille et des biens du pater familias.
            </p>
            
            <p>
              <strong>Patria Potestas</strong> - Le chef de famille a un pouvoir absolu sur tous les membres de sa famille et peut désigner librement son héritier.
            </p>
            
            <p>
              <strong>Héritage des filles</strong> - Les filles peuvent hériter d'une part du patrimoine familial, généralement sous forme de dot pour leur mariage.
            </p>
            
            <p>
              <strong>Succession collatérale</strong> - À défaut de fils, la succession peut passer aux frères du défunt, puis à leurs fils.
            </p>
            
            <p>
              <strong>Testaments</strong> - Un testament valide doit être rédigé devant témoins et peut modifier l'ordre de succession traditionnel.
            </p>
            
            <p>
              <strong>Adoption</strong> - Un homme sans fils peut adopter un héritier, qui aura les mêmes droits qu'un fils biologique.
            </p>
            
            <p>
              <strong>Tutelle</strong> - Les enfants mineurs sont placés sous la tutelle d'un parent désigné ou du plus proche parent mâle.
            </p>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
