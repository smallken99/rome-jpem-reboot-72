
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { useMaitreJeu } from '../context';
import { GamePhase } from '../types/common';
import { Season } from '@/utils/timeSystem';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export const TimeManagement = () => {
  const { 
    currentDate, 
    currentPhase, 
    advanceTime, 
    changePhase 
  } = useMaitreJeu();
  
  const [selectedSeason, setSelectedSeason] = useState<Season>('Ver');
  const [selectedPhase, setSelectedPhase] = useState<GamePhase>(currentPhase);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmPhaseDialogOpen, setConfirmPhaseDialogOpen] = useState(false);
  
  const handleAdvanceTime = () => {
    setConfirmDialogOpen(true);
  };
  
  const confirmAdvance = () => {
    advanceTime(selectedSeason);
    setConfirmDialogOpen(false);
    toast.success(`Le temps a avancé à ${formatSeasonDisplay(selectedSeason)}`);
  };
  
  const handleChangePhase = () => {
    setConfirmPhaseDialogOpen(true);
  };
  
  const confirmPhaseChange = () => {
    changePhase(selectedPhase);
    setConfirmPhaseDialogOpen(false);
    toast.success(`Phase changée à ${selectedPhase}`);
  };
  
  // Extraire les phases de jeu disponibles à partir du type GamePhase
  const gamePhases: GamePhase[] = [
    "SENATE", 
    "ECONOMY", 
    "ELECTIONS", 
    "DIPLOMACY", 
    "MILITARY",
    "RELIGION", 
    "SOCIAL", 
    "SETUP", 
    "ACTION", 
    "EVENEMENT", 
    "ADMINISTRATION"
  ];
  
  // Formatage de la date actuelle
  const formatGameDate = (date: { year: number; season: string | Season }) => {
    return `An ${date.year}, ${formatSeasonDisplay(date.season as Season)}`;
  };
  
  const formatSeasonDisplay = (season: Season | string) => {
    const seasonMap: Record<string, string> = {
      'Ver': 'Printemps',
      'Aestas': 'Été',
      'Autumnus': 'Automne',
      'Hiems': 'Hiver',
      'SPRING': 'Printemps',
      'SUMMER': 'Été',
      'AUTUMN': 'Automne',
      'WINTER': 'Hiver'
    };
    return seasonMap[season] || season;
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

      {/* Dialogue de confirmation pour l'avance du temps */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Avancer le temps</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir avancer au {formatSeasonDisplay(selectedSeason)}? Cette action aura des conséquences sur l'ensemble du jeu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center gap-2 py-3 text-amber-500 bg-amber-500/10 px-4 rounded-md">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">
              Tous les événements non résolus de la saison actuelle seront automatiquement résolus.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAdvance}>Confirmer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialogue de confirmation pour le changement de phase */}
      <AlertDialog open={confirmPhaseDialogOpen} onOpenChange={setConfirmPhaseDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Changer de phase</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir passer à la phase {selectedPhase}? Cette action modifiera le fonctionnement actuel du jeu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmPhaseChange}>Confirmer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
