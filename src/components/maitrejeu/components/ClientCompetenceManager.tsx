
import React, { useState } from 'react';
import { useMaitreJeu } from '../context';
import { Client } from '../types/clients';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, Plus, ArrowRight } from 'lucide-react';

interface ClientCompetenceManagerProps {
  client: Client;
  onClose: () => void;
}

export const ClientCompetenceManager: React.FC<ClientCompetenceManagerProps> = ({ client, onClose }) => {
  const [availablePoints, setAvailablePoints] = useState(client.competencePoints || 3);
  const [newCompetence, setNewCompetence] = useState('');
  const [competences, setCompetences] = useState<string[]>(client.competences || []);
  const { updateClient } = useMaitreJeu();
  
  const handleAddCompetence = () => {
    if (!newCompetence || availablePoints <= 0) return;
    
    const updatedCompetences = [...competences, newCompetence];
    setCompetences(updatedCompetences);
    setAvailablePoints(prev => prev - 1);
    setNewCompetence('');
  };
  
  const handleRemoveCompetence = (index: number) => {
    const newCompetences = [...competences];
    newCompetences.splice(index, 1);
    setCompetences(newCompetences);
    setAvailablePoints(prev => prev + 1);
  };
  
  const handleSave = () => {
    // Update the client with new competences - fix function call parameter count
    updateClient(client.id, {
      competences,
      competencePoints: availablePoints
    });
    onClose();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Compétences de {client.name}</h2>
        <Badge variant="outline" className="ml-2">
          Points: {availablePoints}
        </Badge>
      </div>
      
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Nouvelle compétence..."
          value={newCompetence}
          onChange={(e) => setNewCompetence(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={handleAddCompetence}
          disabled={availablePoints <= 0 || !newCompetence}
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" /> Ajouter
        </Button>
      </div>
      
      <ScrollArea className="h-[200px] border rounded-md p-4">
        <div className="space-y-2">
          {competences.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune compétence</p>
          ) : (
            competences.map((comp, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{comp}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveCompetence(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={handleSave}>
          Sauvegarder <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
