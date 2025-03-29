
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface SocialStabilityCardProps {
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
  // Gérer les changements individuels
  const handlePatriciensChange = (value: number[]) => {
    onUpdate({
      patriciens: value[0],
      plébéiens: social.plébéiens
    });
  };

  const handlePlebiensChange = (value: number[]) => {
    onUpdate({
      patriciens: social.patriciens,
      plébéiens: value[0]
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre social</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Patriciens</label>
              <span className="text-sm">{social.patriciens}%</span>
            </div>
            <Slider
              defaultValue={[social.patriciens]}
              max={100}
              min={0}
              step={1}
              onValueChange={handlePatriciensChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Plébéiens</label>
              <span className="text-sm">{social.plébéiens}%</span>
            </div>
            <Slider
              defaultValue={[social.plébéiens]}
              max={100}
              min={0}
              step={1}
              onValueChange={handlePlebiensChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
