
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { EconomicStabilityCardProps } from '@/components/maitrejeu/types/equilibre';

export const EconomicStabilityCard: React.FC<EconomicStabilityCardProps> = ({ 
  equilibre, 
  onUpdate 
}) => {
  const [economie, setEconomie] = useState(equilibre.economie);
  
  const handleSave = () => {
    onUpdate(economie);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stabilité Économique</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span>Économie</span>
            <span>{economie}%</span>
          </div>
          <Slider
            value={[economie]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setEconomie(value[0])}
          />
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Mettre à jour la stabilité économique
        </Button>
      </CardContent>
    </Card>
  );
};
