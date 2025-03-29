
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EconomicStabilityCardProps } from '../../types/equilibre';

export const EconomicStabilityCard: React.FC<EconomicStabilityCardProps> = ({
  economy,
  onUpdate,
  equilibre
}) => {
  const [localEconomy, setLocalEconomy] = useState(economy);
  
  const handleSave = () => {
    onUpdate(localEconomy);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stabilité Économique</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="economy">Économie</Label>
            <span className="text-sm font-medium">{localEconomy}%</span>
          </div>
          <Slider
            id="economy"
            min={0}
            max={100}
            step={1}
            value={[localEconomy]}
            onValueChange={(value) => setLocalEconomy(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            État général de l'économie romaine
          </p>
        </div>
        
        <Button className="w-full" onClick={handleSave}>
          Mettre à jour la stabilité économique
        </Button>
      </CardContent>
    </Card>
  );
};
