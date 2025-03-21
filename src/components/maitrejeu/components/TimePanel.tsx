
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle, Calendar, FastForward, Clock } from 'lucide-react';
import { useMaitreJeu } from '../context';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const TimePanel: React.FC = () => {
  const { currentDate, currentPhase, advanceTime, changePhase } = useMaitreJeu();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const handleAdvanceTime = () => {
    setConfirmDialogOpen(true);
  };
  
  const confirmAdvance = () => {
    advanceTime();
    setConfirmDialogOpen(false);
    toast.success("Le temps a avancé à la saison suivante");
  };
  
  const translatePhase = (phase: string) => {
    const phaseMap: Record<string, string> = {
      'SENATE': 'Sénat',
      'ECONOMY': 'Économie',
      'ELECTIONS': 'Élections',
      'DIPLOMACY': 'Diplomatie',
      'MILITARY': 'Militaire',
      'RELIGION': 'Religion',
      'VOTE': 'Vote',
      'ACTIONS': 'Actions',
      'EVENTS': 'Événements',
      'ELECTION': 'Élections'
    };
    return phaseMap[phase] || phase;
  };
  
  const translateSeason = (season: string) => {
    const seasonMap: Record<string, string> = {
      'SPRING': 'Printemps',
      'SUMMER': 'Été',
      'AUTUMN': 'Automne',
      'WINTER': 'Hiver',
      'Ver': 'Printemps',
      'Aestas': 'Été',
      'Autumnus': 'Automne',
      'Hiems': 'Hiver'
    };
    return seasonMap[season] || season;
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
            An {currentDate.year} AUC - {translateSeason(currentDate.season)}
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
      
      <Button onClick={handleAdvanceTime} className="gap-1">
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
            <AlertCircle className="h-5 w-5" />
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
