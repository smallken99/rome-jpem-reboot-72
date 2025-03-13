
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock } from 'lucide-react';
import { useMaitreJeu } from '../context';
import { GamePhase } from '../types/common';
import { Season, formatSeasonDisplay } from '@/utils/timeSystem';

export const TimeManagement = () => {
  const { 
    currentDate, 
    currentPhase, 
    advanceTime, 
    changePhase 
  } = useMaitreJeu();
  
  const [selectedSeason, setSelectedSeason] = useState<Season>('Ver');
  const [selectedPhase, setSelectedPhase] = useState<GamePhase>(currentPhase);
  
  const handleAdvanceTime = () => {
    advanceTime(selectedSeason);
  };
  
  const handleChangePhase = () => {
    changePhase(selectedPhase);
  };
  
  // Extraire les phases de jeu disponibles à partir du type GamePhase
  const gamePhases: GamePhase[] = [
    "SENATE", 
    "ACTIONS", 
    "ECONOMY", 
    "EVENTS", 
    "DIPLOMACY", 
    "MILITARY",
    "POLITIQUE", 
    "ECONOMIE", 
    "MILITAIRE", 
    "RELIGION", 
    "SOCIAL", 
    "SETUP", 
    "ELECTION", 
    "ACTION", 
    "SENAT", 
    "EVENEMENT", 
    "ADMINISTRATION"
  ];
  
  // Formatage de la date actuelle
  const formatGameDate = (date: { year: number; season: string | Season }) => {
    return `An ${date.year}, ${formatSeasonDisplay(date.season)}`;
  };
  
  const formattedDate = formatGameDate(currentDate);
  
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" /> Gestion du temps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-2">Date actuelle</h3>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
                {formattedDate}
              </span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Avancer au...</label>
              <Select
                value={selectedSeason}
                onValueChange={(value: Season) => setSelectedSeason(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une saison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ver">Printemps</SelectItem>
                  <SelectItem value="Aestas">Été</SelectItem>
                  <SelectItem value="Autumnus">Automne</SelectItem>
                  <SelectItem value="Hiems">Hiver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-2" 
              onClick={handleAdvanceTime}
            >
              Avancer le temps
            </Button>
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-2">Phase actuelle</h3>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">
                {currentPhase}
              </span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Changer la phase...</label>
              <Select
                value={selectedPhase}
                onValueChange={(value: GamePhase) => setSelectedPhase(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une phase" />
                </SelectTrigger>
                <SelectContent>
                  {gamePhases.map((phase) => (
                    <SelectItem key={phase} value={phase}>
                      {phase}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-2" 
              onClick={handleChangePhase}
            >
              Changer de phase
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
