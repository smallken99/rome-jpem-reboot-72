
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from './context';
import { GameMetrics } from './components/dashboard/GameMetrics';
import { DashboardCalendar } from './components/dashboard/DashboardCalendar';
import EquilibreModule from './components/equilibre/EquilibreModule';
import EventsModule from './components/evenements/EventsModule';
import { GamePhase } from './types/common';
import { ProgressBar } from '@/components/ui/progress-bar';

export const MaitreJeuWelcome: React.FC = () => {
  // Use MaitreJeu context with safe property access
  const { 
    currentDate, 
    equilibre,
    senateurs = [],
    clients = [],
    advancePhase,
  } = useMaitreJeu();
  
  // Count metrics safely
  const senatorsCount = senateurs?.length || 0;
  const clientsCount = clients?.length || 0;

  // Local state for phase transition UI
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState('');

  // Handle phase advancement
  const handleAdvancePhase = () => {
    setIsTransitioning(true);
    setTransitionMessage('Préparation de la prochaine phase...');
    
    // Simulate phase transition with timeout
    setTimeout(() => {
      try {
        if (advancePhase) {
          advancePhase(GamePhase.NORMAL);
        }
        setTransitionMessage('Phase avancée avec succès !');
        
        // Reset transition state after showing success
        setTimeout(() => {
          setIsTransitioning(false);
          setTransitionMessage('');
        }, 1500);
      } catch (error) {
        console.error('Error advancing phase:', error);
        setTransitionMessage('Erreur lors de l\'avancement de phase');
        
        // Reset on error as well
        setTimeout(() => {
          setIsTransitioning(false);
          setTransitionMessage('');
        }, 2000);
      }
    }, 1000);
  };

  // Derive phase status for UI
  const getPhaseStatusColor = () => {
    if (!currentDate || !currentDate.phase) return "default";
    
    switch (currentDate.phase) {
      case 'war':
      case 'crisis':
      case 'revolt':
        return "destructive";
      case 'triumph':
      case 'games':
        return "success";
      default:
        return "default";
    }
  };

  // Safe access to stabilite properties
  const stabiliteValue = equilibre?.stabilite;
  const senatValue = typeof stabiliteValue === 'object' ? stabiliteValue?.senat || 0 : 0;
  const loisValue = typeof stabiliteValue === 'object' ? stabiliteValue?.lois || 0 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue au panneau de contrôle du Maître de Jeu de Rome JPEM.
          </p>
        </div>
        
        <Button 
          onClick={handleAdvancePhase}
          disabled={isTransitioning}
          variant={isTransitioning ? "outline" : "default"}
        >
          {isTransitioning ? transitionMessage : "Avancer la phase de jeu"}
        </Button>
      </div>

      <GameMetrics 
        metrics={[
          { name: "Année", value: currentDate?.year?.toString() || "250", description: "Année actuelle" },
          { name: "Saison", value: currentDate?.season || "Ver", description: "Saison actuelle" },
          { name: "Phase", value: currentDate?.phase || "normal", description: "Phase de jeu actuelle", status: getPhaseStatusColor() },
          { name: "Sénateurs", value: senatorsCount.toString(), description: "Nombre de sénateurs actifs" },
          { name: "Clients", value: clientsCount.toString(), description: "Nombre de clients actifs" }
        ]}
      />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <EquilibreModule simplified />
        <EventsModule />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>État de la République</CardTitle>
            <CardDescription>Indicateurs clés de l'état actuel de Rome</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Stabilité du Sénat</span>
                  <span className="text-sm font-medium">{senatValue}%</span>
                </div>
                <ProgressBar value={senatValue} max={100} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Respect des lois</span>
                  <span className="text-sm font-medium">{loisValue}%</span>
                </div>
                <ProgressBar value={loisValue} max={100} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Calendrier</CardTitle>
            <CardDescription>Gestion du temps de jeu</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardCalendar currentDate={currentDate} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
