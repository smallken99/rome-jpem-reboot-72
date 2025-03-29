import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useGameTime } from '@/hooks/useGameTime';
import { PoliticalBalanceCard } from './components/equilibre/PoliticalBalanceCard';
import { SocialStabilityCard } from './components/equilibre/SocialStabilityCard';
import { EconomicStabilityCard } from './components/equilibre/EconomicStabilityCard';
import { RecentEventsTable } from './components/equilibre/RecentEventsTable';
import { Equilibre, PoliticalEvent, HistoriqueEntry } from '@/types/game';
import { toast } from 'sonner';

// État initial simulé
const initialEquilibre: Equilibre = {
  economie: 65,
  militaire: 80,
  religion: 85,
  politique: {
    populaires: 35,
    optimates: 40,
    moderates: 25
  },
  social: {
    patriciens: 30,
    plébéiens: 70
  },
  population: 1000000, // Population totale estimée
  stability: 70,
  armée: 80,
  loyauté: 75,
  morale: 60,
  facteurJuridique: 65,
  risques: [
    {
      id: 'risk-1',
      name: 'Mécontentement plébéien',
      level: 'Modéré',
      type: 'social',
      description: 'Grogne croissante chez les plébéiens face aux inégalités',
      threat: 40
    },
    {
      id: 'risk-2',
      name: 'Corruption administrative',
      level: 'Faible',
      type: 'politique',
      description: 'Détournements de fonds dans certaines provinces',
      threat: 25
    }
  ],
  historique: [
    {
      id: 'event-1',
      date: new Date(43, 2, 15),
      event: 'Révolte d\'esclaves en Sicile',
      impact: -15,
      type: 'social'
    },
    {
      id: 'event-2',
      date: new Date(43, 5, 10),
      event: 'Victoire militaire en Gaule',
      impact: 20,
      type: 'militaire'
    },
    {
      id: 'event-3',
      date: new Date(43, 9, 5),
      event: 'Nouvelle taxe commerciale',
      impact: 5,
      type: 'économique'
    }
  ]
};

const recentEvents: PoliticalEvent[] = [
  {
    id: 'pol-event-1',
    title: 'Discours de Caton au Sénat',
    date: new Date(43, 11, 10),
    description: 'Critique virulente des populares',
    impact: { politique: { populaires: -5 } },
    type: 'politique',
    importance: 'medium'
  },
  {
    id: 'pol-event-2',
    title: 'Élection des consuls',
    date: new Date(44, 0, 1),
    description: 'Victoire des optimates',
    impact: { politique: { optimates: 10 } },
    type: 'politique',
    importance: 'high'
  }
];

export const GestionEquilibre: React.FC = () => {
  const [activeTab, setActiveTab] = useState('apercu');
  const [equilibre, setEquilibre] = useState<Equilibre>(initialEquilibre);
  const [currentThreats, setCurrentThreats] = useState(equilibre.risques || []);
  const { year, season } = useGameTime();
  
  // Mise à jour de l'équilibre politique
  const handleUpdatePolitical = (values: { populaires: number; optimates: number; moderates: number; }) => {
    setEquilibre(prev => ({
      ...prev,
      politique: {
        populaires: values.populaires,
        optimates: values.optimates,
        moderates: values.moderates
      }
    }));
    toast.success('Équilibre politique mis à jour');
  };
  
  // Mise à jour de l'équilibre social
  const handleUpdateSocial = (values: { patriciens: number; plébéiens: number; }) => {
    setEquilibre(prev => ({
      ...prev,
      social: {
        patriciens: values.patriciens,
        plébéiens: values.plébéiens
      }
    }));
    toast.success('Équilibre social mis à jour');
  };
  
  // Mise à jour de l'économie
  const handleUpdateEconomy = (economie: number) => {
    setEquilibre(prev => ({
      ...prev,
      economie,
      economy: economie // Mise à jour de l'alias également
    }));
    toast.success('Économie mise à jour');
  };
  
  // Ajout d'un événement à l'historique
  const handleAddEvent = (event: string, impact: number, type: string) => {
    const newEvent = {
      id: `event-${equilibre.historique ? equilibre.historique.length + 1 : 1}`,
      date: new Date(),
      event,
      impact,
      type
    };
    
    setEquilibre(prev => ({
      ...prev,
      historique: prev.historique ? [newEvent, ...prev.historique.slice(0, 9)] : [newEvent] // Garder les 10 derniers événements
    }));
    
    toast.success('Événement ajouté à l\'historique');
  };
  
  // Ajout d'un facteur de risque
  const handleAddRisk = (name: string, level: string, type: string, description: string, threat: number) => {
    const newRisk = {
      id: `risk-${equilibre.risques ? equilibre.risques.length + 1 : 1}`,
      name,
      level,
      type,
      description,
      threat
    };
    
    setEquilibre(prev => ({
      ...prev,
      risques: prev.risques ? [...prev.risques, newRisk] : [newRisk]
    }));
    
    toast.success('Facteur de risque ajouté');
  };
  
  // Calcul de la stabilité globale
  const calculateGlobalStability = () => {
    // Calcul simplifié pour l'exemple
    const politicalBalance = 
      equilibre.politique.moderates * 0.8 + 
      Math.min(equilibre.politique.populaires, equilibre.politique.optimates) * 0.4;
    
    const socialBalance = 
      Math.min(equilibre.social.patriciens, equilibre.social.plébéiens) * 1.5;
    
    const riskFactor = equilibre.risques ? 
      equilibre.risques.reduce((sum, risk) => sum + risk.threat, 0) / 10 : 0;
    
    let stability = 
      (politicalBalance + socialBalance + equilibre.economie * 1.2 + 
       (equilibre.armée || 0) * 0.7 + (equilibre.loyauté || 0) * 0.8 + 
       equilibre.religion * 0.5 + (equilibre.facteurJuridique || 0) * 0.6) / 7;
    
    stability = Math.max(0, Math.min(100, stability - riskFactor));
    
    return Math.round(stability);
  };
  
  // Mettre à jour la stabilité globale lors des changements
  useEffect(() => {
    setEquilibre(prev => ({
      ...prev,
      stability: calculateGlobalStability()
    }));
  }, [
    equilibre.politique, 
    equilibre.social, 
    equilibre.economie, 
    equilibre.armée,
    equilibre.loyauté,
    equilibre.religion,
    equilibre.facteurJuridique,
    equilibre.risques
  ]);
  
  return (
    <Layout>
      <PageHeader 
        title="Gestion de l'Équilibre"
        subtitle="Surveiller et ajuster l'équilibre politique, économique et social de Rome"
      />
      
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-base py-1.5 px-3">
            {season.charAt(0).toUpperCase() + season.slice(1)} {year} a.C.
          </Badge>
          <Button 
            variant="default"
            onClick={() => {
              handleAddEvent(
                'Mise à jour saisonnière des statistiques', 
                Math.floor(Math.random() * 10) - 5, 
                'administratif'
              );
            }}
          >
            Mise à jour saisonnière
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="apercu">Aperçu</TabsTrigger>
          <TabsTrigger value="politique">Politique</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="economie">Économie</TabsTrigger>
          <TabsTrigger value="historique">Historique</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apercu">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stabilité Globale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="relative w-36 h-36 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        className="text-gray-200" 
                        strokeWidth="8" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="40" 
                        cx="50" 
                        cy="50" 
                      />
                      <circle 
                        className={`${
                          equilibre.stability > 70 
                            ? 'text-green-500' 
                            : equilibre.stability > 40 
                              ? 'text-yellow-500' 
                              : 'text-red-500'
                        }`} 
                        strokeWidth="8" 
                        strokeDasharray={`${equilibre.stability * 2.5} 250`}
                        strokeLinecap="round" 
                        stroke="currentColor" 
                        fill="transparent" 
                        r="40" 
                        cx="50" 
                        cy="50" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{equilibre.stability}%</span>
                    </div>
                  </div>
                  
                  <h3 className="mt-4 text-lg font-medium">
                    {equilibre.stability > 70 
                      ? 'Stable' 
                      : equilibre.stability > 40 
                        ? 'Précaire' 
                        : 'Critique'}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {equilibre.stability > 70 
                      ? 'La République est stable, les institutions fonctionnent bien.' 
                      : equilibre.stability > 40 
                        ? 'Des tensions existent, mais la situation reste sous contrôle.' 
                        : 'La République est au bord de la crise, des mesures drastiques sont nécessaires.'}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Facteurs d'influence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Équilibre politique</span>
                      <span className="text-sm font-medium">
                        {(equilibre.politique.populaires + equilibre.politique.optimates + equilibre.politique.moderates) / 3}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(equilibre.politique.populaires + equilibre.politique.optimates + equilibre.politique.moderates) / 3}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Économie</span>
                      <span className="text-sm font-medium">{equilibre.economie}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${equilibre.economie}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Force militaire</span>
                      <span className="text-sm font-medium">{equilibre.armée}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${equilibre.armée}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Loyauté des provinces</span>
                      <span className="text-sm font-medium">{equilibre.loyauté}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${equilibre.loyauté}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Religion et piété</span>
                      <span className="text-sm font-medium">{equilibre.religion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-amber-500 h-2 rounded-full" 
                        style={{ width: `${equilibre.religion}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Menaces actuelles</CardTitle>
              </CardHeader>
              <CardContent>
                {currentThreats.length > 0 ? (
                  <div className="space-y-4">
                    {currentThreats.map(threat => (
                      <div key={threat.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{threat.name}</h3>
                            <p className="text-sm text-muted-foreground">{threat.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="capitalize">{threat.type}</Badge>
                            <Badge 
                              className={
                                threat.threat > 60 
                                  ? 'bg-red-100 text-red-800'
                                  : threat.threat > 30
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-blue-100 text-blue-800'
                              }
                            >
                              {threat.level}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-muted-foreground">Niveau de menace</span>
                            <span className="text-xs font-medium">{threat.threat}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                threat.threat > 60 
                                  ? 'bg-red-500'
                                  : threat.threat > 30
                                    ? 'bg-yellow-500'
                                    : 'bg-blue-500'
                              }`}
                              style={{ width: `${threat.threat}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>Aucune menace significative actuellement.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="politique">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PoliticalBalanceCard 
              populaires={equilibre.politique.populaires}
              optimates={equilibre.politique.optimates}
              moderates={equilibre.politique.moderates}
              onUpdate={handleUpdatePolitical}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Événements politiques récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                        <Badge 
                          className={event.impact.politique?.populaires > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {event.impact.politique?.populaires > 0 ? `+${event.impact.politique?.populaires}` : event.impact.politique?.populaires}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        {event.date.toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="social">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SocialStabilityCard 
              social={equilibre.social} 
              onUpdate={handleUpdateSocial}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Démographie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold">
                      {(equilibre.population as number).toLocaleString()}
                    </span>
                    <p className="text-sm text-muted-foreground">Population estimée</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <span className="text-xl font-medium">
                        {Math.round(equilibre.social.patriciens / 100 * (equilibre.population as number)).toLocaleString()}
                      </span>
                      <p className="text-sm text-muted-foreground">Patriciens</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xl font-medium">
                        {Math.round(equilibre.social.plébéiens / 100 * (equilibre.population as number)).toLocaleString()}
                      </span>
                      <p className="text-sm text-muted-foreground">Plébéiens</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 mt-4">
                    <h3 className="text-sm font-medium">Facteurs d'influence sociale</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Morale publique</span>
                        <span>{equilibre.morale}%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Respect de la loi</span>
                        <span>{equilibre.facteurJuridique}%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tensions sociales</span>
                        <span>
                          {Math.abs(equilibre.social.patriciens - equilibre.social.plébéiens)}%
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="economie">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EconomicStabilityCard 
              economie={equilibre.economie} 
              onUpdate={handleUpdateEconomy}
              equilibre={equilibre}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Indicateurs économiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Commerce maritime</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-blue-500 h-2.5 rounded-full" 
                          style={{ width: `${70 + Math.floor(Math.random() * 20)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">Fort</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Production agricole</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-green-500 h-2.5 rounded-full" 
                          style={{ width: `${60 + Math.floor(Math.random() * 20)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">Satisfaisante</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Artisanat et industrie</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-amber-500 h-2.5 rounded-full" 
                          style={{ width: `${50 + Math.floor(Math.random() * 20)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">Modérée</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Trésor public</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-purple-500 h-2.5 rounded-full" 
                          style={{ width: `${45 + Math.floor(Math.random() * 25)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">Stable</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Inflation</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-red-500 h-2.5 rounded-full" 
                          style={{ width: `${20 + Math.floor(Math.random() * 15)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">Faible</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="historique">
          <Card>
            <CardHeader>
              <CardTitle>Historique des événements</CardTitle>
            </CardHeader>
            <CardContent>
              {equilibre.historique && (
                <RecentEventsTable events={equilibre.historique.map(entry => ({
                  id: entry.id,
                  title: entry.event,
                  description: entry.type,
                  date: entry.date,
                  impact: { [entry.type]: entry.impact },
                  type: entry.type,
                  importance: entry.impact > 0 ? 'high' : 'medium'
                }))} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};
