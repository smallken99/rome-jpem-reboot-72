
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
import { MagistratureType } from '../types/magistratures';
import { GamePhase } from '../types/common';

export const ElectionPlanner: React.FC = () => {
  const { currentYear, currentSeason, elections, scheduleElection } = useMaitreJeu();
  
  const [selectedMagistrature, setSelectedMagistrature] = useState<MagistratureType>('CONSUL');
  
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
              <h3 className="text-sm font-medium mb-2">Élections planifiées</h3>
              <ul className="space-y-2">
                {elections.map(election => (
                  <li key={election.id} className="text-sm border p-2 rounded-md">
                    <span className="font-medium">{election.magistrature}</span> - {election.season} {election.year}
                    <span className="ml-2 text-muted-foreground capitalize">({election.status})</span>
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
