
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronsUp, Bookmark, History, BarChart3, AlertTriangle } from 'lucide-react';
import { useMaitreJeu } from './context';
import { PoliticalEventsTimeline } from './components/PoliticalEventsTimeline';
import { RiskFactorsList } from './components/RiskFactorsList';
import { PoliticalBalanceCard } from './components/equilibre/PoliticalBalanceCard';
import { SocialStabilityCard } from './components/equilibre/SocialStabilityCard';
import { EconomicStabilityCard } from './components/equilibre/EconomicStabilityCard';
import { MilitaryLoyalty } from './components/equilibre/MilitaryLoyalty';
import { RecentEventsTable } from './components/equilibre/RecentEventsTable';
import { EquilibreChart } from './components/equilibre/EquilibreChart';
import { ThreatAssessment } from './components/equilibre/ThreatAssessment';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { PoliticalEvent, RiskFactor, Equilibre } from './types/equilibre';
import { toast } from 'sonner';

export const GestionEquilibre = () => {
  const { equilibre, updateEquilibre, updateFactionBalance } = useMaitreJeu();
  const [activeTab, setActiveTab] = useState('apercu');
  
  // Données fictives pour démonstration
  const politicalEvents: PoliticalEvent[] = [
    {
      id: '1',
      title: 'Réforme agraire de Tiberius Gracchus',
      description: 'Distribution de terres publiques aux citoyens sans terre',
      type: 'politique',
      date: { year: 621, season: 'Aestas' },
      importance: 'haute',
      severity: 'high',
      impact: {
        populares: 15,
        optimates: -10,
        plébéiens: 20,
        patriciens: -5
      }
    },
    {
      id: '2',
      title: 'Victoire en Hispanie',
      description: 'Défaite décisive des forces de Viriathe en Lusitanie',
      type: 'militaire',
      date: { year: 622, season: 'Ver' },
      importance: 'normale',
      severity: 'medium',
      impact: {
        armée: 10,
        morale: 15,
        loyauté: 5
      }
    },
    {
      id: '3',
      title: 'Traité avec Pergame',
      description: 'Le roi Attale III lègue son royaume à Rome',
      type: 'diplomatique',
      date: { year: 621, season: 'Hiems' },
      importance: 'haute',
      severity: 'high',
      impact: {
        économie: 15,
        populares: 5,
        optimates: 10
      }
    },
    {
      id: '4',
      title: 'Émeutes frumentaires à Rome',
      description: 'Protestations violentes liées à la pénurie de blé',
      type: 'sociale',
      date: { year: 623, season: 'Aestas' },
      importance: 'normale',
      severity: 'medium',
      impact: {
        plébéiens: -15,
        populares: 10,
        économie: -5
      }
    },
    {
      id: '5',
      title: 'Réforme judiciaire',
      description: 'Expansion des tribunaux permanents',
      type: 'politique',
      date: { year: 623, season: 'Autumnus' },
      importance: 'normale',
      severity: 'low',
      impact: {
        optimates: 5,
        patriciens: 10
      }
    }
  ];
  
  const riskFactors: RiskFactor[] = [
    {
      id: '1',
      name: 'Pénurie alimentaire',
      severity: 'high',
      description: 'Les réserves de grain sont dangereusement basses',
      level: 75,
      type: 'economic',
      impact: { foodSupply: -20, publicOrder: -15 },
      trend: 'increasing'
    },
    {
      id: '2',
      name: 'Mécontentement militaire',
      severity: 'medium',
      description: 'Plusieurs légions attendent leur solde',
      level: 50,
      type: 'military',
      impact: { militaryStrength: -10, loyalty: -15 },
      trend: 'stable'
    },
    {
      id: '3',
      name: 'Tensions avec Carthage',
      severity: 'low',
      description: 'Incidents frontaliers mineurs signalés',
      level: 25,
      type: 'diplomatic',
      impact: { stability: -5 },
      trend: 'decreasing'
    }
  ];
  
  // Handlers pour les mises à jour d'équilibre
  const handleFactionUpdate = (populares: number, optimates: number, moderates: number) => {
    updateFactionBalance(populares, optimates, moderates);
    toast.success("Équilibre des factions mis à jour", {
      description: `Populares: ${populares}, Optimates: ${optimates}, Modérés: ${moderates}`
    });
  };
  
  const handleSocialUpdate = (patriciens: number, plébéiens: number) => {
    const updatedEquilibre: Partial<Equilibre> = {
      patricians: patriciens,
      plebeians: plébéiens,
      patriciens,
      plébéiens,
      facteurPatriciens: patriciens,
      facteurPlebs: plébéiens
    };
    updateEquilibre(updatedEquilibre);
    toast.success("Facteurs sociaux mis à jour");
  };
  
  const handleEconomicUpdate = (economie: number) => {
    const updatedEquilibre: Partial<Equilibre> = {
      economy: economie,
      économie: economie,
      economicStability: economie
    };
    updateEquilibre(updatedEquilibre);
    toast.success("Facteur économique mis à jour");
  };
  
  const handleMilitaryUpdate = (armée: number, loyauté: number, morale: number) => {
    const updatedEquilibre: Partial<Equilibre> = {
      militaryStrength: armée,
      armée,
      loyauté,
      morale,
      facteurMilitaire: armée
    };
    updateEquilibre(updatedEquilibre);
    toast.success("Facteurs militaires mis à jour");
  };

  // Format date handler for RecentEventsTable
  const formatDate = (date: any) => {
    if (typeof date === 'string') return date;
    if (date && date.year && date.season) return `${date.year} - ${date.season}`;
    return '';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Équilibre de la République</h1>
          <p className="text-muted-foreground">
            Surveillez et ajustez les forces politiques et sociales de Rome
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Bookmark className="h-4 w-4" />
            <span>Sauvegarder l'état actuel</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <History className="h-4 w-4" />
            <span>Historique des changements</span>
          </Button>
          <Button className="gap-2">
            <ChevronsUp className="h-4 w-4" />
            <span>Calculer l'impact</span>
          </Button>
        </div>
      </div>
      
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>
          Les modifications de l'équilibre peuvent avoir des conséquences importantes sur le jeu et déclencher des événements.
        </AlertDescription>
      </Alert>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="apercu">Aperçu</TabsTrigger>
          <TabsTrigger value="politique">Politique</TabsTrigger>
          <TabsTrigger value="social">Social et Économique</TabsTrigger>
          <TabsTrigger value="militaire">Militaire</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apercu" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Équilibre des Factions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium text-5xl text-center mb-4 text-blue-600">
                  {equilibre.optimates}%
                </div>
                <div className="relative h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-blue-600 left-0"
                    style={{ width: `${equilibre.optimates}%` }}
                  />
                  <div
                    className="absolute h-full bg-green-500 left-0"
                    style={{ width: `${equilibre.moderates}%`, marginLeft: `${equilibre.optimates}%` }}
                  />
                  <div
                    className="absolute h-full bg-red-500 right-0"
                    style={{ width: `${equilibre.populaires || equilibre.populares}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Optimates</span>
                  <span>Modérés</span>
                  <span>Populares</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Stabilité Sociale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground text-sm">Patriciens</span>
                    <div className="font-medium text-3xl text-indigo-600">
                      {equilibre.patriciens || equilibre.patricians}%
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Plébéiens</span>
                    <div className="font-medium text-3xl text-amber-600">
                      {equilibre.plébéiens || equilibre.plebeians}%
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <span className="text-muted-foreground text-sm">Stabilité Économique</span>
                  <div className="font-medium text-3xl text-emerald-600">
                    {equilibre.économie || equilibre.economy}%
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Forces Militaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground text-sm">Puissance</span>
                    <div className="font-medium text-3xl text-red-600">
                      {equilibre.armée || equilibre.militaryStrength}%
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Loyauté</span>
                    <div className="font-medium text-3xl text-purple-600">
                      {equilibre.loyauté}%
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div>
                  <span className="text-muted-foreground text-sm">Morale</span>
                  <div className="font-medium text-3xl text-cyan-600">
                    {equilibre.morale}%
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des facteurs</CardTitle>
                <CardDescription>
                  Visualisation des changements d'équilibre au fil du temps
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] relative">
                <EquilibreChart data={[]} />
              </CardContent>
            </Card>
            
            <PoliticalEventsTimeline events={politicalEvents} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <RecentEventsTable events={politicalEvents} formatDate={formatDate} />
            </div>
            
            <RiskFactorsList factors={riskFactors} />
          </div>
        </TabsContent>
        
        <TabsContent value="politique" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PoliticalBalanceCard 
              equilibre={equilibre} 
              onUpdate={handleFactionUpdate} 
            />
            <ThreatAssessment threats={[]} />
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SocialStabilityCard 
              equilibre={equilibre} 
              onUpdate={handleSocialUpdate} 
            />
            <EconomicStabilityCard 
              equilibre={equilibre} 
              onUpdate={handleEconomicUpdate} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="militaire" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MilitaryLoyalty 
              equilibre={equilibre}
              onUpdate={handleMilitaryUpdate}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
