
import React, { useState, useEffect } from 'react';
import { useMaitreJeu } from '../context';
import { Client } from '../types/clients';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, PlusCircle, MinusCircle } from 'lucide-react';

interface ClientCompetenceManagerProps {
  client: Client;
  onClose: () => void;
}

export const ClientCompetenceManager: React.FC<ClientCompetenceManagerProps> = ({ client, onClose }) => {
  const { updateClient } = useMaitreJeu();
  const [selectedCompetences, setSelectedCompetences] = useState<string[]>(client.competences || []);
  const [availablePoints, setAvailablePoints] = useState<number>(client.competencePoints || 0);
  const [isModified, setIsModified] = useState<boolean>(false);
  
  const allCompetences = [
    { id: 'diplomatie', name: 'Diplomatie', category: 'social', cost: 1 },
    { id: 'commerce', name: 'Commerce', category: 'economique', cost: 1 },
    { id: 'combat', name: 'Combat', category: 'militaire', cost: 1 },
    { id: 'strategie', name: 'Stratégie', category: 'militaire', cost: 2 },
    { id: 'eloquence', name: 'Éloquence', category: 'politique', cost: 1 },
    { id: 'intrigue', name: 'Intrigue', category: 'politique', cost: 2 },
    { id: 'administration', name: 'Administration', category: 'civil', cost: 1 },
    { id: 'religieux', name: 'Connaissance religieuse', category: 'religieux', cost: 1 },
    { id: 'juridique', name: 'Connaissance juridique', category: 'civil', cost: 2 },
    { id: 'navigation', name: 'Navigation', category: 'militaire', cost: 1 },
    { id: 'artisanat', name: 'Artisanat', category: 'economique', cost: 1 },
    { id: 'agriculture', name: 'Agriculture', category: 'economique', cost: 1 }
  ];
  
  const toggleCompetence = (competenceId: string, cost: number) => {
    if (selectedCompetences.includes(competenceId)) {
      setSelectedCompetences(prev => prev.filter(id => id !== competenceId));
      setAvailablePoints(prev => prev + cost);
    } else {
      if (availablePoints >= cost) {
        setSelectedCompetences(prev => [...prev, competenceId]);
        setAvailablePoints(prev => prev - cost);
      }
    }
    setIsModified(true);
  };
  
  const handleSave = () => {
    updateClient(client.id, {
      competences: selectedCompetences,
      competencePoints: availablePoints
    });
    onClose();
  };
  
  const competencesByCategory = allCompetences.reduce((acc, comp) => {
    if (!acc[comp.category]) {
      acc[comp.category] = [];
    }
    acc[comp.category].push(comp);
    return acc;
  }, {} as Record<string, typeof allCompetences>);
  
  const categoryLabels: Record<string, string> = {
    'social': 'Compétences sociales',
    'economique': 'Compétences économiques',
    'militaire': 'Compétences militaires',
    'politique': 'Compétences politiques',
    'civil': 'Compétences civiles',
    'religieux': 'Compétences religieuses'
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Gestion des compétences</span>
          <Badge variant="outline">{availablePoints} points disponibles</Badge>
        </CardTitle>
        <CardDescription>Gérez les compétences de {client.name}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {Object.entries(competencesByCategory).map(([category, competences]) => (
          <div key={category} className="space-y-2">
            <h3 className="font-semibold">{categoryLabels[category] || category}</h3>
            <div className="grid grid-cols-2 gap-2">
              {competences.map(comp => (
                <Button 
                  key={comp.id}
                  variant={selectedCompetences.includes(comp.id) ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => toggleCompetence(comp.id, comp.cost)}
                >
                  {selectedCompetences.includes(comp.id) ? (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  ) : (
                    <Circle className="mr-2 h-4 w-4" />
                  )}
                  {comp.name} ({comp.cost})
                </Button>
              ))}
            </div>
            <Separator />
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onClose}>Annuler</Button>
        <Button 
          onClick={handleSave} 
          disabled={!isModified}
        >
          Enregistrer
        </Button>
      </CardFooter>
    </Card>
  );
};
