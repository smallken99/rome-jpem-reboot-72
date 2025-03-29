
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Equilibre } from '@/types/equilibre';

interface SocialStabilityCardProps {
  patriciens: number;
  plebeiens: number;
  onUpdate: (values: { patriciens: number; plébéiens: number; }) => void;
  equilibre: Equilibre;
}

export const SocialStabilityCard: React.FC<SocialStabilityCardProps> = ({
  patriciens,
  plebeiens,
  onUpdate,
  equilibre
}) => {
  const handleUpdate = (type: 'patriciens' | 'plebeiens', value: number[]) => {
    const newValues = {
      patriciens,
      plébéiens: plebeiens,
      [type]: value[0]
    };
    
    if (type === 'plebeiens') {
      newValues.plébéiens = value[0];
    }
    
    onUpdate(newValues);
  };
  
  // Calculate social tension score (difference between patriciens and plebeiens)
  const tensionScore = Math.abs(patriciens - plebeiens);
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Patriciens</span>
          <span className="text-sm text-muted-foreground">{patriciens}%</span>
        </div>
        <Slider 
          defaultValue={[patriciens]} 
          max={100} 
          step={1}
          onValueChange={(value) => handleUpdate('patriciens', value)}
        />
        <Progress value={patriciens} className="h-2 mt-1" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Plébéiens</span>
          <span className="text-sm text-muted-foreground">{plebeiens}%</span>
        </div>
        <Slider 
          defaultValue={[plebeiens]} 
          max={100} 
          step={1}
          onValueChange={(value) => handleUpdate('plebeiens', value)}
        />
        <Progress value={plebeiens} className="h-2 mt-1" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Tension sociale</span>
          <span className="text-sm text-muted-foreground">{tensionScore}%</span>
        </div>
        <Progress 
          value={tensionScore} 
          className="h-2 mt-1" 
          indicatorClassName={tensionScore > 50 ? "bg-red-500" : (tensionScore > 25 ? "bg-yellow-500" : "bg-green-500")}
        />
      </div>
      
      <div className="bg-muted p-3 rounded-md mt-4">
        <p className="text-sm text-muted-foreground">
          L'équilibre social est crucial pour éviter les révoltes et maintenir l'ordre.
        </p>
      </div>
    </div>
  );
};
