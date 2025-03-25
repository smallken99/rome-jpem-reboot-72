
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Undo2, Save, Swords, Shield, Flag } from 'lucide-react';
import { Equilibre } from '@/components/maitrejeu/types/equilibre';
import Chart from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

interface MilitaryLoyaltyProps {
  equilibre: Equilibre;
  onUpdate: (armée: number, loyauté: number, morale: number) => void;
}

export const MilitaryLoyalty: React.FC<MilitaryLoyaltyProps> = ({
  equilibre,
  onUpdate
}) => {
  const [armée, setArmée] = useState(equilibre.armée);
  const [loyauté, setLoyauté] = useState(equilibre.loyauté);
  const [morale, setMorale] = useState(equilibre.morale);
  const [hasChanges, setHasChanges] = useState(false);
  
  const handleArméeChange = (values: number[]) => {
    setArmée(values[0]);
    setHasChanges(true);
  };
  
  const handleLoyautéChange = (values: number[]) => {
    setLoyauté(values[0]);
    setHasChanges(true);
  };
  
  const handleMoraleChange = (values: number[]) => {
    setMorale(values[0]);
    setHasChanges(true);
  };
  
  const handleSave = () => {
    onUpdate(armée, loyauté, morale);
    setHasChanges(false);
  };
  
  const handleReset = () => {
    setArmée(equilibre.armée);
    setLoyauté(equilibre.loyauté);
    setMorale(equilibre.morale);
    setHasChanges(false);
  };
  
  const chartData = [
    { name: 'Force', value: armée },
    { name: 'Loyauté', value: loyauté },
    { name: 'Moral', value: morale }
  ];
  
  const historyData = [
    { name: 'Printemps', Loyauté: 60, Moral: 55, Force: 65 },
    { name: 'Été', Loyauté: 65, Moral: 60, Force: 68 },
    { name: 'Automne', Loyauté: 70, Moral: 55, Force: 70 },
    { name: 'Hiver', Loyauté: 75, Moral: 60, Force: 70 }
  ];
  
  const getMilitaryStatus = () => {
    const average = (armée + loyauté + morale) / 3;
    
    if (average >= 80) {
      return {
        status: "Excellente",
        color: "bg-green-100 text-green-800 border-green-200",
        description: "Les légions sont puissantes, loyales et le moral est au plus haut."
      };
    } else if (average >= 65) {
      return {
        status: "Bonne",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        description: "L'armée romaine est en bonne condition et prête au combat."
      };
    } else if (average >= 50) {
      return {
        status: "Correcte",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        description: "L'armée est fonctionnelle mais présente quelques faiblesses."
      };
    } else if (average >= 35) {
      return {
        status: "Préoccupante",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        description: "Des problèmes sérieux affectent les légions romaines."
      };
    } else {
      return {
        status: "Critique",
        color: "bg-red-100 text-red-800 border-red-200",
        description: "L'armée est dans un état critique et vulnérable."
      };
    }
  };
  
  const militaryStatus = getMilitaryStatus();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Loyauté Militaire</CardTitle>
          <CardDescription>
            Gérez la force, la loyauté et le moral des légions romaines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Swords className="h-4 w-4 mr-2 text-red-500" />
                  <label className="text-sm font-medium">Force militaire</label>
                </div>
                <span className="text-sm">{armée}%</span>
              </div>
              <Slider 
                value={[armée]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={handleArméeChange} 
                className="[&>span]:bg-red-400"
              />
              <p className="text-sm text-muted-foreground">
                Puissance et préparation des légions pour le combat.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Flag className="h-4 w-4 mr-2 text-blue-500" />
                  <label className="text-sm font-medium">Loyauté</label>
                </div>
                <span className="text-sm">{loyauté}%</span>
              </div>
              <Slider 
                value={[loyauté]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={handleLoyautéChange} 
                className="[&>span]:bg-blue-400"
              />
              <p className="text-sm text-muted-foreground">
                Fidélité des légions envers le Sénat et les magistrats élus.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  <label className="text-sm font-medium">Moral</label>
                </div>
                <span className="text-sm">{morale}%</span>
              </div>
              <Slider 
                value={[morale]} 
                min={0} 
                max={100} 
                step={1} 
                onValueChange={handleMoraleChange} 
                className="[&>span]:bg-green-400"
              />
              <p className="text-sm text-muted-foreground">
                Motivation et cohésion des soldats dans les légions.
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
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>État Militaire Actuel</CardTitle>
              <Badge variant="outline" className={`${militaryStatus.color}`}>
                {militaryStatus.status}
              </Badge>
            </div>
            <CardDescription>
              {militaryStatus.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart 
              data={chartData} 
              type="bar" 
              height={200} 
              colors={['#ef4444', '#3b82f6', '#84cc16']}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Évolution Récente</CardTitle>
            <CardDescription>
              Tendances militaires des dernières saisons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart 
              data={historyData} 
              type="line" 
              dataKey="Loyauté"
              height={200} 
            >
              <Line 
                type="monotone" 
                dataKey="Loyauté" 
                stroke="#3b82f6" 
              />
              <Line 
                type="monotone" 
                dataKey="Moral" 
                stroke="#84cc16" 
              />
              <Line 
                type="monotone" 
                dataKey="Force" 
                stroke="#ef4444" 
              />
            </Chart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
