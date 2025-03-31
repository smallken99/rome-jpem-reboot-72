
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { Client } from '../types/clients';
import { Plus, Minus, X } from 'lucide-react';

interface ClientCompetenceManagerProps {
  client: Client;
  onClose: () => void;
}

export const ClientCompetenceManager: React.FC<ClientCompetenceManagerProps> = ({ client, onClose }) => {
  const { adjustCompetencePoints } = useMaitreJeu();
  
  // Initialize competences object if it doesn't exist
  const initialCompetences = client.competences || {};
  const [competences, setCompetences] = useState<Record<string, number>>(initialCompetences);
  const [newCompetence, setNewCompetence] = useState('');
  const [newValue, setNewValue] = useState(1);
  const [availablePoints, setAvailablePoints] = useState(client.competencePoints || 3);
  
  // Update a competence value
  const handleUpdateCompetence = (competence: string, value: number) => {
    const currentValue = competences[competence] || 0;
    const delta = value - currentValue;
    
    // Check if we're trying to decrease below 0
    if (value < 0) return;
    
    // Check if we have enough points when increasing
    if (delta > 0 && delta > availablePoints) return;
    
    // Update the competence
    setCompetences(prev => ({
      ...prev,
      [competence]: value
    }));
    
    // Update available points
    setAvailablePoints(prev => prev - delta);
  };
  
  // Add a new competence
  const handleAddCompetence = () => {
    if (!newCompetence.trim() || availablePoints < newValue) return;
    
    // Update the competences
    setCompetences(prev => ({
      ...prev,
      [newCompetence.trim()]: newValue
    }));
    
    // Update available points
    setAvailablePoints(prev => prev - newValue);
    
    // Reset the form
    setNewCompetence('');
    setNewValue(1);
  };
  
  // Remove a competence
  const handleRemoveCompetence = (competence: string) => {
    const value = competences[competence] || 0;
    
    // Update the competences (create a new object without the removed competence)
    const updatedCompetences = { ...competences };
    delete updatedCompetences[competence];
    setCompetences(updatedCompetences);
    
    // Restore the points
    setAvailablePoints(prev => prev + value);
  };
  
  // Save all competences
  const handleSaveAll = () => {
    // For each competence in the state, update it in the client
    Object.entries(competences).forEach(([competence, value]) => {
      adjustCompetencePoints(client.id, competence, value);
    });
    
    onClose();
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Compétences de {client.name}</span>
          <Badge variant="outline" className="ml-2">
            {availablePoints} points disponibles
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* List of current competences */}
          <div className="space-y-2">
            {Object.entries(competences).map(([competence, value]) => (
              <div key={competence} className="flex items-center justify-between p-2 border rounded">
                <span className="font-medium">{competence}</span>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleUpdateCompetence(competence, value - 1)}
                    disabled={value <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{value}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleUpdateCompetence(competence, value + 1)}
                    disabled={availablePoints <= 0}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveCompetence(competence)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add new competence form */}
          <div className="flex space-x-2 items-end">
            <div className="flex-grow">
              <Label htmlFor="newCompetence">Nouvelle compétence</Label>
              <Input 
                id="newCompetence" 
                value={newCompetence} 
                onChange={(e) => setNewCompetence(e.target.value)} 
                placeholder="Ex: Diplomatie"
              />
            </div>
            <div className="w-24">
              <Label htmlFor="newValue">Valeur</Label>
              <Input 
                id="newValue" 
                type="number" 
                min="1" 
                max={availablePoints.toString()} 
                value={newValue} 
                onChange={(e) => setNewValue(parseInt(e.target.value) || 1)} 
              />
            </div>
            <Button 
              onClick={handleAddCompetence}
              disabled={!newCompetence.trim() || availablePoints < newValue}
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </div>
          
          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSaveAll}>
              Sauvegarder
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
