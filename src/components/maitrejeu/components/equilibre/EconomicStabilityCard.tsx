
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Equilibre } from '@/types/game';

export interface EconomicStabilityCardProps {
  economie: number;
  onUpdate: (economy: number) => void;
  equilibre: Equilibre;
}

export const EconomicStabilityCard: React.FC<EconomicStabilityCardProps> = ({
  economie,
  onUpdate,
  equilibre
}) => {
  const [internalValue, setInternalValue] = useState(economie);
  
  const handleSave = () => {
    onUpdate(internalValue);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stabilité Économique</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  className="text-gray-200" 
                  strokeWidth="8" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="40" 
                  cx="50" 
                  cy="50" 
                />
                <circle 
                  className={`${
                    internalValue > 70 
                      ? 'text-green-500' 
                      : internalValue > 40 
                        ? 'text-yellow-500' 
                        : 'text-red-500'
                  }`} 
                  strokeWidth="8" 
                  strokeDasharray={`${internalValue * 2.5} 250`}
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="40" 
                  cx="50" 
                  cy="50" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{internalValue}%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Santé économique</span>
              <span className="text-sm">{internalValue}%</span>
            </div>
            <Slider
              value={[internalValue]}
              min={0}
              max={100}
              step={1}
              onValueChange={(values) => setInternalValue(values[0])}
            />
          </div>
          
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleSave}
          >
            Appliquer les changements
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
