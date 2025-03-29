
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PoliticalBalanceCardProps } from '../../types/equilibre';

export const PoliticalBalanceCard: React.FC<PoliticalBalanceCardProps> = ({
  populaires,
  optimates,
  moderates,
  onUpdate,
  equilibre
}) => {
  const [localPopulaires, setLocalPopulaires] = useState(populaires);
  const [localOptimates, setLocalOptimates] = useState(optimates);
  const [localModerates, setLocalModerates] = useState(moderates);
  
  const handleSave = () => {
    onUpdate(localPopulaires, localOptimates, localModerates);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre Politique</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="populaires">Populaires</Label>
            <span className="text-sm font-medium">{localPopulaires}%</span>
          </div>
          <Slider
            id="populaires"
            min={0}
            max={100}
            step={1}
            value={[localPopulaires]}
            onValueChange={(value) => setLocalPopulaires(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Influence des factions populaires
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="optimates">Optimates</Label>
            <span className="text-sm font-medium">{localOptimates}%</span>
          </div>
          <Slider
            id="optimates"
            min={0}
            max={100}
            step={1}
            value={[localOptimates]}
            onValueChange={(value) => setLocalOptimates(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Influence des factions optimates
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="moderates">Modérés</Label>
            <span className="text-sm font-medium">{localModerates}%</span>
          </div>
          <Slider
            id="moderates"
            min={0}
            max={100}
            step={1}
            value={[localModerates]}
            onValueChange={(value) => setLocalModerates(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Influence des factions modérées
          </p>
        </div>
        
        <Button className="w-full" onClick={handleSave}>
          Mettre à jour l'équilibre politique
        </Button>
      </CardContent>
    </Card>
  );
};
