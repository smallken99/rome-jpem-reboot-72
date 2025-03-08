
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useMaitreJeu } from '../context';

const ElectionPlanner = () => {
  const { currentYear, currentSeason, elections, scheduleElection } = useMaitreJeu();
  
  const [magistrature, setMagistrature] = useState('CONSUL');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [season, setSeason] = useState('SPRING');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (date) {
      const year = date.getFullYear();
      scheduleElection(magistrature, year, season as any);
    }
  };
  
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold mb-4">Planifier une élection</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Magistrature</label>
          <Select value={magistrature} onValueChange={setMagistrature}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une magistrature" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CONSUL">Consul</SelectItem>
              <SelectItem value="PRETEUR">Préteur</SelectItem>
              <SelectItem value="EDILE">Édile</SelectItem>
              <SelectItem value="QUESTEUR">Questeur</SelectItem>
              <SelectItem value="CENSEUR">Censeur</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Choisir une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Select value={season} onValueChange={setSeason}>
              <SelectTrigger>
                <SelectValue placeholder="Saison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SPRING">Printemps</SelectItem>
                <SelectItem value="SUMMER">Été</SelectItem>
                <SelectItem value="AUTUMN">Automne</SelectItem>
                <SelectItem value="WINTER">Hiver</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button type="submit" className="w-full">
          Planifier l'élection
        </Button>
      </form>
      
      <div className="mt-4">
        <h4 className="font-medium mb-2">Élections planifiées</h4>
        {elections && elections.length > 0 ? (
          <ul className="space-y-2">
            {elections.map((election) => (
              <li key={election.id} className="border rounded p-2 text-sm">
                <div className="font-medium">{election.magistrature}</div>
                <div className="text-muted-foreground">
                  {election.year || election.annee} - {election.season || election.saison} ({election.status})
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Aucune élection planifiée.</p>
        )}
      </div>
    </div>
  );
};

export default ElectionPlanner;
