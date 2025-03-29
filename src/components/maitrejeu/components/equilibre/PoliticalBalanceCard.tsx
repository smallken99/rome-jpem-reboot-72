
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { PoliticalBalanceCardProps } from '@/components/maitrejeu/types/equilibre';

export const PoliticalBalanceCard: React.FC<PoliticalBalanceCardProps> = ({ 
  populares, 
  optimates, 
  moderates, 
  onUpdate,
  equilibre
}) => {
  const [localPopulares, setLocalPopulares] = useState(populares || 50);
  const [localOptimates, setLocalOptimates] = useState(optimates || 50);
  const [localModerates, setLocalModerates] = useState(moderates || 50);
  
  const handleSave = () => {
    onUpdate(localPopulares, localOptimates, localModerates);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre Politique</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span>Populares</span>
            <span>{localPopulares}%</span>
          </div>
          <Slider
            value={[localPopulares]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setLocalPopulares(value[0])}
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
            onValueChange={(value) => setLocalOptimates(value[0])}
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
            onValueChange={(value) => setLocalModerates(value[0])}
          />
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Mettre à jour l'équilibre politique
        </Button>
      </CardContent>
    </Card>
  );
};
