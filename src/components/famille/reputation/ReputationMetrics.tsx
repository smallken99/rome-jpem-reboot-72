
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ReputationMetricsProps {
  reputation: number;
  influence: number;
  prestige: number;
}

export const ReputationMetrics: React.FC<ReputationMetricsProps> = ({
  reputation,
  influence,
  prestige
}) => {
  const getReputationLabel = (value: number) => {
    if (value < 20) return 'Médiocre';
    if (value < 40) return 'Modeste';
    if (value < 60) return 'Respectable';
    if (value < 80) return 'Prestigieuse';
    return 'Illustre';
  };
  
  const getReputationColor = (value: number) => {
    if (value < 20) return 'bg-red-500';
    if (value < 40) return 'bg-orange-500';
    if (value < 60) return 'bg-yellow-500';
    if (value < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicateurs de Réputation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Réputation Générale</span>
            <span className="text-sm">{reputation}%</span>
          </div>
          <Progress value={reputation} className={getReputationColor(reputation)} />
          <div className="text-right text-sm text-muted-foreground">
            {getReputationLabel(reputation)}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Influence Politique</span>
            <span className="text-sm">{influence}%</span>
          </div>
          <Progress value={influence} className={getReputationColor(influence)} />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Prestige Social</span>
            <span className="text-sm">{prestige}%</span>
          </div>
          <Progress value={prestige} className={getReputationColor(prestige)} />
        </div>
        
        <div className="pt-4 text-sm text-muted-foreground">
          <p>Les indicateurs sont calculés en fonction des actions individuelles des membres de votre famille, ainsi que des événements historiques qui ont affecté votre lignée.</p>
        </div>
      </CardContent>
    </Card>
  );
};
