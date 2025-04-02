
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from './context';
import EquilibreModule from './components/equilibre/EquilibreModule';
import EventsModule from './components/evenements/EventsModule';
import { formatGameDate } from '@/utils/types/gameDate';
import { GamePhase } from './types/common';
import { ProgressBar } from '@/components/ui/progress-bar';

const PhaseIcon = ({ phase }: { phase: GamePhase }) => {
  return <div className="text-2xl mr-2">{phase === GamePhase.SENATE ? '🏛️' : phase === GamePhase.EVENTS ? '📜' : '🔄'}</div>;
};

export const MaitreJeuWelcome = () => {
  const { 
    currentYear, 
    currentSeason, 
    currentPhase, 
    equilibre, 
    changePhase,
    advanceTime,
    senatorsCount = 0,
    clientsCount = 0,
    advancePhase
  } = useMaitreJeu();

  const handlePhaseChange = (newPhase: GamePhase) => {
    changePhase(newPhase);
  };

  const handleAdvanceTime = () => {
    advanceTime();
  };

  const handleAdvancePhase = () => {
    if (advancePhase) {
      advancePhase();
    }
  };

  // Format current date for display
  const formattedDate = formatGameDate({
    year: currentYear,
    season: currentSeason,
    phase: currentPhase as unknown as string // Type conversion to match expected type
  });

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Console du Maître de Jeu</h1>
          <p className="text-muted-foreground">
            Gérez le monde de RomeJpem, contrôlez les événements et l'équilibre de la République
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-lg font-medium">{formattedDate}</div>
            <div className="text-sm text-muted-foreground">Phase: {currentPhase}</div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button onClick={handleAdvancePhase}>
              Phase suivante
            </Button>
            <Button onClick={handleAdvanceTime} variant="outline">
              Saison suivante
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">État de la République</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Stabilité</span>
                  <span className="text-sm text-muted-foreground">
                    {typeof equilibre.stabilite === 'number' 
                      ? equilibre.stabilite 
                      : equilibre.stabilite?.value || 0}%
                  </span>
                </div>
                <ProgressBar 
                  value={typeof equilibre.stabilite === 'number' 
                    ? equilibre.stabilite 
                    : equilibre.stabilite?.value || 0} 
                  className="h-2 bg-slate-200"
                  indicatorClassName={
                    ((typeof equilibre.stabilite === 'number' 
                      ? equilibre.stabilite 
                      : equilibre.stabilite?.value || 0) > 70)
                      ? "bg-green-500"
                      : ((typeof equilibre.stabilite === 'number' 
                        ? equilibre.stabilite 
                        : equilibre.stabilite?.value || 0) > 40)
                        ? "bg-yellow-500" 
                        : "bg-red-500"
                  }
                />
                <div className="flex justify-between text-xs mt-1">
                  <span>Indice: {typeof equilibre.stabilite === 'object' ? equilibre.stabilite?.index || 'N/A' : 'N/A'}</span>
                  <span>Risque de crise: {
                    typeof equilibre.stabilite === 'object' ? 
                    (equilibre.stabilite?.crisisRisk || 0) + '%' : '0%'
                  }</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Équilibre politique</span>
                  <span className="text-sm text-muted-foreground">
                    {equilibre.politique?.stability || equilibre.politique?.stabilite || 50}%
                  </span>
                </div>
                <ProgressBar 
                  value={equilibre.politique?.stability || equilibre.politique?.stabilite || 50} 
                  className="h-2 bg-slate-200"
                  indicatorClassName="bg-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Économie</span>
                  <span className="text-sm text-muted-foreground">
                    {equilibre.economie?.prosperity || equilibre.economie?.stabilite || 50}%
                  </span>
                </div>
                <ProgressBar 
                  value={equilibre.economie?.prosperity || equilibre.economie?.stabilite || 50} 
                  className="h-2 bg-slate-200"
                  indicatorClassName="bg-green-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Armée</span>
                  <span className="text-sm text-muted-foreground">
                    {equilibre.militaire?.readiness || equilibre.militaire?.morale || 50}%
                  </span>
                </div>
                <ProgressBar 
                  value={equilibre.militaire?.readiness || equilibre.militaire?.morale || 50} 
                  className="h-2 bg-slate-200"
                  indicatorClassName="bg-red-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Religion</span>
                  <span className="text-sm text-muted-foreground">
                    {equilibre.religion?.piety || equilibre.religion?.piete || 50}%
                  </span>
                </div>
                <ProgressBar 
                  value={equilibre.religion?.piety || equilibre.religion?.piete || 50} 
                  className="h-2 bg-slate-200"
                  indicatorClassName="bg-purple-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Événements actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <EventsModule isCompact={true} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Statistiques du jeu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/20 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Sénateurs</div>
                  <div className="text-2xl font-bold">{senatorsCount}</div>
                </div>
                <div className="bg-muted/20 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Clients</div>
                  <div className="text-2xl font-bold">{clientsCount}</div>
                </div>
                <div className="bg-muted/20 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Facties politiques</div>
                  <div className="text-2xl font-bold">3</div>
                </div>
                <div className="bg-muted/20 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">Provinces</div>
                  <div className="text-2xl font-bold">7</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <EquilibreModule />
      </div>
    </div>
  );
};
