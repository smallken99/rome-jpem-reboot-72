
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
  
  const totalPercentage = localPopulaires + localOptimates + localModerates;
  
  const handleSave = () => {
    // Normalize to make sure total is 100%
    const total = localPopulaires + localOptimates + localModerates;
    const normalizedPopulaires = Math.round((localPopulaires / total) * 100);
    const normalizedOptimates = Math.round((localOptimates / total) * 100);
    const normalizedModerates = 100 - normalizedPopulaires - normalizedOptimates;
    
    onUpdate(normalizedPopulaires, normalizedOptimates, normalizedModerates);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre Politique</CardTitle>
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
            onValueChange={(value) => {
              setLocalPopulaires(value[0]);
              setLocalModerates(100 - value[0] - localOptimates);
            }}
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
            onValueChange={(value) => {
              setLocalOptimates(value[0]);
              setLocalModerates(100 - localPopulaires - value[0]);
            }}
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
            disabled
          />
        </div>
        
        <div className="text-sm text-muted-foreground">
          {totalPercentage !== 100 && (
            <p className="text-red-500">
              Le total doit être égal à 100% (actuellement {totalPercentage}%)
            </p>
          )}
        </div>
        
        <Button onClick={handleSave} className="w-full" disabled={totalPercentage !== 100}>
          Mettre à jour l'équilibre politique
        </Button>
      </CardContent>
    </Card>
  );
};
