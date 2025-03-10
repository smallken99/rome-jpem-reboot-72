
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building, 
  Landmark, 
  Scroll, 
  Scale, 
  Users, 
  Gavel, 
  Shield,
  Coins,
  Globe
} from 'lucide-react';
import { MagistraturesList } from './components/republique/MagistraturesList';
import { InstitutsConseil } from './components/republique/InstitutsConseil';
import { SenatFactions } from './components/republique/SenatFactions';
import { useMaitreJeu } from './context';

export const GestionRepublique = () => {
  const [activeTab, setActiveTab] = useState('fonctionnement');
  const { currentYear, currentPhase } = useMaitreJeu();
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion de la République</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Période actuelle</SelectItem>
              <SelectItem value="historical">Contexte historique</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            État d'urgence
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="fonctionnement" className="flex-1">
            <Landmark className="h-4 w-4 mr-2" />
            Fonctionnement
          </TabsTrigger>
          <TabsTrigger value="senat" className="flex-1">
            <Users className="h-4 w-4 mr-2" />
            Sénat
          </TabsTrigger>
          <TabsTrigger value="magistratures" className="flex-1">
            <Gavel className="h-4 w-4 mr-2" />
            Magistratures
          </TabsTrigger>
          <TabsTrigger value="institutions" className="flex-1">
            <Building className="h-4 w-4 mr-2" />
            Institutions
          </TabsTrigger>
          <TabsTrigger value="relations" className="flex-1">
            <Globe className="h-4 w-4 mr-2" />
            Relations extérieures
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="fonctionnement" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Structure de la République</CardTitle>
                <CardDescription>Vue d'ensemble des institutions romaines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Hiérarchie institutionnelle</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Assemblées populaires (Comices)</li>
                      <li>Sénat</li>
                      <li>Magistratures</li>
                      <li>Sacerdoces</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Principes de gouvernance</h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Collégialité (pouvoir partagé)</li>
                      <li>Annualité (mandats limités)</li>
                      <li>Gratuité (service sans solde)</li>
                      <li>Veto et intercession</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Équilibre des pouvoirs</CardTitle>
                <CardDescription>Tensions politiques actuelles</CardDescription>
              </CardHeader>
              <CardContent>
                <SenatFactions />
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Scroll className="h-5 w-5 mr-2 text-amber-500" />
                  Lois récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm">
                    <span className="font-semibold">Lex Claudia de navigiis</span>
                    <p className="text-muted-foreground">
                      Limitation du commerce maritime pour les sénateurs
                    </p>
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Lex Rubria de colonis</span>
                    <p className="text-muted-foreground">
                      Établissement de nouvelles colonies
                    </p>
                  </li>
                </ul>
                <Button variant="link" size="sm" className="mt-2 px-0">
                  Voir toutes les lois
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Scale className="h-5 w-5 mr-2 text-blue-500" />
                  Procès importants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm">
                    <span className="font-semibold">Procès de Quintus Servilius</span>
                    <p className="text-muted-foreground">
                      Accusation de concussion dans la province d'Hispanie
                    </p>
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold">Procès de Marcus Aelius</span>
                    <p className="text-muted-foreground">
                      Accusation de trahison envers la République
                    </p>
                  </li>
                </ul>
                <Button variant="link" size="sm" className="mt-2 px-0">
                  Voir tous les procès
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-yellow-500" />
                  Trésor public
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Balance actuelle:</span>
                    <span className="font-semibold">8,250,000 sesterces</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Revenus annuels:</span>
                    <span className="font-semibold">2,100,000 sesterces</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Dépenses annuelles:</span>
                    <span className="font-semibold">1,830,000 sesterces</span>
                  </div>
                </div>
                <Button variant="link" size="sm" className="mt-2 px-0">
                  Gérer le trésor
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="senat" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Composition du Sénat</CardTitle>
                <CardDescription>Vue d'ensemble des membres du Sénat et leurs affiliations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="font-medium">Effectif total: 300 sénateurs</h3>
                      <p className="text-sm text-muted-foreground">Dernière révision du Sénat: {currentYear - 2}</p>
                    </div>
                    <Button variant="outline">Révision de la liste sénatoriale</Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-3 bg-muted/30">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">120</div>
                        <div className="text-sm font-medium">Optimates</div>
                      </div>
                    </div>
                    <div className="border rounded-md p-3 bg-muted/30">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">105</div>
                        <div className="text-sm font-medium">Populares</div>
                      </div>
                    </div>
                    <div className="border rounded-md p-3 bg-muted/30">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">75</div>
                        <div className="text-sm font-medium">Modérés</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Distribution par rang</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Consulaires</span>
                        <span className="text-lg font-bold">18</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Prétoriens</span>
                        <span className="text-lg font-bold">42</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Édiliciens</span>
                        <span className="text-lg font-bold">56</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Tribuniciens</span>
                        <span className="text-lg font-bold">62</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Questoriens</span>
                        <span className="text-lg font-bold">84</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Pedarii</span>
                        <span className="text-lg font-bold">38</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Procédures du Sénat</CardTitle>
                <CardDescription>Gestion des sessions et discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Prochaines sessions</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between text-sm">
                        <span>Débat sur la guerre en Gaule</span>
                        <span className="text-muted-foreground">3 jours</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>Vote sur la Lex Fabia</span>
                        <span className="text-muted-foreground">7 jours</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>Allocation des provinces</span>
                        <span className="text-muted-foreground">12 jours</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Scroll className="h-4 w-4 mr-2" />
                        Planifier une session
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Gavel className="h-4 w-4 mr-2" />
                        Émettre un sénatus-consulte
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Gérer les présences
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="magistratures" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Magistratures actuelles</CardTitle>
              <CardDescription>Offices et postes de la République pour l'année {currentYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <MagistraturesList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="institutions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Institutions et conseils</CardTitle>
              <CardDescription>Organismes officiels de la République romaine</CardDescription>
            </CardHeader>
            <CardContent>
              <InstitutsConseil />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="relations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Relations diplomatiques</CardTitle>
                <CardDescription>État des relations avec les nations étrangères</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Alliés principaux</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Royaume de Numidie</span>
                        <span className="text-green-600 font-medium">Alliance forte</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Royaume de Pergame</span>
                        <span className="text-green-600 font-medium">Alliance forte</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Cités grecques</span>
                        <span className="text-green-500 font-medium">Amicale</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Tensions et conflits</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Royaume de Macédoine</span>
                        <span className="text-amber-600 font-medium">Tendue</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tribus gauloises</span>
                        <span className="text-red-600 font-medium">Guerre</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Carthage</span>
                        <span className="text-amber-500 font-medium">Paix fragile</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button className="w-full">
                    Gérer les relations diplomatiques
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Guerres et campagnes</CardTitle>
                <CardDescription>Opérations militaires en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Campagnes actives</h3>
                    <ul className="space-y-3">
                      <li>
                        <div className="flex justify-between">
                          <span className="font-medium">Campagne de Gaule</span>
                          <span className="text-amber-600">En cours</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Général: Marcus Favonius Strabo
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Légions: II, IV, VII
                        </div>
                      </li>
                      <li>
                        <div className="flex justify-between">
                          <span className="font-medium">Campagne d'Illyrie</span>
                          <span className="text-green-600">Victorieuse</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Général: Publius Cornelius Scipio
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Légions: I, IX
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Menaces potentielles</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Incursions parthes en Syrie</span>
                        <span className="text-amber-500">Préoccupant</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Pirates en Méditerranée</span>
                        <span className="text-amber-600">Sérieux</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button className="w-full">
                    Gérer les campagnes militaires
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
