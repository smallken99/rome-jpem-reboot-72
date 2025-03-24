
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle, Calendar, FastForward, Clock, AlertTriangle } from 'lucide-react';
import { useMaitreJeu } from '../context';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { formatSeasonDisplay, formatGameDate, convertToStandardSeason } from '@/utils/timeSystem';

export const TimePanel: React.FC = () => {
  const { currentDate, currentPhase, advanceTime, changePhase } = useMaitreJeu();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const handleAdvanceTime = () => {
    setConfirmDialogOpen(true);
  };
  
  const confirmAdvance = () => {
    advanceTime();
    setConfirmDialogOpen(false);
    
    // Standardiser le format de date pour utiliser formatGameDate
    const standardizedDate = {
      year: currentDate.year,
      season: convertToStandardSeason(currentDate.season as string)
    };
    
    toast.success("Le temps a avancé à la saison suivante", {
      description: `Nous sommes maintenant à l'${formatGameDate(standardizedDate)}`
    });
  };
  
  const translatePhase = (phase: string) => {
    const phaseMap: Record<string, string> = {
      'SENATE': 'Sénat',
      'ECONOMY': 'Économie',
      'ELECTIONS': 'Élections',
      'ELECTION': 'Élections',
      'DIPLOMACY': 'Diplomatie',
      'MILITARY': 'Militaire',
      'RELIGION': 'Religion',
      'VOTE': 'Vote',
      'ACTIONS': 'Actions',
      'EVENTS': 'Événements'
    };
    return phaseMap[phase] || phase;
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-4 bg-muted/40 border-b rounded-t-lg"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Calendar className="h-5 w-5 text-primary" />
          <span className="font-medium">
            An {currentDate.year} AUC - {formatSeasonDisplay(currentDate.season as string)}
          </span>
        </div>
        <div className="h-6 border-l border-muted-foreground/20"></div>
        <div className="flex items-center gap-1">
          <Clock className="h-5 w-5 text-primary" />
          <span className="font-medium">
            Phase: {translatePhase(currentPhase)}
          </span>
        </div>
      </div>
      
      <Button onClick={handleAdvanceTime} variant="outline" className="gap-1 hover:bg-amber-50 hover:text-amber-700 transition-colors">
        <FastForward className="h-4 w-4" />
        <span>Avancer le temps</span>
      </Button>
      
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Avancer le temps</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment passer à la saison suivante? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 py-3 text-amber-500 bg-amber-500/10 px-4 rounded-md">
            <AlertTriangle className="h-5 w-5" />
            <p className="text-sm">
              Tous les événements non résolus de la saison actuelle seront automatiquement résolus.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmAdvance}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
