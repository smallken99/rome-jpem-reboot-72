
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { Client } from '../types/clients';

interface ClientCompetenceManagerProps {
  client: Client;
  onClose: () => void;
}

export const ClientCompetenceManager: React.FC<ClientCompetenceManagerProps> = ({
  client,
  onClose
}) => {
  const { updateSpecialAbilities, adjustCompetencePoints } = useMaitreJeu();
  
  const [abilities, setAbilities] = useState<string[]>(client.specialAbilities || []);
  const [newAbility, setNewAbility] = useState('');
  const [points, setPoints] = useState(client.competencePoints);
  
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
    updateSpecialAbilities(client.id, abilities);
    
    const pointsDiff = points - client.competencePoints;
    if (pointsDiff !== 0) {
      adjustCompetencePoints(client.id, pointsDiff);
    }
    
    onClose();
  };
  
  return (
    <div className="space-y-4">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Gérer les compétences de {client.name}</CardTitle>
        <CardDescription>
          Ajoutez ou supprimez des capacités spéciales et ajustez les points de compétence
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-0 pb-0">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Points de compétence</label>
            <div className="flex items-center space-x-2 mt-1">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setPoints(Math.max(0, points - 1))}
              >
                <span className="font-bold">-</span>
              </Button>
              <Input
                type="number"
                min={0}
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                className="w-16 text-center"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setPoints(points + 1)}
              >
                <span className="font-bold">+</span>
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Capacités spéciales</label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="Nouvelle capacité..."
                value={newAbility}
                onChange={(e) => setNewAbility(e.target.value)}
              />
              <Button type="button" onClick={handleAddAbility}>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {abilities.map((ability, index) => (
                <Badge variant="secondary" key={index} className="p-1 pl-2">
                  {ability}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-5 w-5 p-0 ml-1" 
                    onClick={() => handleRemoveAbility(ability)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {abilities.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucune capacité spéciale</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </div>
      </CardContent>
    </div>
  );
};
