
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Undo2, Save, Users, Coins, Building } from 'lucide-react';
import { Equilibre } from '@/components/maitrejeu/types/equilibre';
import Chart from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

interface SocialTensionsProps {
  equilibre: Equilibre;
  onUpdate: (patriciens: number, plébéiens: number, économie: number) => void;
}

export const SocialTensions: React.FC<SocialTensionsProps> = ({
  equilibre,
  onUpdate
}) => {
  const [patriciens, setPatriciens] = useState(equilibre.patriciens);
  const [plébéiens, setPlébéiens] = useState(equilibre.plébéiens);
  const [économie, setÉconomie] = useState(equilibre.économie);
  const [hasChanges, setHasChanges] = useState(false);
  
  const handlePatriciensChange = (values: number[]) => {
    setPatriciens(values[0]);
    setHasChanges(true);
  };
  
  const handlePlébéiensChange = (values: number[]) => {
    setPlébéiens(values[0]);
    setHasChanges(true);
  };
  
  const handleÉconomieChange = (values: number[]) => {
    setÉconomie(values[0]);
    setHasChanges(true);
  };
  
  const handleSave = () => {
    onUpdate(patriciens, plébéiens, économie);
    setHasChanges(false);
  };
  
  const handleReset = () => {
    setPatriciens(equilibre.patriciens);
    setPlébéiens(equilibre.plébéiens);
    setÉconomie(equilibre.économie);
    setHasChanges(false);
  };
  
  const chartData = [
    { name: 'Satisfaits', value: (patriciens + plébéiens) / 2 },
    { name: 'Neutres', value: 100 - (patriciens + plébéiens) / 2 - Math.abs(patriciens - plébéiens) / 2 },
    { name: 'Insatisfaits', value: Math.abs(patriciens - plébéiens) / 2 }
  ];
  
  const getSocialStatusText = () => {
    const socialGap = Math.abs(patriciens - plébéiens);
    
    if (socialGap > 30) {
      return {
        status: "Critique",
        color: "text-red-500",
        description: "Fortes tensions entre patriciens et plébéiens. Risque d'agitation sociale élevé."
      };
    } else if (socialGap > 20) {
      return {
        status: "Préoccupant",
        color: "text-amber-500",
        description: "Tensions sociales notables. La situation doit être surveillée."
      };
    } else if (socialGap > 10) {
      return {
        status: "Modéré",
        color: "text-yellow-500",
        description: "Tensions sociales modérées. La situation est sous contrôle."
      };
    } else {
      return {
        status: "Stable",
        color: "text-green-500",
        description: "Faibles tensions sociales. Bonne cohésion entre classes sociales."
      };
    }
  };
  
  const socialStatus = getSocialStatusText();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Tensions Sociales</CardTitle>
          <CardDescription>
            Gérez les relations entre les différentes classes sociales et l'économie
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-purple-500" />
                  <label className="text-sm font-medium">Patriciens</label>
                </div>
                <span className="text-sm">{patriciens}%</span>
              </div>
              <Slider 
                value={[patriciens]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={handlePatriciensChange} 
                className="[&>span]:bg-purple-400"
              />
              <p className="text-sm text-muted-foreground">
                Satisfaction et loyauté de la classe patricienne envers le pouvoir en place.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  <label className="text-sm font-medium">Plébéiens</label>
                </div>
                <span className="text-sm">{plébéiens}%</span>
              </div>
              <Slider 
                value={[plébéiens]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={handlePlébéiensChange} 
                className="[&>span]:bg-blue-400"
              />
              <p className="text-sm text-muted-foreground">
                Satisfaction de la plèbe romaine et risque de troubles sociaux.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Coins className="h-4 w-4 mr-2 text-amber-500" />
                  <label className="text-sm font-medium">Économie</label>
                </div>
                <span className="text-sm">{économie}%</span>
              </div>
              <Slider 
                value={[économie]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={handleÉconomieChange} 
                className="[&>span]:bg-amber-400"
              />
              <p className="text-sm text-muted-foreground">
                État général de l'économie romaine et prospérité des citoyens.
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
            <CardTitle>État Social Actuel</CardTitle>
            <CardDescription>
              Visualisation de la satisfaction sociale
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart 
              data={chartData} 
              type="pie" 
              height={250} 
              colors={['#22c55e', '#f59e0b', '#ef4444']}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Indicateurs Sociaux</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Écart social</span>
                <span className={`text-sm font-medium ${socialStatus.color}`}>
                  {socialStatus.status}
                </span>
              </div>
              <Progress value={Math.abs(patriciens - plébéiens)} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {socialStatus.description}
              </p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Impact économique</span>
                <span className="text-sm font-medium">
                  {économie < 30 ? "Critique" : 
                   économie < 50 ? "Faible" : 
                   économie < 70 ? "Stable" : "Excellent"}
                </span>
              </div>
              <Progress value={économie} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {économie < 30 ? 
                  "L'économie est en crise. Des réformes sont urgentes." : 
                  économie < 50 ? 
                  "L'économie est fragile. Des améliorations sont nécessaires." : 
                  économie < 70 ? 
                  "L'économie est stable mais pourrait être améliorée." : 
                  "L'économie est florissante. La République prospère."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
