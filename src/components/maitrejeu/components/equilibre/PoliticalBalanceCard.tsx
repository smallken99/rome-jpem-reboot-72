
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { PoliticalBalanceCardProps } from '@/components/maitrejeu/types/equilibre';

export const PoliticalBalanceCard: React.FC<PoliticalBalanceCardProps> = ({ 
  equilibre, 
  onUpdate 
}) => {
  const [populaires, setPopulaires] = useState(equilibre.populaires);
  const [optimates, setOptimates] = useState(equilibre.optimates);
  const [moderates, setModerates] = useState(equilibre.moderates);
  
  const handleSave = () => {
    onUpdate(populaires, optimates, moderates);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre Politique</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>Populaires</span>
              <span>{populaires}%</span>
            </div>
            <Slider
              value={[populaires]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setPopulaires(value[0])}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span>Optimates</span>
              <span>{optimates}%</span>
            </div>
            <Slider
              value={[optimates]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setOptimates(value[0])}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span>Modérés</span>
              <span>{moderates}%</span>
            </div>
            <Slider
              value={[moderates]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setModerates(value[0])}
            />
          </div>
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Mettre à jour l'équilibre politique
        </Button>
      </CardContent>
    </Card>
  );
};
