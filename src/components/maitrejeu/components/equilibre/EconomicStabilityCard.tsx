
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { EconomicStabilityCardProps } from '../../types/equilibre';

const EconomicStabilityCard: React.FC<EconomicStabilityCardProps> = ({
  economy,
  onUpdate
}) => {
  const [economyValue, setEconomyValue] = useState(economy);
  
  const handleEconomyChange = (value: number[]) => {
    setEconomyValue(value[0]);
    onUpdate(value[0]);
  };
  
  const getEconomyColor = (value: number) => {
    if (value >= 75) return "bg-green-500";
    if (value >= 50) return "bg-green-400";
    if (value >= 40) return "bg-yellow-400";
    if (value >= 30) return "bg-amber-500";
    if (value >= 20) return "bg-orange-500";
    return "bg-red-500";
  };
  
  const getEconomyStatus = (value: number) => {
    if (value >= 75) return "Prospère";
    if (value >= 50) return "Stable";
    if (value >= 40) return "Fluctuante";
    if (value >= 30) return "Fragile";
    if (value >= 20) return "En difficulté";
    return "En crise";
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Stabilité Économique</span>
          <span className="text-sm font-bold">{economyValue}%</span>
        </div>
        <Slider
          defaultValue={[economyValue]}
          max={100}
          step={1}
          onValueChange={handleEconomyChange}
        />
        <Progress 
          value={economyValue} 
          className="h-2" 
          indicatorClassName={getEconomyColor(economyValue)}
        />
        <div className="flex justify-end">
          <span className="text-xs font-medium">
            État: {getEconomyStatus(economyValue)}
          </span>
        </div>
      </div>
      
      <div className="rounded-lg bg-gray-100 p-2.5 text-xs text-gray-600">
        <p className="font-medium mb-1">Impacts de la stabilité économique:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Revenus fiscaux {economyValue < 50 ? "réduits" : "augmentés"}</li>
          <li>Soutien populaire {economyValue < 40 ? "fragilisé" : "renforcé"}</li>
          <li>Capacité militaire {economyValue < 30 ? "compromise" : "maintenue"}</li>
        </ul>
      </div>
    </div>
  );
};

export default EconomicStabilityCard;
