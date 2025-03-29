
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { PoliticalBalanceCardProps } from '../../types/equilibre';

const PoliticalBalanceCard: React.FC<PoliticalBalanceCardProps> = ({
  populares,
  optimates,
  moderates,
  onUpdate
}) => {
  const [popularesValue, setPopularesValue] = useState(populares);
  const [optimatesValue, setOptimatesValue] = useState(optimates);
  const [moderatesValue, setModeratesValue] = useState(moderates);
  
  const handlePopularesChange = (value: number[]) => {
    setPopularesValue(value[0]);
    onUpdate(value[0], optimatesValue, moderatesValue);
  };
  
  const handleOptimatesChange = (value: number[]) => {
    setOptimatesValue(value[0]);
    onUpdate(popularesValue, value[0], moderatesValue);
  };
  
  const handleModeratesChange = (value: number[]) => {
    setModeratesValue(value[0]);
    onUpdate(popularesValue, optimatesValue, value[0]);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Populares</span>
          <span className="text-sm font-bold">{popularesValue}%</span>
        </div>
        <Slider
          defaultValue={[popularesValue]}
          max={100}
          step={1}
          onValueChange={handlePopularesChange}
        />
        <Progress value={popularesValue} className="h-2" />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Optimates</span>
          <span className="text-sm font-bold">{optimatesValue}%</span>
        </div>
        <Slider
          defaultValue={[optimatesValue]}
          max={100}
          step={1}
          onValueChange={handleOptimatesChange}
        />
        <Progress value={optimatesValue} className="h-2" />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Modérés</span>
          <span className="text-sm font-bold">{moderatesValue}%</span>
        </div>
        <Slider
          defaultValue={[moderatesValue]}
          max={100}
          step={1}
          onValueChange={handleModeratesChange}
        />
        <Progress value={moderatesValue} className="h-2" />
      </div>
    </div>
  );
};

export default PoliticalBalanceCard;
