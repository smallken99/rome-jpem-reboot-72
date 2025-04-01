
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMaitreJeu } from '../../context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MagistratureType } from '../../types/magistratures';

export const ElectionPlanner: React.FC = () => {
  const { currentDate } = useMaitreJeu();
  const [selectedMagistrature, setSelectedMagistrature] = useState<MagistratureType>("consul");
  const [year, setYear] = useState<number>(currentDate.year + 1);
  
  // Local implementation of scheduleElection until the context provides it
  const scheduleElection = (magistrature: MagistratureType, year?: number, season?: string): string => {
    console.log(`Planning election for ${magistrature} in year ${year || currentDate.year}, season ${season || 'Winter'}`);
    // Normally this would update state or call an API
    // Return a fake ID for now
    return `election-${Date.now()}`;
  };

  const handlePlanElection = () => {
    // Schedule the election for the selected magistrature and year
    const electionId = scheduleElection(selectedMagistrature, year);
    console.log(`Election scheduled with ID: ${electionId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Planifier une élection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Magistrature</label>
              <Select 
                value={selectedMagistrature} 
                onValueChange={(value) => setSelectedMagistrature(value as MagistratureType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une magistrature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consul">Consul</SelectItem>
                  <SelectItem value="praetor">Préteur</SelectItem>
                  <SelectItem value="aedile">Édile</SelectItem>
                  <SelectItem value="quaestor">Questeur</SelectItem>
                  <SelectItem value="censor">Censeur</SelectItem>
                  <SelectItem value="tribune">Tribun de la plèbe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Année</label>
              <Select 
                value={year.toString()} 
                onValueChange={(value) => setYear(parseInt(value, 10))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une année" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={currentDate.year.toString()}>{currentDate.year} AUC</SelectItem>
                  <SelectItem value={(currentDate.year + 1).toString()}>{currentDate.year + 1} AUC</SelectItem>
                  <SelectItem value={(currentDate.year + 2).toString()}>{currentDate.year + 2} AUC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handlePlanElection} className="w-full">
            Planifier l'élection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
