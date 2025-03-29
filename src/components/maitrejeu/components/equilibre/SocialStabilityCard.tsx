
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { SocialStabilityCardProps } from '../../types/equilibre';

const SocialStabilityCard: React.FC<SocialStabilityCardProps> = ({
  patriciens,
  plebeiens,
  onUpdate
}) => {
  const [patriciensValue, setPatriciensValue] = useState(patriciens);
  const [plebeiensValue, setPlebeiensValue] = useState(plebeiens);
  
  const handlePatriciensChange = (value: number[]) => {
    setPatriciensValue(value[0]);
    onUpdate(value[0], plebeiensValue);
  };
  
  const handlePlebeiensChange = (value: number[]) => {
    setPlebeiensValue(value[0]);
    onUpdate(patriciensValue, value[0]);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Patriciens</span>
          <span className="text-sm font-bold">{patriciensValue}%</span>
        </div>
        <Slider
          defaultValue={[patriciensValue]}
          max={100}
          step={1}
          onValueChange={handlePatriciensChange}
        />
        <Progress 
          value={patriciensValue} 
          className="h-2" 
          indicatorClassName={patriciensValue > 70 ? "bg-green-500" : patriciensValue < 30 ? "bg-red-500" : "bg-amber-500"}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Plébéiens</span>
          <span className="text-sm font-bold">{plebeiensValue}%</span>
        </div>
        <Slider
          defaultValue={[plebeiensValue]}
          max={100}
          step={1}
          onValueChange={handlePlebeiensChange}
        />
        <Progress 
          value={plebeiensValue} 
          className="h-2"
          indicatorClassName={plebeiensValue > 70 ? "bg-green-500" : plebeiensValue < 30 ? "bg-red-500" : "bg-amber-500"}
        />
      </div>
    </div>
  );
};

export default SocialStabilityCard;
