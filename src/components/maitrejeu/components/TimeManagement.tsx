
import React from 'react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Clock, Calendar, FastForward } from 'lucide-react';
import { toast } from 'sonner';
import { formatRomanSeason } from '@/utils/timeSystem';

export const TimeManagement: React.FC = () => {
  const { year, season, gamePhase, advanceTime, setGamePhase } = useMaitreJeu();
  
  const handleAdvancePhase = () => {
    // Avancer à la phase suivante
    advanceTime();
  };
  
  const handleAdvanceSeason = () => {
    // Avancer d'une saison complète (toutes les phases)
    const phases = [
      'VOTE_DES_LOIS',
      'ÉLECTIONS',
      'ADMINISTRATION',
      'GUERRE',
      'DIPLOMATIE',
      'COMMERCE',
      'CRISES'
    ];
    
    // Avancer pour chaque phase jusqu'à revenir à la première
    const currentPhaseIndex = phases.indexOf(gamePhase);
    for (let i = 0; i < phases.length; i++) {
      advanceTime();
    }
    
    toast({
      title: "Nouvelle saison",
      description: `Nous sommes maintenant en ${formatRomanSeason(season)}, ${year} AUC`,
    });
  };
  
  const handleAdvanceYear = () => {
    // Avancer d'une année complète (4 saisons)
    for (let i = 0; i < 4; i++) {
      handleAdvanceSeason();
    }
    
    toast({
      title: "Nouvelle année",
      description: `Nous sommes maintenant en l'an ${year} AUC`,
    });
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
                <span className="ml-2 font-medium">{year} AUC</span>
              </div>
            </div>
            
            <div className="flex items-center bg-white/70 rounded-md p-2 border border-amber-100">
              <Calendar className="h-5 w-5 text-amber-600 mr-2" />
              <div>
                <span className="text-sm text-muted-foreground">Saison:</span>
                <span className="ml-2 font-medium">{formatRomanSeason(season)}</span>
              </div>
            </div>
            
            <div className="flex items-center bg-white/70 rounded-md p-2 border border-amber-100">
              <FastForward className="h-5 w-5 text-amber-600 mr-2" />
              <div>
                <span className="text-sm text-muted-foreground">Phase:</span>
                <span className="ml-2 font-medium">{gamePhase}</span>
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
