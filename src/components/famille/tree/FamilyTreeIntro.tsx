
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

export const FamilyTreeIntro: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-50 p-3 rounded-full">
            <Info className="h-6 w-6 text-blue-500" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Votre Arbre Généalogique</h3>
            <p className="text-muted-foreground">
              Visualisez votre famille et sa structure hiérarchique. Le chef de famille (Pater Familias) 
              est affiché en haut, suivi de son épouse, puis de leurs enfants. Cet arbre est essentiel 
              pour comprendre votre lignée et planifier l'avenir de votre Gens.
            </p>
            
            <p className="text-muted-foreground mt-2">
              La couleur de chaque membre indique son statut: le chef de famille est en ambre, 
              les membres masculins en bleu, les membres féminins en rose, et les membres décédés en gris.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
