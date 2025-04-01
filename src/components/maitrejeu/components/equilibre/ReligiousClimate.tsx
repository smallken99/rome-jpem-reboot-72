
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ReligiousClimateProps {
  values: {
    piety: number;
    traditions: number;
    superstition: number;
  };
  onChange: (key: string, value: number) => void;
}

export const ReligiousClimate: React.FC<ReligiousClimateProps> = ({ values, onChange }) => {
  return (
    <Card className="p-4">
      <CardContent className="space-y-6 pt-4">
        <h3 className="text-lg font-medium mb-4">Climat religieux</h3>
        
        <div className="grid gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="piety">Piété publique</Label>
              <span className="text-sm font-medium">{values.piety}%</span>
            </div>
            <Slider 
              id="piety"
              value={[values.piety]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('piety', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              L'importance de la religion dans la vie publique et politique
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="traditions">Respect des traditions</Label>
              <span className="text-sm font-medium">{values.traditions}%</span>
            </div>
            <Slider 
              id="traditions"
              value={[values.traditions]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('traditions', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              L'attachement aux rites et pratiques religieuses traditionnelles
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="superstition">Superstition</Label>
              <span className="text-sm font-medium">{values.superstition}%</span>
            </div>
            <Slider 
              id="superstition"
              value={[values.superstition]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('superstition', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              La tendance à interpréter les présages et à croire aux interventions divines
            </p>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
          <h4 className="text-sm font-medium text-amber-800 mb-2">Impact religieux</h4>
          <p className="text-sm text-amber-700">
            {values.piety > 70 && values.traditions > 70 
              ? "Les dieux sont favorables à Rome. Les présages sont bons et la population est confiante dans la protection divine."
              : values.piety < 30 || values.traditions < 30
                ? "Les dieux semblent avoir abandonné Rome. Les prêtres signalent des présages inquiétants et le peuple craint la colère divine."
                : "La situation religieuse est stable. Les temples fonctionnent normalement et les rites sont observés sans perturbation majeure."}
          </p>
        </div>
        
      </CardContent>
    </Card>
  );
};
