
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';
import { Character } from '@/types/character';
import { calculateInheritance } from './inheritanceUtils';

interface InheritanceDetailsProps {
  character: Character;
  heirs: Character[];
}

export const InheritanceDetails: React.FC<InheritanceDetailsProps> = ({ 
  character, 
  heirs 
}) => {
  // Calcul de l'héritage total estimé
  const totalValue = 5000000; // Valeur fictive pour démo
  const calculatedShares = calculateInheritance(heirs);
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Détails de l'Héritage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Patrimoine Total Estimé</h3>
            <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Répartition Prévue</h3>
            <ul className="space-y-2">
              {heirs.length > 0 ? (
                heirs.map((heir, index) => (
                  <li key={heir.id} className="flex justify-between border-b pb-2">
                    <span>{heir.name} ({heir.relation})</span>
                    <span className="font-semibold">
                      {formatCurrency(totalValue * calculatedShares[index])}
                      <span className="text-sm text-gray-500 ml-2">
                        ({(calculatedShares[index] * 100).toFixed(1)}%)
                      </span>
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500 italic py-4">
                  Aucun héritier défini
                </li>
              )}
            </ul>
          </div>
          
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              Modifier les dispositions testamentaires
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
