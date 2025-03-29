
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export interface PoliticalBalanceCardProps {
  populaires: number;
  optimates: number;
  moderates: number;
  onUpdate: (values: { populaires: number; optimates: number; moderates: number }) => void;
}

export function PoliticalBalanceCard({ 
  populaires, 
  optimates, 
  moderates, 
  onUpdate 
}: PoliticalBalanceCardProps) {
  const handlePopulairesChange = (value: number[]) => {
    onUpdate({ populaires: value[0], optimates, moderates });
  };

  const handleOptimatesChange = (value: number[]) => {
    onUpdate({ populaires, optimates: value[0], moderates });
  };

  const handleModeratesChange = (value: number[]) => {
    onUpdate({ populaires, optimates, moderates: value[0] });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre Politique</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Populaires</span>
            <span className="text-sm">{populaires}</span>
          </div>
          <Slider 
            value={[populaires]} 
            min={0} 
            max={100} 
            step={1} 
            onValueChange={handlePopulairesChange}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Optimates</span>
            <span className="text-sm">{optimates}</span>
          </div>
          <Slider 
            value={[optimates]} 
            min={0} 
            max={100} 
            step={1} 
            onValueChange={handleOptimatesChange}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Modérés</span>
            <span className="text-sm">{moderates}</span>
          </div>
          <Slider 
            value={[moderates]} 
            min={0} 
            max={100} 
            step={1} 
            onValueChange={handleModeratesChange}
            className="cursor-pointer"
          />
        </div>

        <div className="pt-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Équilibre: {(Math.abs(populaires - optimates) < 20) ? "Stable" : "Instable"}</span>
            <span>Indice de tension: {Math.abs(populaires - optimates)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
