
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Users } from 'lucide-react';

interface SocialTensionsProps {
  values: {
    patricians: number;
    plebeians: number;
    slaves: number;
    cohesion: number;
  };
  onChange: (key: string, value: number) => void;
}

export const SocialTensions: React.FC<SocialTensionsProps> = ({ values, onChange }) => {
  // Calcul de la tension sociale basée sur l'écart entre patriciens et plébéiens et la cohésion
  const calculateTension = () => {
    const classDifference = Math.abs(values.patricians - values.plebeians);
    const cohesionFactor = 100 - values.cohesion;
    
    // Formule: (Différence de classe × 0.7 + Facteur de faible cohésion × 0.3) / 100
    const tension = (classDifference * 0.7 + cohesionFactor * 0.3) / 100;
    
    return tension;
  };
  
  const socialTension = calculateTension();
  
  const getTensionStatus = () => {
    if (socialTension < 0.3) return { label: "Faible", color: "bg-green-500" };
    if (socialTension < 0.6) return { label: "Modérée", color: "bg-yellow-500" };
    return { label: "Élevée", color: "bg-red-500" };
  };
  
  const tensionStatus = getTensionStatus();
  
  return (
    <Card className="p-4">
      <CardContent className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Tensions sociales</h3>
          <Badge className={tensionStatus.color}>
            Tension: {tensionStatus.label}
          </Badge>
        </div>
        
        <div className="grid gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="patricians">Satisfaction des Patriciens</Label>
              <span className="text-sm font-medium">{values.patricians}%</span>
            </div>
            <Slider 
              id="patricians"
              value={[values.patricians]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('patricians', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              Le niveau de contentement des élites patriciennes de Rome
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="plebeians">Satisfaction des Plébéiens</Label>
              <span className="text-sm font-medium">{values.plebeians}%</span>
            </div>
            <Slider 
              id="plebeians"
              value={[values.plebeians]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('plebeians', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              Le niveau de contentement des citoyens plébéiens de Rome
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="slaves">Condition des Esclaves</Label>
              <span className="text-sm font-medium">{values.slaves}%</span>
            </div>
            <Slider 
              id="slaves"
              value={[values.slaves]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('slaves', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              Les conditions de vie et le traitement des esclaves
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="cohesion">Cohésion Sociale</Label>
              <span className="text-sm font-medium">{values.cohesion}%</span>
            </div>
            <Slider 
              id="cohesion"
              value={[values.cohesion]} 
              max={100} 
              step={1}
              onValueChange={(value) => onChange('cohesion', value[0])}
            />
            <p className="text-sm text-muted-foreground">
              L'unité et la solidarité entre les différents groupes sociaux
            </p>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className={`rounded-md p-4 border ${
          socialTension < 0.3 ? "bg-green-50 border-green-200 text-green-700" :
          socialTension < 0.6 ? "bg-amber-50 border-amber-200 text-amber-700" :
          "bg-red-50 border-red-200 text-red-700"
        }`}>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium mb-1">Risque de troubles sociaux</h4>
              <p className="text-sm">
                {socialTension < 0.3 
                  ? "La situation sociale est stable et équilibrée. Les tensions entre patriciens et plébéiens sont minimes."
                  : socialTension < 0.6 
                    ? "Des tensions existent entre les classes sociales. Une surveillance est recommandée pour éviter les débordements."
                    : "La situation sociale est critique. Des troubles, voire une révolte, pourraient éclater si des mesures ne sont pas prises rapidement."}
              </p>
            </div>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};
