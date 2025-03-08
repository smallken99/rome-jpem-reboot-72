import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Season } from '@/utils/timeSystem';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GamePhase } from '../types/maitreJeuTypes';
import { Button } from '@/components/ui/button';

interface TimeManagementProps {
  year: number;
  season: Season;
  phase: GamePhase;
  onAdvance: () => void;
  onPhaseChange: (phase: GamePhase) => void;
}

export const TimeManagement: React.FC<TimeManagementProps> = ({ year, season, phase, onAdvance, onPhaseChange }) => {
  const getSeasonColor = (s: Season) => {
    switch (s) {
      case 'SPRING': return 'bg-emerald-500';
      case 'SUMMER': return 'bg-yellow-500';
      case 'AUTUMN': return 'bg-orange-500';
      case 'WINTER': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getSeasonName = (s: Season) => {
    switch (s) {
      case 'SPRING': return 'Printemps';
      case 'SUMMER': return 'Été';
      case 'AUTUMN': return 'Automne';
      case 'WINTER': return 'Hiver';
      default: return 'Inconnu';
    }
  };
  
  const getPhaseName = (phase: GamePhase) => {
    switch (phase) {
      case 'VOTE_DES_LOIS': return 'Vote des lois';
      case 'ÉLECTIONS': return 'Élections';
      case 'ADMINISTRATION': return 'Administration';
      case 'GUERRE': return 'Guerre';
      case 'DIPLOMATIE': return 'Diplomatie';
      case 'COMMERCE': return 'Commerce';
      case 'CRISES': return 'Crises';
      default: return 'Inconnue';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Gestion du temps
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold">Année courante:</h3>
          <span className="text-lg">{year} AUC</span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-semibold">Saison courante:</h3>
          <span className={`px-2 py-1 rounded text-white ${getSeasonColor(season)}`}>
            {getSeasonName(season)}
          </span>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Phase de jeu actuelle:</h3>
          <Select value={phase} onValueChange={onPhaseChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder={getPhaseName(phase)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="VOTE_DES_LOIS">Vote des lois</SelectItem>
              <SelectItem value="ÉLECTIONS">Élections</SelectItem>
              <SelectItem value="ADMINISTRATION">Administration</SelectItem>
              <SelectItem value="GUERRE">Guerre</SelectItem>
              <SelectItem value="DIPLOMATIE">Diplomatie</SelectItem>
              <SelectItem value="COMMERCE">Commerce</SelectItem>
              <SelectItem value="CRISES">Crises</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={onAdvance} className="roman-btn">
          Avancer le temps
        </Button>
      </CardContent>
    </Card>
  );
};
