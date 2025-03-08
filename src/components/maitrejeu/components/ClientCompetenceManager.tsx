
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { Client } from '../types/clients';
import { ChevronUp, ChevronDown, Award, Shield, Brain } from 'lucide-react';

interface ClientCompetenceManagerProps {
  client: Client;
  onClose: () => void;
}

export const ClientCompetenceManager: React.FC<ClientCompetenceManagerProps> = ({ client, onClose }) => {
  const { updateClient, adjustCompetencePoints, updateSpecialAbilities } = useMaitreJeu();
  const [points, setPoints] = useState(client.competencePoints || 0);
  const [abilities, setAbilities] = useState<string[]>(client.specialAbilities || []);
  const [newAbility, setNewAbility] = useState('');
  
  const handlePointsChange = (amount: number) => {
    const newPoints = points + amount;
    if (newPoints >= 0) {
      setPoints(newPoints);
    }
  };
  
  const handleAddAbility = () => {
    if (newAbility.trim() && !abilities.includes(newAbility.trim())) {
      setAbilities([...abilities, newAbility.trim()]);
      setNewAbility('');
    }
  };
  
  const handleRemoveAbility = (ability: string) => {
    setAbilities(abilities.filter(a => a !== ability));
  };
  
  const handleSave = () => {
    adjustCompetencePoints(client.id, points - (client.competencePoints || 0));
    updateSpecialAbilities(client.id, abilities);
    onClose();
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          Gestion des compétences - {client.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Points de compétence</Label>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handlePointsChange(-1)}
                disabled={points <= 0}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-medium">{points}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handlePointsChange(1)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Les points de compétence permettent au client d'effectuer des actions spéciales
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Capacités spéciales</Label>
          <div className="flex gap-2">
            <Input
              value={newAbility}
              onChange={(e) => setNewAbility(e.target.value)}
              placeholder="Nouvelle capacité..."
              className="flex-1"
            />
            <Button variant="outline" onClick={handleAddAbility}>Ajouter</Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {abilities.map((ability) => (
              <Badge key={ability} className="py-1.5 flex items-center justify-between gap-2">
                <span>{ability}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 p-0 text-white/70 hover:text-white hover:bg-transparent"
                  onClick={() => handleRemoveAbility(ability)}
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {abilities.length === 0 && (
              <p className="text-sm text-muted-foreground">Aucune capacité spéciale</p>
            )}
          </div>
        </div>
        
        <div className="pt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Shield className="h-4 w-4 text-blue-500" />
            <span>Influence actuelle: {client.influences.political + client.influences.popular + client.influences.religious}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-medium">
            <Brain className="h-4 w-4 text-purple-500" />
            <span>Capacités spéciales: {abilities.length}</span>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>Sauvegarder</Button>
        </div>
      </CardContent>
    </Card>
  );
};
