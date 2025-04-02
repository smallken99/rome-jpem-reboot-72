
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';

const EquilibreModule: React.FC = () => {
  const { equilibre } = useMaitreJeu();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>État de l'Équilibre</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Module d'affichage des données d'équilibre de la République.
          </p>
          {equilibre && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Politique</h3>
                <p>Populares: {equilibre.politique?.populares || 0}</p>
                <p>Optimates: {equilibre.politique?.optimates || 0}</p>
              </div>
              <div>
                <h3 className="font-semibold">Militaire</h3>
                <p>Morale: {equilibre.militaire?.morale || 0}</p>
                <p>Discipline: {equilibre.militaire?.discipline || 0}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EquilibreModule;
