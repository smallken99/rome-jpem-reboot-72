
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SocialStabilityCardProps {
  patriciens: number;
  plébéiens: number;
  onUpdate?: (values: { patriciens: number; plébéiens: number }) => void;
}

export const SocialStabilityCard: React.FC<SocialStabilityCardProps> = ({
  patriciens,
  plébéiens,
  onUpdate
}) => {
  // Calculate tension index
  const tensionIndex = Math.abs(patriciens - plébéiens) / 10;
  const tensionPercent = Math.min(100, tensionIndex * 10);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Stabilité Sociale</CardTitle>
        <CardDescription>
          Tensions entre les classes sociales de Rome
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Satisfaction Patriciens</span>
              <span className="text-sm text-muted-foreground">{patriciens}%</span>
            </div>
            <Progress value={patriciens} className="h-2 bg-stone-200" indicatorClassName="bg-purple-600" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Satisfaction Plébéiens</span>
              <span className="text-sm text-muted-foreground">{plébéiens}%</span>
            </div>
            <Progress value={plébéiens} className="h-2 bg-stone-200" indicatorClassName="bg-amber-600" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Indice de Tension Sociale</span>
              <span className="text-sm text-muted-foreground">{tensionPercent.toFixed(0)}%</span>
            </div>
            <Progress 
              value={tensionPercent} 
              className="h-2 bg-stone-200" 
              indicatorClassName={`${tensionPercent > 50 ? 'bg-red-600' : 'bg-yellow-600'}`} 
            />
          </div>
          
          <div className="bg-muted p-3 rounded-md mt-4">
            <p className="text-sm text-muted-foreground">
              Les tensions sociales peuvent conduire à des séditions ou des révoltes si elles ne sont pas apaisées.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
