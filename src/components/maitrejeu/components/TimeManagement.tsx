
import React from 'react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Clock, Calendar, FastForward } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTimeStore, Season } from '@/utils/timeSystem';

export const TimeManagement: React.FC = () => {
  const { gameState, advanceTime, setGameState } = useMaitreJeu();
  const { toast } = useToast();
  const timeStore = useTimeStore();
  
  const handleAdvancePhase = () => {
    // L'ordre des phases
    const phases: Array<typeof gameState.gamePhase> = [
      'VOTE_DES_LOIS',
      'ÉLECTIONS',
      'ADMINISTRATION',
      'GUERRE',
      'DIPLOMATIE',
      'COMMERCE',
      'CRISES'
    ];
    
    // Trouver l'index de la phase actuelle
    const currentPhaseIndex = phases.indexOf(gameState.gamePhase);
    
    // Déterminer la phase suivante
    const nextPhaseIndex = (currentPhaseIndex + 1) % phases.length;
    const nextPhase = phases[nextPhaseIndex];
    
    // Si on revient à la première phase, avancer le temps (nouvelle saison)
    if (nextPhaseIndex === 0) {
      advanceTime();
      toast({
        title: "Nouvelle saison",
        description: `Nous sommes maintenant en ${gameState.season}, ${gameState.year} AUC`,
      });
    }
    
    // Mettre à jour la phase
    setGameState({
      ...gameState,
      gamePhase: nextPhase
    });
    
    toast({
      title: "Phase de jeu modifiée",
      description: `Nouvelle phase: ${nextPhase}`,
    });
  };
  
  const handleAdvanceSeason = () => {
    // Avancer d'une saison complète (toutes les phases)
    advanceTime();
    
    toast({
      title: "Nouvelle saison",
      description: `Nous sommes maintenant en ${gameState.season}, ${gameState.year} AUC`,
    });
  };
  
  const handleAdvanceYear = () => {
    // Avancer d'une année complète (4 saisons)
    for (let i = 0; i < 4; i++) {
      advanceTime();
    }
    
    toast({
      title: "Nouvelle année",
      description: `Nous sommes maintenant en l'an ${gameState.year} AUC`,
    });
  };
  
  const formatSeason = (season: Season): string => {
    const seasonMap: Record<Season, string> = {
      'Ver': 'Printemps',
      'Aestas': 'Été',
      'Autumnus': 'Automne',
      'Hiems': 'Hiver'
    };
    
    return seasonMap[season] || season;
  };
  
  return (
    <Card className="mb-6 border-amber-200 bg-rome-parchment/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-rome-navy">
          <Calendar className="h-5 w-5 text-amber-700" />
          Calendrier Romain
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-0">
            <div className="flex items-center bg-white/70 rounded-md p-2 border border-amber-100">
              <Clock className="h-5 w-5 text-amber-600 mr-2" />
              <div>
                <span className="text-sm text-muted-foreground">Année:</span>
                <span className="ml-2 font-medium">{gameState.year} AUC</span>
              </div>
            </div>
            
            <div className="flex items-center bg-white/70 rounded-md p-2 border border-amber-100">
              <Calendar className="h-5 w-5 text-amber-600 mr-2" />
              <div>
                <span className="text-sm text-muted-foreground">Saison:</span>
                <span className="ml-2 font-medium">{formatSeason(gameState.season)}</span>
              </div>
            </div>
            
            <div className="flex items-center bg-white/70 rounded-md p-2 border border-amber-100">
              <FastForward className="h-5 w-5 text-amber-600 mr-2" />
              <div>
                <span className="text-sm text-muted-foreground">Phase:</span>
                <span className="ml-2 font-medium">{gameState.gamePhase}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <ActionButton 
              label="Phase suivante" 
              icon={<FastForward className="h-4 w-4" />}
              onClick={handleAdvancePhase}
              variant="outline"
              size="sm"
            />
            
            <ActionButton 
              label="Saison suivante" 
              icon={<Calendar className="h-4 w-4" />}
              onClick={handleAdvanceSeason}
              variant="outline"
              size="sm"
            />
            
            <ActionButton 
              label="Année suivante" 
              icon={<Calendar className="h-4 w-4" />}
              onClick={handleAdvanceYear}
              variant="secondary"
              size="sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
