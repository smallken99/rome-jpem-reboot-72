
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
  const [localPatriciens, setLocalPatriciens] = useState(patriciens || 20);
  const [localPlebeiens, setLocalPlebeiens] = useState(plebeiens || 80);
  
  const totalPercentage = localPatriciens + localPlebeiens;
  
  const handleSave = () => {
    // Normalize to make sure total is 100%
    const total = localPatriciens + localPlebeiens;
    const normalizedPatriciens = Math.round((localPatriciens / total) * 100);
    const normalizedPlebeiens = 100 - normalizedPatriciens;
    
    onUpdate(normalizedPatriciens, normalizedPlebeiens);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre Social</CardTitle>
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
            onValueChange={(value) => {
              setLocalPatriciens(value[0]);
              setLocalPlebeiens(100 - value[0]);
            }}
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
          Mettre à jour l'équilibre social
        </Button>
      </CardContent>
    </Card>
  );
};
