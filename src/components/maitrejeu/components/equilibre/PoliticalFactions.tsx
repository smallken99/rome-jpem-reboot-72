
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Undo2, Save } from 'lucide-react';
import { Equilibre } from '@/components/maitrejeu/types/equilibre';
import Chart from '@/components/ui/chart';

interface PoliticalFactionsProps {
  equilibre: Equilibre;
  onUpdate: (populares: number, optimates: number, moderates: number) => void;
}

export const PoliticalFactions: React.FC<PoliticalFactionsProps> = ({ 
  equilibre,
  onUpdate
}) => {
  const [populares, setPopulares] = useState(equilibre.populares);
  const [optimates, setOptimates] = useState(equilibre.optimates);
  const [moderates, setModerates] = useState(equilibre.moderates);
  const [hasChanges, setHasChanges] = useState(false);
  
  const handlePopularesChange = (values: number[]) => {
    setPopulares(values[0]);
    setHasChanges(true);
  };
  
  const handleOptimatesChange = (values: number[]) => {
    setOptimates(values[0]);
    setHasChanges(true);
  };
  
  const handleModeratesChange = (values: number[]) => {
    setModerates(values[0]);
    setHasChanges(true);
  };
  
  const handleSave = () => {
    onUpdate(populares, optimates, moderates);
    setHasChanges(false);
  };
  
  const handleReset = () => {
    setPopulares(equilibre.populares);
    setOptimates(equilibre.optimates);
    setModerates(equilibre.moderates);
    setHasChanges(false);
  };
  
  const chartData = [
    { name: 'Populares', value: populares, color: '#ef4444' },
    { name: 'Optimates', value: optimates, color: '#3b82f6' },
    { name: 'Modérés', value: moderates, color: '#84cc16' }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Équilibre des Factions</CardTitle>
          <CardDescription>
            Gérez l'influence relative des principales factions politiques
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Populares</label>
                <span className="text-sm">{populares}%</span>
              </div>
              <Slider 
                value={[populares]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={handlePopularesChange} 
                className="[&>span]:bg-red-400"
              />
              <p className="text-sm text-muted-foreground">
                Faction qui défend les intérêts de la plèbe et les réformes sociales.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Optimates</label>
                <span className="text-sm">{optimates}%</span>
              </div>
              <Slider 
                value={[optimates]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={handleOptimatesChange} 
                className="[&>span]:bg-blue-400"
              />
              <p className="text-sm text-muted-foreground">
                Faction qui défend les intérêts de l'aristocratie et les traditions.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Modérés</label>
                <span className="text-sm">{moderates}%</span>
              </div>
              <Slider 
                value={[moderates]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={handleModeratesChange} 
                className="[&>span]:bg-green-400"
              />
              <p className="text-sm text-muted-foreground">
                Faction qui cherche le compromis entre Populares et Optimates.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              disabled={!hasChanges}
              className="flex items-center gap-1"
            >
              <Undo2 className="h-4 w-4" />
              Réinitialiser
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              disabled={!hasChanges}
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              Sauvegarder
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition Actuelle</CardTitle>
            <CardDescription>
              Visualisation de l'influence des factions au Sénat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart 
              data={chartData} 
              type="pie" 
              height={250} 
              colors={['#ef4444', '#3b82f6', '#84cc16']}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Impact sur la République</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-md">
              <h4 className="font-medium text-sm mb-1">Déséquilibre des factions</h4>
              <p className="text-sm text-muted-foreground">
                {Math.abs(populares - optimates) > 30 ? (
                  "Fort déséquilibre entre Populares et Optimates. Risque de tensions sociales et politiques."
                ) : Math.abs(populares - optimates) > 15 ? (
                  "Déséquilibre modéré entre Populares et Optimates. Certaines tensions sont à prévoir."
                ) : (
                  "Équilibre satisfaisant entre les factions principales."
                )}
              </p>
            </div>
            
            <div className="p-3 border rounded-md">
              <h4 className="font-medium text-sm mb-1">Influence des modérés</h4>
              <p className="text-sm text-muted-foreground">
                {moderates < 15 ? (
                  "Très faible influence des modérés. Polarisation politique dangereuse."
                ) : moderates < 30 ? (
                  "Influence limitée des modérés. Compromis difficiles au Sénat."
                ) : moderates >= 40 ? (
                  "Forte influence des modérés. Facilite les compromis politiques."
                ) : (
                  "Influence modérée des modérés. Équilibre acceptable."
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
