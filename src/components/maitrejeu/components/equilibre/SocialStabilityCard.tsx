
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export interface SocialStabilityCardProps {
  social: {
    patriciens: number;
    plébéiens: number;
  };
  onUpdate: (values: { patriciens: number; plébéiens: number; }) => void;
}

export const SocialStabilityCard: React.FC<SocialStabilityCardProps> = ({
  social,
  onUpdate
}) => {
  const [internalValues, setInternalValues] = useState({
    patriciens: social.patriciens,
    plébéiens: social.plébéiens
  });
  
  const handleUpdate = (key: keyof typeof internalValues, value: number) => {
    const newValues = { ...internalValues, [key]: value };
    setInternalValues(newValues);
  };
  
  const handleSave = () => {
    onUpdate(internalValues);
  };
  
  const socialTension = Math.abs(internalValues.patriciens - internalValues.plébéiens);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre Social</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold mb-1">
              {socialTension > 50 ? 'Forte tension' : socialTension > 25 ? 'Tension modérée' : 'Équilibre'}
            </div>
            <div className="text-sm text-muted-foreground">
              Écart de {socialTension}% entre patriciens et plébéiens
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Patriciens</span>
              <span className="text-sm">{internalValues.patriciens}%</span>
            </div>
            <Slider
              value={[internalValues.patriciens]}
              min={0}
              max={100}
              step={1}
              onValueChange={(values) => handleUpdate('patriciens', values[0])}
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Plébéiens</span>
              <span className="text-sm">{internalValues.plébéiens}%</span>
            </div>
            <Slider
              value={[internalValues.plébéiens]}
              min={0}
              max={100}
              step={1}
              onValueChange={(values) => handleUpdate('plébéiens', values[0])}
            />
          </div>
          
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleSave}
          >
            Appliquer les changements
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
