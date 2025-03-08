
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar, CalendarCheck, Users } from 'lucide-react';
import { useTimeStore } from '@/utils/timeSystem';
import { SenateurJouable } from '../types/maitreJeuTypes';

interface ElectionPlannerProps {
  senateurs: SenateurJouable[];
  onScheduleElection: (poste: string, date: { year: number; month: number; day: number }) => void;
}

export const ElectionPlanner: React.FC<ElectionPlannerProps> = ({ senateurs, onScheduleElection }) => {
  const { year, month } = useTimeStore();
  
  const [poste, setPoste] = useState('');
  const [electionYear, setElectionYear] = useState(year);
  const [electionMonth, setElectionMonth] = useState(month + 1 > 12 ? 1 : month + 1);
  const [electionDay, setElectionDay] = useState(15);
  
  const postes = [
    "Consul",
    "Préteur",
    "Édile",
    "Questeur",
    "Tribun de la plèbe",
    "Censeur"
  ];
  
  const handleSchedule = () => {
    onScheduleElection(poste, {
      year: electionYear,
      month: electionMonth,
      day: electionDay
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planificateur d'élections</CardTitle>
        <CardDescription>
          Organisez les prochaines élections pour les postes magistraux
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Poste à pourvoir</label>
          <Select onValueChange={setPoste} value={poste}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un poste" />
            </SelectTrigger>
            <SelectContent>
              {postes.map(p => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Année</label>
            <Input 
              type="number"
              value={electionYear}
              onChange={e => setElectionYear(parseInt(e.target.value))}
              min={year}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Mois</label>
            <Input 
              type="number"
              value={electionMonth}
              onChange={e => setElectionMonth(parseInt(e.target.value))}
              min={1}
              max={12}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Jour</label>
            <Input 
              type="number"
              value={electionDay}
              onChange={e => setElectionDay(parseInt(e.target.value))}
              min={1}
              max={30}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-muted-foreground flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{senateurs.filter(s => s.statut === 'actif').length} candidats potentiels</span>
          </div>
          <Button onClick={handleSchedule} className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4" />
            Planifier l'élection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
