
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SocialStabilityCardProps } from '../../types/equilibre';

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
        <CardTitle>Équilibre Social</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="patriciens">Patriciens</Label>
            <span className="text-sm font-medium">{localPatriciens}%</span>
          </div>
          <Slider
            id="patriciens"
            min={0}
            max={100}
            step={1}
            value={[localPatriciens]}
            onValueChange={(value) => setLocalPatriciens(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Satisfaction des classes patriciennes
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="plebeiens">Plébéiens</Label>
            <span className="text-sm font-medium">{localPlebeiens}%</span>
          </div>
          <Slider
            id="plebeiens"
            min={0}
            max={100}
            step={1}
            value={[localPlebeiens]}
            onValueChange={(value) => setLocalPlebeiens(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Satisfaction de la plèbe et des classes populaires
          </p>
        </div>
        
        <Button className="w-full" onClick={handleSave}>
          Mettre à jour l'équilibre social
        </Button>
      </CardContent>
    </Card>
  );
};
