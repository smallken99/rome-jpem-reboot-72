
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface PoliticalBalanceCardProps {
  political: {
    populaires: number;
    optimates: number;
    moderates: number;
  };
  onUpdate: (values: { populaires: number; optimates: number; moderates: number; }) => void;
}

export const PoliticalBalanceCard: React.FC<PoliticalBalanceCardProps> = ({
  political,
  onUpdate
}) => {
  // Gérer les changements individuels
  const handlePopulairesChange = (value: number[]) => {
    onUpdate({
      populaires: value[0],
      optimates: political.optimates,
      moderates: political.moderates
    });
  };

  const handleOptimatesChange = (value: number[]) => {
    onUpdate({
      populaires: political.populaires,
      optimates: value[0],
      moderates: political.moderates
    });
  };

  const handleModeratesChange = (value: number[]) => {
    onUpdate({
      populaires: political.populaires,
      optimates: political.optimates,
      moderates: value[0]
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre politique</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Populares</label>
              <span className="text-sm">{political.populaires}%</span>
            </div>
            <Slider
              defaultValue={[political.populaires]}
              max={100}
              min={0}
              step={1}
              onValueChange={handlePopulairesChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Optimates</label>
              <span className="text-sm">{political.optimates}%</span>
            </div>
            <Slider
              defaultValue={[political.optimates]}
              max={100}
              min={0}
              step={1}
              onValueChange={handleOptimatesChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Modérés</label>
              <span className="text-sm">{political.moderates}%</span>
            </div>
            <Slider
              defaultValue={[political.moderates]}
              max={100}
              min={0}
              step={1}
              onValueChange={handleModeratesChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
