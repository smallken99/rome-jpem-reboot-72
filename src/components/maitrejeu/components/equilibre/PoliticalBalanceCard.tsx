
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Equilibre } from '@/types/equilibre';

interface PoliticalBalanceCardProps {
  populaires: number;
  optimates: number;
  moderates: number;
  onUpdate: (values: { populaires: number; optimates: number; moderates: number; }) => void;
  equilibre: Equilibre;
}

export const PoliticalBalanceCard: React.FC<PoliticalBalanceCardProps> = ({
  populaires,
  optimates,
  moderates,
  onUpdate,
  equilibre
}) => {
  const handleUpdate = (type: 'populaires' | 'optimates' | 'moderates', value: number[]) => {
    const newValues = {
      populaires,
      optimates,
      moderates,
      [type]: value[0]
    };
    
    onUpdate(newValues);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Populares</span>
          <span className="text-sm text-muted-foreground">{populaires}%</span>
        </div>
        <Slider 
          defaultValue={[populaires]} 
          max={100} 
          step={1}
          onValueChange={(value) => handleUpdate('populaires', value)}
        />
        <Progress value={populaires} className="h-2 mt-1" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Optimates</span>
          <span className="text-sm text-muted-foreground">{optimates}%</span>
        </div>
        <Slider 
          defaultValue={[optimates]} 
          max={100} 
          step={1}
          onValueChange={(value) => handleUpdate('optimates', value)}
        />
        <Progress value={optimates} className="h-2 mt-1" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Modérés</span>
          <span className="text-sm text-muted-foreground">{moderates}%</span>
        </div>
        <Slider 
          defaultValue={[moderates]} 
          max={100} 
          step={1}
          onValueChange={(value) => handleUpdate('moderates', value)}
        />
        <Progress value={moderates} className="h-2 mt-1" />
      </div>
      
      <div className="bg-muted p-3 rounded-md mt-4">
        <p className="text-sm text-muted-foreground">
          L'équilibre politique influence directement la stabilité du Sénat.
        </p>
      </div>
    </div>
  );
};
