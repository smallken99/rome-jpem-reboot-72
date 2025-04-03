
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { ProgressBar } from '@/components/ui/progress-bar';

interface EquilibreModuleProps {
  simplified?: boolean;
}

const EquilibreModule: React.FC<EquilibreModuleProps> = ({ simplified = false }) => {
  const { equilibre } = useMaitreJeu();
  
  const politicalBalance = equilibre?.politique || { populares: 0, optimates: 0, moderates: 0 };
  const economicStatus = equilibre?.economie || { stabilite: 0, croissance: 0 };
  const militaryStatus = equilibre?.militaire || { morale: 0, effectifs: 0, discipline: 0 };
  
  // Calculate overall stability as average of key indicators
  const overallStability = Math.round(
    (politicalBalance.optimates + economicStatus.stabilite + militaryStatus.morale) / 3
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre de la République</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Stabilité Globale</span>
            <span className="text-sm font-medium">{overallStability}%</span>
          </div>
          <ProgressBar 
            value={overallStability} 
            max={100} 
            indicatorClassName={
              overallStability > 70 ? "bg-green-500" : 
              overallStability > 40 ? "bg-amber-500" : 
              "bg-red-500"
            }
          />
        </div>
        
        {!simplified && (
          <>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Équilibre Politique</span>
                <span className="text-sm font-medium">{politicalBalance.optimates}%</span>
              </div>
              <ProgressBar 
                value={politicalBalance.optimates} 
                max={100} 
                indicatorClassName="bg-blue-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Stabilité Économique</span>
                <span className="text-sm font-medium">{economicStatus.stabilite}%</span>
              </div>
              <ProgressBar 
                value={economicStatus.stabilite} 
                max={100} 
                indicatorClassName="bg-yellow-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Morale Militaire</span>
                <span className="text-sm font-medium">{militaryStatus.morale}%</span>
              </div>
              <ProgressBar 
                value={militaryStatus.morale} 
                max={100} 
                indicatorClassName="bg-red-500"
              />
            </div>
          </>
        )}
        
        {simplified && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">Politique</div>
              <div className="text-lg font-bold">{politicalBalance.optimates}%</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">Économie</div>
              <div className="text-lg font-bold">{economicStatus.stabilite}%</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">Militaire</div>
              <div className="text-lg font-bold">{militaryStatus.morale}%</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EquilibreModule;
