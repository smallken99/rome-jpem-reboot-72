
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useMaitreJeu } from '../context';
import { Client } from '../types/clients';

interface ClientCompetenceManagerProps {
  client: Client;
  onClose: () => void;
}

export const ClientCompetenceManager: React.FC<ClientCompetenceManagerProps> = ({ client, onClose }) => {
  const { adjustCompetencePoints } = useMaitreJeu();
  
  // Initialize competences if they don't exist
  const initialCompetences = client.competences || {
    diplomatie: 1,
    guerre: 1,
    administration: 1,
    eloquence: 1,
    intrigues: 1
  };
  
  const [competences, setCompetences] = useState<Record<string, number>>(initialCompetences);
  const [newCompetence, setNewCompetence] = useState('');
  const [pointsToAdd, setPointsToAdd] = useState(1);
  
  const handleUpdateCompetence = (name: string, value: number) => {
    setCompetences(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddCompetence = () => {
    if (!newCompetence.trim()) return;
    
    setCompetences(prev => ({
      ...prev,
      [newCompetence]: 1
    }));
    
    setNewCompetence('');
  };
  
  const handleSave = () => {
    // Convert the clientId to string if it's a number
    const clientId = typeof client.id === 'number' ? client.id.toString() : client.id;
    
    // Update each competence
    Object.entries(competences).forEach(([name, value]) => {
      const valueAsString = value.toString();
      adjustCompetencePoints(clientId, valueAsString);
    });
    
    onClose();
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">Compétences de {client.name}</h2>
      
      <div className="grid gap-4">
        {Object.entries(competences).map(([name, value]) => (
          <div key={name} className="space-y-2">
            <div className="flex justify-between">
              <Label>{name}</Label>
              <span className="text-sm">{value}</span>
            </div>
            <Slider
              defaultValue={[value]}
              max={10}
              step={1}
              onValueChange={(values) => handleUpdateCompetence(name, values[0])}
            />
          </div>
        ))}
      </div>
      
      <div className="flex space-x-2 pt-4">
        <Input
          placeholder="Nouvelle compétence"
          value={newCompetence}
          onChange={(e) => setNewCompetence(e.target.value)}
        />
        <Button variant="outline" onClick={handleAddCompetence}>+</Button>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>Annuler</Button>
        <Button onClick={handleSave}>Sauvegarder</Button>
      </div>
    </div>
  );
};
