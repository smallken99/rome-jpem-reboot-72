import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from './context';
import { Trophy, Users, Landmark, MapPin, Scroll, ArrowRight, Sword, Book, Scale, GanttChart } from 'lucide-react';
import { formatSeasonDisplay } from '@/utils/timeSystem';
import { LoiState } from './types/lois';

export const MaitreJeuWelcome = () => {
  const { 
    currentYear, 
    currentSeason,
    equilibre,
    senateurs,
    provinces,
    evenements,
    lois,
    currentPhase
  } = useMaitreJeu();
  
  // Statistiques calculées
  const activeSenatorsCount = senateurs.filter(s => s.actif).length;
  const pendingEventsCount = evenements.filter(e => !e.resolved).length;
  
  // Check for proposed laws using either état or state property
  const proposedLawsCount = lois.filter(l => {
    return l.état === LoiState.PROPOSED || 
           l.état === "proposed" || 
           l.état === "Proposée" || 
           l.state === "proposed";
  }).length;
  
  // Formatage de la date et phase actuelle
  const formattedSeason = formatSeasonDisplay(currentSeason);
  
  const getPhaseTranslation = (phase: string) => {
    const translations: Record<string, string> = {
      'SENATE': 'Sénat',
      'ECONOMY': 'Économie',
      'ELECTION': 'Élections',
      'DIPLOMACY': 'Diplomatie',
      'MILITARY': 'Militaire',
      'RELIGION': 'Religion',
      'VOTE': 'Vote',
      'ACTIONS': 'Actions',
      'EVENTS': 'Événements'
    };
    return translations[phase] || phase;
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Bienvenue dans la Console du Maître de Jeu</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Gérez tous les aspects de la République Romaine, depuis les sénateurs jusqu'aux lois et événements historiques.
        </p>
      </div>
      
      <Card className="bg-primary/5 border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle>État actuel de la République</CardTitle>
          <CardDescription>
            Année {currentYear} AUC - {formattedSeason} - Phase: {getPhaseTranslation(currentPhase)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background rounded-lg p-4 border shadow-sm">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">Sénateurs</span>
              </div>
              <div className="text-2xl font-bold">{activeSenatorsCount}</div>
              <div className="text-sm text-muted-foreground">sénateurs actifs</div>
            </div>
            
            <div className="bg-background rounded-lg p-4 border shadow-sm">
              <div className="flex items-center gap-2 text-primary mb-2">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Provinces</span>
              </div>
              <div className="text-2xl font-bold">{provinces.length}</div>
              <div className="text-sm text-muted-foreground">territoires romains</div>
            </div>
            
            <div className="bg-background rounded-lg p-4 border shadow-sm">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Scroll className="h-5 w-5" />
                <span className="font-medium">Événements</span>
              </div>
              <div className="text-2xl font-bold">{pendingEventsCount}</div>
              <div className="text-sm text-muted-foreground">en attente de résolution</div>
            </div>
            
            <div className="bg-background rounded-lg p-4 border shadow-sm">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Landmark className="h-5 w-5" />
                <span className="font-medium">Lois</span>
              </div>
              <div className="text-2xl font-bold">{proposedLawsCount}</div>
              <div className="text-sm text-muted-foreground">propositions actives</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Équilibre Politique</CardTitle>
            <CardDescription>
              Répartition actuelle des forces au Sénat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Optimates</span>
                  <span className="text-sm font-medium">{equilibre.optimates}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full" 
                    style={{ width: `${equilibre.optimates}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Populares</span>
                  <span className="text-sm font-medium">{equilibre.populares || equilibre.populaires}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-red-600 rounded-full" 
                    style={{ width: `${equilibre.populares || equilibre.populaires}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Modérés</span>
                  <span className="text-sm font-medium">{equilibre.moderates}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-green-600 rounded-full" 
                    style={{ width: `${equilibre.moderates}%` }}
                  ></div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-2">
                <GanttChart className="h-4 w-4 mr-2" />
                Voir l'Équilibre Complet
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Sections Principales</CardTitle>
            <CardDescription>
              Accès rapide aux fonctionnalités du Maître de Jeu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center">
                <Users className="h-5 w-5 mb-1" />
                <span>Sénateurs</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center">
                <Landmark className="h-5 w-5 mb-1" />
                <span>Lois</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center">
                <Sword className="h-5 w-5 mb-1" />
                <span>Provinces</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center">
                <Scale className="h-5 w-5 mb-1" />
                <span>Économie</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center">
                <Trophy className="h-5 w-5 mb-1" />
                <span>Familles</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-3 flex flex-col items-center justify-center">
                <Book className="h-5 w-5 mb-1" />
                <span>Histoire</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Démarrer une Nouvelle Session</CardTitle>
          <CardDescription>
            Préparez votre prochaine session de jeu avec les joueurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button className="flex items-center">
              <span>Avancer le temps</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            
            <Button variant="outline" className="flex items-center">
              <span>Créer un événement</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            
            <Button variant="outline" className="flex items-center">
              <span>Gérer les élections</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
