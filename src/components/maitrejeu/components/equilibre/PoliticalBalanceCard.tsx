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
    const newPopulares = value[0];
    const total = newPopulares + optimatesValue + moderatesValue;
    
    if (total > 100) {
      // Adjust other values to keep total at 100
      const excess = total - 100;
      const optimatesRatio = optimatesValue / (optimatesValue + moderatesValue);
      
      const newOptimatesReduction = Math.round(excess * optimatesRatio);
      const newModeratesReduction = excess - newOptimatesReduction;
      
      const adjustedOptimates = Math.max(0, optimatesValue - newOptimatesReduction);
      const adjustedModerates = Math.max(0, moderatesValue - newModeratesReduction);
      
      setOptimatesValue(adjustedOptimates);
      setModeratesValue(adjustedModerates);
      setPopularesValue(newPopulares);
      
      onUpdate(newPopulares, adjustedOptimates, adjustedModerates);
    } else {
      setPopularesValue(newPopulares);
      onUpdate(newPopulares, optimatesValue, moderatesValue);
    }
  };
  
  const handleOptimatesChange = (value: number[]) => {
    const newOptimates = value[0];
    const total = popularesValue + newOptimates + moderatesValue;
    
    if (total > 100) {
      // Adjust other values to keep total at 100
      const excess = total - 100;
      const popularesRatio = popularesValue / (popularesValue + moderatesValue);
      
      const newPopularesReduction = Math.round(excess * popularesRatio);
      const newModeratesReduction = excess - newPopularesReduction;
      
      const adjustedPopulares = Math.max(0, popularesValue - newPopularesReduction);
      const adjustedModerates = Math.max(0, moderatesValue - newModeratesReduction);
      
      setPopularesValue(adjustedPopulares);
      setModeratesValue(adjustedModerates);
      setOptimatesValue(newOptimates);
      
      onUpdate(adjustedPopulares, newOptimates, adjustedModerates);
    } else {
      setOptimatesValue(newOptimates);
      onUpdate(popularesValue, newOptimates, moderatesValue);
    }
  };
  
  const handleModeratesChange = (value: number[]) => {
    const newModerates = value[0];
    const total = popularesValue + optimatesValue + newModerates;
    
    if (total > 100) {
      // Adjust other values to keep total at 100
      const excess = total - 100;
      const popularesRatio = popularesValue / (popularesValue + optimatesValue);
      
      const newPopularesReduction = Math.round(excess * popularesRatio);
      const newOptimatesReduction = excess - newPopularesReduction;
      
      const adjustedPopulares = Math.max(0, popularesValue - newPopularesReduction);
      const adjustedOptimates = Math.max(0, optimatesValue - newOptimatesReduction);
      
      setPopularesValue(adjustedPopulares);
      setOptimatesValue(adjustedOptimates);
      setModeratesValue(newModerates);
      
      onUpdate(adjustedPopulares, adjustedOptimates, newModerates);
    } else {
      setModeratesValue(newModerates);
      onUpdate(popularesValue, optimatesValue, newModerates);
    }
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
        <Progress 
          value={popularesValue} 
          className="h-2" 
          indicatorClassName="bg-red-500"
        />
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
        <Progress 
          value={optimatesValue} 
          className="h-2"
          indicatorClassName="bg-blue-500"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Moderates</span>
          <span className="text-sm font-bold">{moderatesValue}%</span>
        </div>
        <Slider
          defaultValue={[moderatesValue]}
          max={100}
          step={1}
          onValueChange={handleModeratesChange}
        />
        <Progress 
          value={moderatesValue} 
          className="h-2"
          indicatorClassName="bg-green-500"
        />
      </div>
      
      <div className="rounded-lg bg-gray-100 p-2.5 text-xs text-gray-600">
        Total: {popularesValue + optimatesValue + moderatesValue}% (should equal 100%)
      </div>
    </div>
  );
};

export default PoliticalBalanceCard;
