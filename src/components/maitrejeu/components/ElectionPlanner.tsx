
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../context';
import { getSeasonsAfter } from '@/utils/dateUtils';
import { toast } from 'sonner';

type MagistratureType = 'CONSUL' | 'PRETEUR' | 'EDILE' | 'QUESTEUR' | 'TRIBUN' | 'CENSEUR';

export const ElectionPlanner: React.FC = () => {
  const { currentYear, currentSeason } = useMaitreJeu();
  
  const [selectedMagistrature, setSelectedMagistrature] = useState<MagistratureType>('CONSUL');
  
  // Create our own local implementation since the context doesn't have these yet
  const [elections, setElections] = useState<any[]>([]);
  
  const scheduleElection = (magistrature: MagistratureType, year?: number, season?: string) => {
    // Create a fake ID
    const id = `election-${Date.now()}`;
    
    // Create a new election entry
    const newElection = {
      id,
      magistrature,
      date: {
        year: year || currentYear,
        season: season || currentSeason
      }
    };
    
    // Add it to our local state
    setElections(prev => [...prev, newElection]);
    
    // Show success message
    toast.success(`Élection pour le poste de ${magistrature} programmée`);
    
    // Return the ID as expected
    return id;
  };
  
  const handleScheduleElection = () => {
    scheduleElection(selectedMagistrature);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planifier une Élection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Magistrature</label>
            <Select
              value={selectedMagistrature}
              onValueChange={(value) => setSelectedMagistrature(value as MagistratureType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir une magistrature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CONSUL">Consul</SelectItem>
                <SelectItem value="PRETEUR">Préteur</SelectItem>
                <SelectItem value="EDILE">Édile</SelectItem>
                <SelectItem value="QUESTEUR">Questeur</SelectItem>
                <SelectItem value="TRIBUN">Tribun de la Plèbe</SelectItem>
                <SelectItem value="CENSEUR">Censeur</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleScheduleElection} className="w-full">
            Planifier l'élection
          </Button>
          
          {elections && elections.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Élections prévues</h3>
              <ul className="space-y-2">
                {elections.map((election: any, index: number) => (
                  <li key={index} className="text-sm">
                    {`${election.magistrature} - ${election.date.year} ${election.date.season}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
