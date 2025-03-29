
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { EconomicStabilityCardProps } from '../../types/equilibre';

export const EconomicStabilityCard: React.FC<EconomicStabilityCardProps> = ({ 
  equilibre, 
  onUpdate 
}) => {
  const [economie, setEconomie] = useState(equilibre.economie);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = () => {
    onUpdate(economie);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEconomie(equilibre.economie);
    setIsEditing(false);
  };
  
  const getStatusText = (value: number) => {
    if (value > 80) return "Prospère";
    if (value > 60) return "Stable";
    if (value > 40) return "Modérée";
    if (value > 20) return "Difficile";
    return "En crise";
  };
  
  const getStatusColor = (value: number) => {
    if (value > 80) return "text-green-600";
    if (value > 60) return "text-green-500";
    if (value > 40) return "text-yellow-500";
    if (value > 20) return "text-orange-500";
    return "text-red-500";
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Stabilité Économique</CardTitle>
          {!isEditing ? (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              Modifier
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
              <Button size="sm" onClick={handleSave}>
                Enregistrer
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold">
              {economie}%
            </div>
            <div className={`text-sm mt-1 font-medium ${getStatusColor(economie)}`}>
              {getStatusText(economie)}
            </div>
          </div>
          
          {isEditing && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Indice économique</label>
                  <span className="text-sm">{economie}%</span>
                </div>
                <Slider 
                  defaultValue={[economie]} 
                  max={100}
                  step={1}
                  onValueChange={(v) => setEconomie(v[0])}
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Ajustez l'indice économique de la République romaine. Cet indice reflète la stabilité et la prospérité économique générale.</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
