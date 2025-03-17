
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from '../context';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Calendar, FastForward } from 'lucide-react';
import { toast } from 'sonner';
import { Season, GamePhase } from '@/components/maitrejeu/types';

export const TimeManagement: React.FC = () => {
  const { 
    currentYear, 
    currentSeason, 
    currentPhase, 
    advanceTime, 
    changePhase 
  } = useMaitreJeu();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [targetPhase, setTargetPhase] = useState<GamePhase | null>(null);

  const seasonNames: Record<Season, string> = {
    SPRING: 'Printemps',
    SUMMER: 'Été',
    FALL: 'Automne',
    WINTER: 'Hiver'
  };

  const phaseNames: Record<GamePhase, string> = {
    ECONOMY: 'Économie',
    POLITICS: 'Politique',
    SOCIAL: 'Sociale',
    MILITARY: 'Militaire',
    RELIGION: 'Religieuse',
    ELECTION: 'Élections',
    DIPLOMACY: 'Diplomatie'
  };

  const confirmChangePhase = (phase: GamePhase) => {
    setTargetPhase(phase);
    setConfirmDialogOpen(true);
  };

  const handleChangePhase = () => {
    if (targetPhase) {
      changePhase(targetPhase);
      toast.success(`Phase changée : ${phaseNames[targetPhase]}`);
      setConfirmDialogOpen(false);
    }
  };

  const handleAdvanceTime = () => {
    advanceTime();
    toast.success("Saison avancée");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Gestion du Temps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              An {currentYear} AUC - {seasonNames[currentSeason]}
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAdvanceTime} 
            className="flex items-center gap-1"
          >
            <FastForward className="h-3.5 w-3.5" />
            Avancer
          </Button>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label>Phase Actuelle: {phaseNames[currentPhase]}</Label>
          <Select 
            onValueChange={(value) => confirmChangePhase(value as GamePhase)} 
            defaultValue={currentPhase}
          >
            <SelectTrigger>
              <SelectValue placeholder="Changer de phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ECONOMY">Économie</SelectItem>
              <SelectItem value="POLITICS">Politique</SelectItem>
              <SelectItem value="SOCIAL">Sociale</SelectItem>
              <SelectItem value="MILITARY">Militaire</SelectItem>
              <SelectItem value="RELIGION">Religieuse</SelectItem>
              <SelectItem value="ELECTION">Élections</SelectItem>
              <SelectItem value="DIPLOMACY">Diplomatie</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Changer de phase</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir passer à la phase {targetPhase ? phaseNames[targetPhase] : ''}?
              Cela pourrait avoir des effets sur l'état du jeu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleChangePhase}>Confirmer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
