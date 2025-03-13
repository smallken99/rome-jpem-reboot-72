
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock } from 'lucide-react';
import { useMaitreJeu } from '../context';
import { GamePhase, Season, PlayerSeason, formatSeasonDisplay, convertSeason } from '../types/common';

export const TimeManagement = () => {
  const { 
    currentDate, 
    currentSeason, 
    currentYear, 
    currentPhase, 
    advanceTime, 
    changePhase 
  } = useMaitreJeu();
  
  const [selectedSeason, setSelectedSeason] = useState<PlayerSeason>('SPRING');
  const [selectedPhase, setSelectedPhase] = useState<GamePhase>(currentPhase);
  
  const handleAdvanceTime = () => {
    advanceTime(selectedSeason);
  };
  
  const handleChangePhase = () => {
    changePhase(selectedPhase);
  };
  
  // Extract available game phases from the GamePhase type
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
  
  // Get the formatted display for the current season
  const getFormattedCurrentSeason = () => {
    const season = typeof currentSeason === 'string' ? currentSeason : 'Ver';
    return formatSeasonDisplay(season);
  };
  
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
                An {currentYear} - {getFormattedCurrentSeason()}
              </span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Avancer au...</label>
              <Select
                value={selectedSeason}
                onValueChange={(value: PlayerSeason) => setSelectedSeason(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une saison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SPRING">Printemps</SelectItem>
                  <SelectItem value="SUMMER">Été</SelectItem>
                  <SelectItem value="AUTUMN">Automne</SelectItem>
                  <SelectItem value="WINTER">Hiver</SelectItem>
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
