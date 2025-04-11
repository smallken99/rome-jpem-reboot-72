
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const familyTraits = [
  { name: 'Noblesse', description: 'Cette famille maintient une lignée noble remontant à plusieurs générations.' },
  { name: 'Éloquence', description: 'Les membres de cette famille sont particulièrement doués dans l\'art oratoire.' },
  { name: 'Martial', description: 'Une tradition militaire forte parcourt l\'histoire de cette famille.' },
  { name: 'Commerce', description: 'Cette famille a des connexions fortes dans les réseaux commerciaux.' },
];

export const FamilyTraits: React.FC = () => {
  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Traits familiaux</h3>
        <p className="text-muted-foreground text-sm">
          Caractéristiques héréditaires qui définissent votre lignée
        </p>
      </div>
      
      <div className="space-y-4">
        {familyTraits.map((trait, index) => (
          <div 
            key={index}
            className="p-4 border rounded-lg"
          >
            <h4 className="font-medium">{trait.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {trait.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Les traits peuvent être gagnés ou perdus selon les actions de la famille à travers les générations.
        </p>
      </div>
    </div>
  );
};
