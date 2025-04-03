
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { ProgressBar } from '@/components/ui/progress-bar';

interface EquilibreModuleProps {
  simplified?: boolean;
}

const EquilibreModule: React.FC<EquilibreModuleProps> = ({ simplified = false }) => {
  const { equilibre } = useMaitreJeu();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>État de l'Équilibre</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!simplified && (
            <p className="text-muted-foreground">
              Module d'affichage des données d'équilibre de la République.
            </p>
          )}
          
          {equilibre && (
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Équilibre politique</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm">Populares: {equilibre.politique?.populares || 0}</p>
                    <ProgressBar value={equilibre.politique?.populares || 0} max={100} />
                  </div>
                  <div>
                    <p className="text-sm">Optimates: {equilibre.politique?.optimates || 0}</p>
                    <ProgressBar value={equilibre.politique?.optimates || 0} max={100} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Stabilité militaire</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm">Moral: {equilibre.militaire?.moral || 0}</p>
                    <ProgressBar value={equilibre.militaire?.moral || 0} max={100} />
                  </div>
                  <div>
                    <p className="text-sm">Discipline: {equilibre.militaire?.discipline || 0}</p>
                    <ProgressBar value={equilibre.militaire?.discipline || 0} max={100} />
                  </div>
                </div>
              </div>
              
              {!simplified && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Stabilité économique</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm">Commerce: {equilibre.economie?.commerce || 0}</p>
                      <ProgressBar value={equilibre.economie?.commerce || 0} max={100} />
                    </div>
                    <div>
                      <p className="text-sm">Agriculture: {equilibre.economie?.agriculture || 0}</p>
                      <ProgressBar value={equilibre.economie?.agriculture || 0} max={100} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EquilibreModule;
