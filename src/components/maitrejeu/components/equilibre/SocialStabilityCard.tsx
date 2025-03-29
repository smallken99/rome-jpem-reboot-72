
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { SocialStabilityCardProps } from '@/components/maitrejeu/types/equilibre';

export const SocialStabilityCard: React.FC<SocialStabilityCardProps> = ({ 
  patriciens,
  plebeiens, 
  onUpdate,
  equilibre
}) => {
  const [localPatriciens, setLocalPatriciens] = useState(patriciens);
  const [localPlebeiens, setLocalPlebeiens] = useState(plebeiens);
  
  const handleSave = () => {
    onUpdate(localPatriciens, localPlebeiens);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stabilité Sociale</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span>Patriciens</span>
            <span>{localPatriciens}%</span>
          </div>
          <Slider
            value={[localPatriciens]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setLocalPatriciens(value[0])}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span>Plébéiens</span>
            <span>{localPlebeiens}%</span>
          </div>
          <Slider
            value={[localPlebeiens]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setLocalPlebeiens(value[0])}
          />
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Mettre à jour la stabilité sociale
        </Button>
      </CardContent>
    </Card>
  );
};
