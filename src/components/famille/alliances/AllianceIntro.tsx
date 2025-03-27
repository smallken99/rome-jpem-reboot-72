
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HandshakeIcon } from 'lucide-react';

export const AllianceIntro: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-teal-50 p-3 rounded-full">
            <HandshakeIcon className="h-6 w-6 text-teal-500" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Alliances Matrimoniales</h3>
            <p className="text-muted-foreground">
              Les alliances matrimoniales sont essentielles pour étendre l'influence de votre famille 
              dans la République. Mariez vos fils et filles à des membres d'autres familles influentes 
              pour forger des liens durables et mutuellement bénéfiques.
            </p>
            
            <p className="text-muted-foreground mt-2">
              Ces alliances vous donneront accès à de nouvelles opportunités politiques, 
              commerciales et militaires. N'oubliez pas qu'une bonne alliance peut faire la 
              différence entre le succès et l'échec de votre lignée.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
