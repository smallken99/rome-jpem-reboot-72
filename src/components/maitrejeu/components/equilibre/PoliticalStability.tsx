
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface PoliticalStabilityProps {
  values: {
    popularesInfluence: number;
    optimatesInfluence: number;
    moderatesInfluence: number;
    senateAuthority: number;
    plebeianTribunes: number;
    lawsRespect: number;
  };
  onChange: (key: string, value: number) => void;
}

export const PoliticalStability: React.FC<PoliticalStabilityProps> = ({ values, onChange }) => {
  return (
    <Card className="p-4">
      <CardContent className="space-y-6 pt-4">
        <h3 className="text-lg font-medium mb-4">Équilibre politique</h3>
        
        <div className="grid gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="popularesInfluence">Influence des Populares</Label>
              <span className="text-sm font-medium">{values.popularesInfluence}%</span>
            </div>
            <Slider 
              id="popularesInfluence"
              value={[values.popularesInfluence]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('popularesInfluence', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              Représente l'influence des factions populaires au sein du Sénat
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="optimatesInfluence">Influence des Optimates</Label>
              <span className="text-sm font-medium">{values.optimatesInfluence}%</span>
            </div>
            <Slider 
              id="optimatesInfluence"
              value={[values.optimatesInfluence]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('optimatesInfluence', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              Représente l'influence des factions aristocratiques au sein du Sénat
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="moderatesInfluence">Influence des Modérés</Label>
              <span className="text-sm font-medium">{values.moderatesInfluence}%</span>
            </div>
            <Slider 
              id="moderatesInfluence"
              value={[values.moderatesInfluence]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('moderatesInfluence', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              Représente l'influence des factions centristes au sein du Sénat
            </p>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <h3 className="text-lg font-medium mb-4">Institutions</h3>
        
        <div className="grid gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="senateAuthority">Autorité du Sénat</Label>
              <span className="text-sm font-medium">{values.senateAuthority}%</span>
            </div>
            <Slider 
              id="senateAuthority"
              value={[values.senateAuthority]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('senateAuthority', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              L'efficacité et le respect des décisions du Sénat
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="plebeianTribunes">Tribuns de la Plèbe</Label>
              <span className="text-sm font-medium">{values.plebeianTribunes}%</span>
            </div>
            <Slider 
              id="plebeianTribunes"
              value={[values.plebeianTribunes]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('plebeianTribunes', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              Le pouvoir et l'influence des tribuns de la plèbe
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="lawsRespect">Respect des Lois</Label>
              <span className="text-sm font-medium">{values.lawsRespect}%</span>
            </div>
            <Slider 
              id="lawsRespect"
              value={[values.lawsRespect]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('lawsRespect', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              Le niveau général de respect des lois et de l'ordre public
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
