
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { SocialStabilityCardProps } from '@/components/maitrejeu/types/equilibre';

export const SocialStabilityCard: React.FC<SocialStabilityCardProps> = ({ 
  equilibre, 
  onUpdate 
}) => {
  const [patriciens, setPatriciens] = useState(equilibre.patriciens);
  const [plébéiens, setPlébéiens] = useState(equilibre.plébéiens);
  
  const handleSave = () => {
    onUpdate(patriciens, plébéiens);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stabilité Sociale</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>Patriciens</span>
              <span>{patriciens}%</span>
            </div>
            <Slider
              value={[patriciens]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setPatriciens(value[0])}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span>Plébéiens</span>
              <span>{plébéiens}%</span>
            </div>
            <Slider
              value={[plébéiens]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setPlébéiens(value[0])}
            />
          </div>
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Mettre à jour la stabilité sociale
        </Button>
      </CardContent>
    </Card>
  );
};
