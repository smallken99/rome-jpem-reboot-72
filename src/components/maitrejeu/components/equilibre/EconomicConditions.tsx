
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface EconomicConditionsProps {
  values: {
    stability: number;
    growth: number;
    commerce: number;
    agriculture: number;
  };
  onChange: (key: string, value: number) => void;
}

export const EconomicConditions: React.FC<EconomicConditionsProps> = ({ values, onChange }) => {
  return (
    <Card className="p-4">
      <CardContent className="space-y-6 pt-4">
        <h3 className="text-lg font-medium mb-4">Conditions économiques</h3>
        
        <div className="grid gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="stability">Stabilité économique</Label>
              <span className="text-sm font-medium">{values.stability}%</span>
            </div>
            <Slider 
              id="stability"
              value={[values.stability]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('stability', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              La solidité et la prévisibilité de l'économie romaine
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="growth">Croissance économique</Label>
              <span className="text-sm font-medium">{values.growth}%</span>
            </div>
            <Slider 
              id="growth"
              value={[values.growth]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('growth', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              Le taux de développement économique et d'expansion des activités
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="commerce">Activité commerciale</Label>
              <span className="text-sm font-medium">{values.commerce}%</span>
            </div>
            <Slider 
              id="commerce"
              value={[values.commerce]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('commerce', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              L'intensité des échanges commerciaux et le volume des transactions
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="agriculture">Production agricole</Label>
              <span className="text-sm font-medium">{values.agriculture}%</span>
            </div>
            <Slider 
              id="agriculture"
              value={[values.agriculture]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('agriculture', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              La santé du secteur agricole et le niveau des récoltes
            </p>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Prospérité publique</h4>
          <p className="text-sm text-blue-700">
            {(values.stability + values.growth + values.commerce + values.agriculture) / 4 > 70
              ? "L'économie romaine est florissante. Le trésor public est bien garni et les citoyens profitent de la prospérité générale."
              : (values.stability + values.growth + values.commerce + values.agriculture) / 4 < 30
                ? "L'économie romaine traverse une crise grave. La pauvreté se répand et le trésor public est menacé."
                : "L'économie romaine est stable mais présente des fragilités. Les revenus publics sont suffisants pour couvrir les dépenses courantes."}
          </p>
        </div>
        
      </CardContent>
    </Card>
  );
};
