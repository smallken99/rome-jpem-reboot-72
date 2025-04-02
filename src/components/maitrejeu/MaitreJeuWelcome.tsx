
import React from 'react';
import { useMaitreJeu } from './context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EquilibreModule from './components/equilibre/EquilibreModule';
import EventsModule from './components/evenements/EventsModule';
import { ProgressBar } from '@/components/ui/progress-bar'; 
import { formatGameDate, GamePhase } from './types/common';

export const MaitreJeuWelcome = () => {
  const { 
    currentDate, 
    changePhase,
    equilibre, 
    senateurs = [],
    clients = []
  } = useMaitreJeu();

  // Calculate counts instead of using properties that don't exist
  const senatorsCount = senateurs.length;
  const clientsCount = clients.length;

  const handleAdvancePhase = () => {
    if (changePhase) {
      // Use GamePhase enum for phase values
      changePhase(GamePhase.NORMAL);
    }
  };

  if (!currentDate || !equilibre) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Chargement des données...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Veuillez patienter pendant le chargement des données du jeu.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Format the date for display
  const formattedDate = formatGameDate(currentDate);

  // Safe access to nested properties with fallbacks
  const political = equilibre?.politique || { populares: 50, optimates: 50, moderates: 50, stability: 50 };
  const economy = equilibre?.economie || { stabilite: 50, croissance: 50, commerce: 50, agriculture: 50, prosperity: 50 };
  const military = equilibre?.militaire || { morale: 50, effectifs: 50, equipement: 50, discipline: 50, readiness: 50 };
  const religious = equilibre?.religion || { piete: 50, traditions: 50, superstition: 50, piety: 50 };
  const social = equilibre?.social || { plebeiens: 50, patriciens: 50, esclaves: 50, cohesion: 50 };

  // Type safety for stabilite property with explicit defaults for required properties
  const stability = typeof equilibre?.stabilite === 'number' 
    ? { value: equilibre.stabilite, trend: 'stable', index: 50, crisisRisk: 10, senat: 50, lois: 50 } 
    : equilibre?.stabilite || { value: 50, trend: 'stable', index: 50, crisisRisk: 10, senat: 50, lois: 50 };

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord du Maître du Jeu</h1>
          <p className="text-muted-foreground">
            Gérez l'équilibre de Rome, les événements et suivez la progression des joueurs
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xl font-medium">{formattedDate}</div>
            <div className="text-sm text-muted-foreground">
              Phase: {currentDate.phase || 'Standard'}
            </div>
          </div>
          <Button onClick={handleAdvancePhase}>
            Avancer la phase
          </Button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex justify-between">
              <span>État de la République</span>
              <Badge 
                variant={stability.value > 70 ? "success" : stability.value > 40 ? "default" : "destructive"}
              >
                {stability.value > 70 ? "Stable" : stability.value > 40 ? "Fragile" : "Instable"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Stabilité globale</span>
                  <span className="text-sm">{stability.value}%</span>
                </div>
                <ProgressBar 
                  value={stability.value || 0} 
                  max={100}
                  indicatorClassName={stability.value > 70 ? "bg-green-500" : stability.value > 40 ? "bg-yellow-500" : "bg-red-500"}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Sénat: {stability.senat || 0}</span>
                  <span>Lois: {stability.lois || 0}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Équilibre politique</span>
                  <span className="text-sm">{political.stability || 50}%</span>
                </div>
                <ProgressBar 
                  value={political.stability || 50} 
                  max={100}
                  indicatorClassName="bg-blue-500"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Populares: {political.populares || 0}</span>
                  <span>Optimates: {political.optimates || 0}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Économie</span>
                  <span className="text-sm">{economy.prosperity || 50}%</span>
                </div>
                <ProgressBar 
                  value={economy.prosperity || 50} 
                  max={100}
                  indicatorClassName="bg-yellow-500"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Commerce: {economy.commerce}</span>
                  <span>Agriculture: {economy.agriculture}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Armée</span>
                  <span className="text-sm">{military.readiness || 50}%</span>
                </div>
                <ProgressBar 
                  value={military.readiness || 50} 
                  max={100}
                  indicatorClassName="bg-red-500"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Morale: {military.morale}</span>
                  <span>Effectifs: {military.effectifs}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Religion</span>
                  <span className="text-sm">{religious.piete || 50}%</span>
                </div>
                <ProgressBar 
                  value={religious.piete || 50} 
                  max={100}
                  indicatorClassName="bg-purple-500"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Traditions: {religious.traditions}</span>
                  <span>Superstition: {religious.superstition}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Joueurs & Sénateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Sénateurs actifs:</span>
                <Badge variant="outline">{senatorsCount}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Clients en jeu:</span>
                <Badge variant="outline">{clientsCount}</Badge>
              </div>
              <div className="mt-4">
                <Button className="w-full" variant="outline">
                  Gérer les joueurs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="border-l-2 border-muted pl-3 py-1">
                <div className="text-sm font-medium">Nouvelle loi proposée</div>
                <div className="text-xs text-muted-foreground">Il y a 2 heures</div>
              </div>
              <div className="border-l-2 border-muted pl-3 py-1">
                <div className="text-sm font-medium">Magistrat élu</div>
                <div className="text-xs text-muted-foreground">Il y a 1 jour</div>
              </div>
              <div className="border-l-2 border-muted pl-3 py-1">
                <div className="text-sm font-medium">Révolte d'esclaves</div>
                <div className="text-xs text-muted-foreground">Il y a 3 jours</div>
              </div>
              <div className="mt-4">
                <Button className="w-full" variant="outline">
                  Voir l'historique
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EquilibreModule />
        <EventsModule />
      </div>
    </div>
  );
};
