
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Coins } from 'lucide-react';
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
  
  const getStabilityColor = (value: number) => {
    if (value >= 75) return 'text-green-600';
    if (value >= 50) return 'text-yellow-600';
    if (value >= 25) return 'text-orange-600';
    return 'text-red-600';
  };
  
  const getProgressColor = (value: number) => {
    if (value >= 75) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    if (value >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  const factors = [
    { name: 'Commerce', value: 15, impact: 'Positif' },
    { name: 'Agriculture', value: 12, impact: 'Positif' },
    { name: 'Taxes', value: 8, impact: 'Positif' },
    { name: 'Dépenses militaires', value: -10, impact: 'Négatif' },
    { name: 'Corruption', value: -5, impact: 'Négatif' }
  ];
  
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">Économie</span>
          <span className={`text-lg font-bold ${getStabilityColor(economyValue)}`}>
            {economyValue}%
          </span>
        </div>
        <Slider
          defaultValue={[economyValue]}
          max={100}
          step={1}
          onValueChange={handleEconomyChange}
        />
        <Progress 
          value={economyValue} 
          className="h-2 mt-1" 
        />
      </div>
      
      <div className="space-y-3 mt-4">
        <h3 className="text-sm font-medium">Facteurs Influents</h3>
        {factors.map((factor, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span>{factor.name}</span>
            <div className="flex items-center">
              <span 
                className={
                  factor.value > 0 ? 'text-green-600' : 
                  factor.value < 0 ? 'text-red-600' : 
                  'text-gray-600'
                }
              >
                {factor.value > 0 ? '+' : ''}{factor.value}%
              </span>
              <span className="text-xs text-muted-foreground ml-2">({factor.impact})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EconomicStabilityCard;
