
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export interface PoliticalBalanceCardProps {
  populaires: number;
  optimates: number;
  moderates: number;
  onUpdate: (values: { populaires: number; optimates: number; moderates: number; }) => void;
}

export const PoliticalBalanceCard: React.FC<PoliticalBalanceCardProps> = ({
  populaires,
  optimates,
  moderates,
  onUpdate
}) => {
  const [internalValues, setInternalValues] = useState({
    populaires,
    optimates,
    moderates
  });
  
  const handleUpdate = (key: keyof typeof internalValues, value: number) => {
    const newValues = { ...internalValues, [key]: value };
    setInternalValues(newValues);
  };
  
  const handleSave = () => {
    onUpdate(internalValues);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre Politique</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Populares</span>
              <span className="text-sm">{internalValues.populaires}%</span>
            </div>
            <Slider
              value={[internalValues.populaires]}
              min={0}
              max={100}
              step={1}
              onValueChange={(values) => handleUpdate('populaires', values[0])}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Optimates</span>
              <span className="text-sm">{internalValues.optimates}%</span>
            </div>
            <Slider
              value={[internalValues.optimates]}
              min={0}
              max={100}
              step={1}
              onValueChange={(values) => handleUpdate('optimates', values[0])}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Moderates</span>
              <span className="text-sm">{internalValues.moderates}%</span>
            </div>
            <Slider
              value={[internalValues.moderates]}
              min={0}
              max={100}
              step={1}
              onValueChange={(values) => handleUpdate('moderates', values[0])}
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
