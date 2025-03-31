
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { Client } from '../types/clients';

interface ClientCompetenceManagerProps {
  client: Client;
  onClose: () => void;
}

export const ClientCompetenceManager: React.FC<ClientCompetenceManagerProps> = ({ client, onClose }) => {
  const { adjustCompetencePoints, updateSpecialAbilities } = useMaitreJeu();
  const [points, setPoints] = useState<Record<string, number>>({
    diplomacy: client.competences?.diplomacy || 0,
    intrigue: client.competences?.intrigue || 0,
    combat: client.competences?.combat || 0,
    commerce: client.competences?.commerce || 0,
    scholarship: client.competences?.scholarship || 0,
  });
  
  const [specialAbilities, setSpecialAbilities] = useState<string[]>(
    client.specialAbilities || []
  );
  
  const [availablePoints, setAvailablePoints] = useState(
    client.competencePoints || 10
  );
  
  const handlePointsChange = (skill: string, value: number[]) => {
    const newValue = value[0];
    const oldValue = points[skill];
    const pointsChange = newValue - oldValue;
    
    // Check if player has enough points
    if (availablePoints - pointsChange < 0) {
      return;
    }
    
    setPoints({
      ...points,
      [skill]: newValue,
    });
    
    setAvailablePoints(availablePoints - pointsChange);
  };
  
  const handleToggleAbility = (ability: string) => {
    if (specialAbilities.includes(ability)) {
      setSpecialAbilities(specialAbilities.filter(a => a !== ability));
    } else {
      setSpecialAbilities([...specialAbilities, ability]);
    }
  };
  
  const handleSave = () => {
    // Call the context methods with the right number of arguments
    adjustCompetencePoints(client.id, client.competencePoints || 0, availablePoints);
    updateSpecialAbilities(client.id, specialAbilities);
    onClose();
  };
  
  // Predefined abilities
  const availableAbilities = [
    "Réseau commercial", 
    "Espionnage", 
    "Ami du Sénat", 
    "Maître d'armes", 
    "Érudit", 
    "Orateur", 
    "Conspirateur", 
    "Négociateur",
    "Diplomate"
  ];
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{client.name}</h2>
        <p className="text-sm text-muted-foreground">
          Gérez les compétences et capacités spéciales
        </p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm">Compétences</CardTitle>
            <Badge variant="outline" className={availablePoints > 0 ? "bg-blue-50 text-blue-700" : "bg-gray-100"}>
              Points disponibles: {availablePoints}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="diplomacy">Diplomatie</Label>
                <span className="text-sm font-medium">{points.diplomacy}</span>
              </div>
              <Slider
                id="diplomacy"
                min={0}
                max={10}
                step={1}
                value={[points.diplomacy]}
                onValueChange={(value) => handlePointsChange('diplomacy', value)}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="intrigue">Intrigue</Label>
                <span className="text-sm font-medium">{points.intrigue}</span>
              </div>
              <Slider
                id="intrigue"
                min={0}
                max={10}
                step={1}
                value={[points.intrigue]}
                onValueChange={(value) => handlePointsChange('intrigue', value)}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="combat">Combat</Label>
                <span className="text-sm font-medium">{points.combat}</span>
              </div>
              <Slider
                id="combat"
                min={0}
                max={10}
                step={1}
                value={[points.combat]}
                onValueChange={(value) => handlePointsChange('combat', value)}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="commerce">Commerce</Label>
                <span className="text-sm font-medium">{points.commerce}</span>
              </div>
              <Slider
                id="commerce"
                min={0}
                max={10}
                step={1}
                value={[points.commerce]}
                onValueChange={(value) => handlePointsChange('commerce', value)}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="scholarship">Érudition</Label>
                <span className="text-sm font-medium">{points.scholarship}</span>
              </div>
              <Slider
                id="scholarship"
                min={0}
                max={10}
                step={1}
                value={[points.scholarship]}
                onValueChange={(value) => handlePointsChange('scholarship', value)}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Capacités spéciales</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {availableAbilities.map((ability) => (
              <Badge
                key={ability}
                variant={specialAbilities.includes(ability) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleToggleAbility(ability)}
              >
                {ability}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={handleSave}>
          Sauvegarder
        </Button>
      </div>
    </div>
  );
};
