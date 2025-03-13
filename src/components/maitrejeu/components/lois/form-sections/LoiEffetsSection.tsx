
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LoiEffetsSectionProps {
  effets: Record<string, any> | string[];
  updateEffet: (key: string, value: number) => void;
}

export const LoiEffetsSection: React.FC<LoiEffetsSectionProps> = ({ effets, updateEffet }) => {
  // Check if effets is an object or array
  const isObject = !Array.isArray(effets);

  const getEffetValue = (key: string): number => {
    if (isObject) {
      return (effets as Record<string, any>)[key] || 0;
    }
    return 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Effets de la loi</CardTitle>
        <CardDescription>Définissez l'impact de la loi sur différents aspects de la République</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Stabilité politique</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[getEffetValue('stabilité')]}
              min={-10}
              max={10}
              step={1}
              onValueChange={(value) => updateEffet('stabilité', value[0])}
              className="flex-1"
            />
            <span className="w-10 text-center font-semibold">{getEffetValue('stabilité')}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Popularité auprès du peuple</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[getEffetValue('popularité')]}
              min={-10}
              max={10}
              step={1}
              onValueChange={(value) => updateEffet('popularité', value[0])}
              className="flex-1"
            />
            <span className="w-10 text-center font-semibold">{getEffetValue('popularité')}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Corruption</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[getEffetValue('corruption')]}
              min={-10}
              max={10}
              step={1}
              onValueChange={(value) => updateEffet('corruption', value[0])}
              className="flex-1"
            />
            <span className="w-10 text-center font-semibold">{getEffetValue('corruption')}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Efficacité administrative</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[getEffetValue('efficacité')]}
              min={-10}
              max={10}
              step={1}
              onValueChange={(value) => updateEffet('efficacité', value[0])}
              className="flex-1"
            />
            <span className="w-10 text-center font-semibold">{getEffetValue('efficacité')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
