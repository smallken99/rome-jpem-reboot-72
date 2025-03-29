
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PoliticalBalanceCardProps } from '../../types/equilibre';

export const PoliticalBalanceCard: React.FC<PoliticalBalanceCardProps> = ({ 
  equilibre, 
  onUpdate 
}) => {
  const [populaires, setPopulaires] = useState(equilibre.populaires);
  const [optimates, setOptimates] = useState(equilibre.optimates);
  const [moderates, setModerates] = useState(equilibre.moderates);
  const [isEditing, setIsEditing] = useState(false);
  
  const totalBalance = populaires + optimates + moderates;
  
  const handleSave = () => {
    onUpdate(populaires, optimates, moderates);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setPopulaires(equilibre.populaires);
    setOptimates(equilibre.optimates);
    setModerates(equilibre.moderates);
    setIsEditing(false);
  };
  
  const getStatusColor = (value: number) => {
    if (value > 60) return 'bg-green-100 text-green-800 border-green-300';
    if (value > 40) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (value > 20) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Équilibre Politique du Sénat</CardTitle>
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
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className={`px-2 py-1 rounded border ${getStatusColor(populaires)}`}>
                {populaires}%
              </div>
              <span className="text-sm mt-1 font-medium">Populaires</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`px-2 py-1 rounded border ${getStatusColor(optimates)}`}>
                {optimates}%
              </div>
              <span className="text-sm mt-1 font-medium">Optimates</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`px-2 py-1 rounded border ${getStatusColor(moderates)}`}>
                {moderates}%
              </div>
              <span className="text-sm mt-1 font-medium">Modérés</span>
            </div>
          </div>
          
          {isEditing && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Populaires</label>
                  <span className="text-sm">{populaires}%</span>
                </div>
                <Slider 
                  defaultValue={[populaires]} 
                  max={100}
                  step={1}
                  onValueChange={(v) => setPopulaires(v[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Optimates</label>
                  <span className="text-sm">{optimates}%</span>
                </div>
                <Slider 
                  defaultValue={[optimates]} 
                  max={100}
                  step={1}
                  onValueChange={(v) => setOptimates(v[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Modérés</label>
                  <span className="text-sm">{moderates}%</span>
                </div>
                <Slider 
                  defaultValue={[moderates]} 
                  max={100}
                  step={1}
                  onValueChange={(v) => setModerates(v[0])}
                />
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-medium">Total</span>
                <Badge variant={totalBalance === 100 ? 'default' : 'destructive'}>
                  {totalBalance}%
                </Badge>
              </div>
              {totalBalance !== 100 && (
                <p className="text-xs text-red-500">Le total doit être égal à 100%</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
