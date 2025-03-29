
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { PoliticalBalanceCardProps } from '@/components/maitrejeu/types/equilibre';

export const PoliticalBalanceCard: React.FC<PoliticalBalanceCardProps> = ({ 
  populaires, 
  optimates, 
  moderates, 
  onUpdate,
  equilibre
}) => {
  const [localPopulaires, setLocalPopulaires] = useState(populaires || 33);
  const [localOptimates, setLocalOptimates] = useState(optimates || 33);
  const [localModerates, setLocalModerates] = useState(moderates || 34);
  
  const handleAdjustValues = (type: 'populaires' | 'optimates' | 'moderates', newValue: number) => {
    let newPopulaires = localPopulaires;
    let newOptimates = localOptimates;
    let newModerates = localModerates;
    
    const total = 100;
    
    if (type === 'populaires') {
      newPopulaires = newValue;
      // Adjust others proportionally
      const remainingPercentage = total - newValue;
      const ratio = localOptimates / (localOptimates + localModerates);
      newOptimates = Math.round(remainingPercentage * ratio);
      newModerates = total - newPopulaires - newOptimates;
    } 
    else if (type === 'optimates') {
      newOptimates = newValue;
      // Adjust others proportionally
      const remainingPercentage = total - newValue;
      const ratio = localPopulaires / (localPopulaires + localModerates);
      newPopulaires = Math.round(remainingPercentage * ratio);
      newModerates = total - newPopulaires - newOptimates;
    }
    else if (type === 'moderates') {
      newModerates = newValue;
      // Adjust others proportionally
      const remainingPercentage = total - newValue;
      const ratio = localPopulaires / (localPopulaires + localOptimates);
      newPopulaires = Math.round(remainingPercentage * ratio);
      newOptimates = total - newPopulaires - newModerates;
    }
    
    setLocalPopulaires(newPopulaires);
    setLocalOptimates(newOptimates);
    setLocalModerates(newModerates);
  };
  
  const handleSave = () => {
    onUpdate(localPopulaires, localOptimates, localModerates);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre des Factions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span>Populaires</span>
            <span>{localPopulaires}%</span>
          </div>
          <Slider
            value={[localPopulaires]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => handleAdjustValues('populaires', value[0])}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span>Optimates</span>
            <span>{localOptimates}%</span>
          </div>
          <Slider
            value={[localOptimates]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => handleAdjustValues('optimates', value[0])}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span>Modérés</span>
            <span>{localModerates}%</span>
          </div>
          <Slider
            value={[localModerates]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => handleAdjustValues('moderates', value[0])}
          />
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground">
          Total: {localPopulaires + localOptimates + localModerates}%
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Mettre à jour l'équilibre des factions
        </Button>
      </CardContent>
    </Card>
  );
};
