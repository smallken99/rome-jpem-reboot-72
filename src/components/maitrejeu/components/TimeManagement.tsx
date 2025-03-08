
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Season, PhaseType, TimeManagementProps } from '../types/maitreJeuTypes';

export const TimeManagement: React.FC<TimeManagementProps> = ({ 
  year, 
  season, 
  phase, 
  onAdvance, 
  onPhaseChange 
}) => {
  // Helper to convert season to french
  const getSeasonName = (season: Season): string => {
    switch (season) {
      case 'SPRING': return 'Printemps';
      case 'SUMMER': return 'Été';
      case 'AUTUMN': return 'Automne';
      case 'WINTER': return 'Hiver';
      default: return 'Inconnu';
    }
  };

  // Helper to convert phase to french
  const getPhaseName = (phase: PhaseType): string => {
    switch (phase) {
      case 'ADMINISTRATIVE': return 'Administrative';
      case 'POLITIQUE': return 'Politique';
      case 'ACTIONS': return 'Actions';
      case 'RESOLUTION': return 'Résolution';
      default: return 'Inconnue';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Période Actuelle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Année:</span>
              <span className="font-medium">{year}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Saison:</span>
              <span className="font-medium">{getSeasonName(season)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Phase:</span>
              <span className="font-medium">{getPhaseName(phase)}</span>
            </div>
            <Button className="w-full" onClick={onAdvance}>
              Avancer au tour suivant
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Gestion de la Phase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Changez la phase actuelle du jeu. Chaque phase permet d'effectuer des actions différentes.
            </p>
            <Select value={phase} onValueChange={(value) => onPhaseChange(value as PhaseType)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMINISTRATIVE">Phase Administrative</SelectItem>
                <SelectItem value="POLITIQUE">Phase Politique</SelectItem>
                <SelectItem value="ACTIONS">Phase d'Actions</SelectItem>
                <SelectItem value="RESOLUTION">Phase de Résolution</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
