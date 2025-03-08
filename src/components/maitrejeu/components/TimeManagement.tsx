
import React from 'react';
import { useMaitreJeu } from '../context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GamePhase, Season } from '../types';

export const TimeManagement: React.FC = () => {
  const { 
    currentYear, 
    currentSeason, 
    currentPhase, 
    advanceTime, 
    changePhase,
    setGameState
  } = useMaitreJeu();
  
  const phases: GamePhase[] = [
    'SETUP', 'ELECTION', 'ACTION', 'SENAT', 'EVENEMENT', 'ADMINISTRATION'
  ];
  
  const seasons: Season[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
  
  const handleSeasonChange = (season: Season) => {
    setGameState({ season });
  };
  
  const handlePhaseChange = (phase: GamePhase) => {
    changePhase(phase);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion du Temps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Année:</span>
              <span>{currentYear} AUC</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Saison:</span>
              <Select value={currentSeason} onValueChange={(value) => handleSeasonChange(value as Season)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Saison" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season} value={season}>
                      {season === 'SPRING' ? 'Printemps' : 
                       season === 'SUMMER' ? 'Été' : 
                       season === 'AUTUMN' ? 'Automne' : 'Hiver'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Phase:</span>
              <Select value={currentPhase} onValueChange={(value) => handlePhaseChange(value as GamePhase)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Phase" />
                </SelectTrigger>
                <SelectContent>
                  {phases.map((phase) => (
                    <SelectItem key={phase} value={phase}>
                      {phase}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={advanceTime}>
            Avancer le temps
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
