
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Equilibre } from '@/types/equilibre';

interface EconomicStabilityCardProps {
  economie: number;
  onUpdate?: (value: number) => void;
  equilibre?: Equilibre;
}

export const EconomicStabilityCard: React.FC<EconomicStabilityCardProps> = ({
  economie,
  onUpdate,
  equilibre
}) => {
  // Determine economic health status
  const getEconomicStatus = (value: number) => {
    if (value >= 80) return { text: "Prospérité", color: "bg-green-600" };
    if (value >= 60) return { text: "Stabilité", color: "bg-blue-600" };
    if (value >= 40) return { text: "Fragile", color: "bg-yellow-600" };
    if (value >= 20) return { text: "Crise", color: "bg-orange-600" };
    return { text: "Effondrement", color: "bg-red-600" };
  };
  
  const economicStatus = getEconomicStatus(economie);
  
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Indice économique</span>
          <span className="text-sm text-muted-foreground">{economie}%</span>
        </div>
        {onUpdate ? (
          <Slider 
            defaultValue={[economie]} 
            max={100} 
            step={1}
            onValueChange={(value) => onUpdate(value[0])}
          />
        ) : null}
        <Progress 
          value={economie} 
          className="h-2 bg-stone-200" 
          indicatorClassName={economicStatus.color} 
        />
      </div>
      
      <div className="flex items-center justify-between p-3 border rounded-md">
        <span className="font-medium">Statut actuel:</span>
        <span className={`px-2 py-1 rounded text-sm text-white ${economicStatus.color}`}>
          {economicStatus.text}
        </span>
      </div>
      
      <div className="bg-muted p-3 rounded-md mt-4">
        <p className="text-sm text-muted-foreground">
          L'économie impacte directement les revenus fiscaux et le moral des citoyens.
        </p>
      </div>
    </div>
  );
};
