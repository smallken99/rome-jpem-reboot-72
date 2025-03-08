
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../context';
import { GamePhase, Season } from '../types/common';
import { ArrowRight, SkipForward } from 'lucide-react';

export const TimeManagement = () => {
  const { currentYear, currentSeason, currentPhase, changePhase, advanceTime } = useMaitreJeu();
  
  const handlePhaseChange = (newPhase: GamePhase) => {
    changePhase(newPhase);
  };
  
  const handleAdvanceTime = () => {
    advanceTime();
  };
  
  const handleAdvanceToSeason = (season: Season) => {
    advanceTime(season);
  };
  
  const getSeasonInFrench = (season: Season) => {
    switch (season) {
      case 'SPRING': return 'Printemps';
      case 'SUMMER': return 'Été';
      case 'AUTUMN': return 'Automne';
      case 'WINTER': return 'Hiver';
      default: return season;
    }
  };
  
  const getPhaseInFrench = (phase: GamePhase) => {
    switch (phase) {
      case 'POLITIQUE': return 'Politique';
      case 'ECONOMIE': return 'Économie';
      case 'MILITAIRE': return 'Militaire';
      case 'RELIGION': return 'Religion';
      case 'SOCIAL': return 'Social';
      case 'SETUP': return 'Installation';
      case 'ELECTION': return 'Élection';
      case 'ACTION': return 'Action';
      case 'SENAT': return 'Sénat';
      case 'EVENEMENT': return 'Événement';
      case 'ADMINISTRATION': return 'Administration';
      default: return phase;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion du Temps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Période Actuelle</h3>
            <div className="bg-gray-100 p-3 rounded-md">
              <div className="font-medium text-lg">Année {currentYear} AUC, {getSeasonInFrench(currentSeason)}</div>
              <div className="text-sm text-muted-foreground">Phase actuelle: {getPhaseInFrench(currentPhase)}</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Changer de Phase</h3>
            <Select value={currentPhase} onValueChange={(value) => handlePhaseChange(value as GamePhase)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="POLITIQUE">Politique</SelectItem>
                <SelectItem value="ECONOMIE">Économie</SelectItem>
                <SelectItem value="MILITAIRE">Militaire</SelectItem>
                <SelectItem value="RELIGION">Religion</SelectItem>
                <SelectItem value="SOCIAL">Social</SelectItem>
                <SelectItem value="SETUP">Installation</SelectItem>
                <SelectItem value="ELECTION">Élection</SelectItem>
                <SelectItem value="ACTION">Action</SelectItem>
                <SelectItem value="SENAT">Sénat</SelectItem>
                <SelectItem value="EVENEMENT">Événement</SelectItem>
                <SelectItem value="ADMINISTRATION">Administration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Avancer le Temps</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleAdvanceTime} className="w-full">
                <ArrowRight className="h-4 w-4 mr-2" />
                Saison Suivante
              </Button>
              
              <Select onValueChange={(value) => handleAdvanceToSeason(value as Season)}>
                <SelectTrigger>
                  <SelectValue placeholder="Avancer jusqu'à..." />
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
        </div>
      </CardContent>
    </Card>
  );
};
