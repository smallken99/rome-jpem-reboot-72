
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { useMaitreJeu } from './context';
import { formatCurrency } from '@/utils/formatUtils';

export const MaitreJeuStats: React.FC = () => {
  const { senateurs, provinces, economieRecords, lois, familles } = useMaitreJeu();
  const [activeTab, setActiveTab] = useState('economie');
  
  // Statistiques économiques
  const revenus = economieRecords.filter(r => r.type === 'income').reduce((acc, r) => acc + r.amount, 0);
  const depenses = economieRecords.filter(r => r.type === 'expense').reduce((acc, r) => acc + r.amount, 0);
  const balance = revenus - depenses;
  
  // Statistiques politiques
  const loisAdoptees = lois.filter(l => l.état === 'adoptée' || l.état === 'Promulguée').length;
  const loisRejetees = lois.filter(l => l.état === 'rejetée').length;
  const loisEnAttente = lois.filter(l => l.état === 'proposée' || l.état === 'En délibération').length;
  
  // Statistiques démographiques
  const senateursFactions = senateurs.reduce((acc, s) => {
    const faction = s.faction || 'Autre';
    acc[faction] = (acc[faction] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Statistiques Globales</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="economie" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Économie
          </TabsTrigger>
          <TabsTrigger value="politique" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Politique
          </TabsTrigger>
          <TabsTrigger value="demographie" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Démographie
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="economie" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-green-600">Revenus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(revenus)}</div>
                <p className="text-sm text-muted-foreground">
                  Taxes, tributs et autres revenus
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-red-600">Dépenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(depenses)}</div>
                <p className="text-sm text-muted-foreground">
                  Armée, administration et projets
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className={balance >= 0 ? "text-blue-600" : "text-red-600"}>
                  Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
                <p className="text-sm text-muted-foreground">
                  {balance >= 0 ? "Excédent budgétaire" : "Déficit à combler"}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sources de revenus</CardTitle>
                <CardDescription>
                  Répartition des revenus par source
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Graphique des revenus à implémenter</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ventilation des dépenses</CardTitle>
                <CardDescription>
                  Répartition des dépenses par catégorie
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Graphique des dépenses à implémenter</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Évolution économique</CardTitle>
                <CardDescription>
                  Évolution des finances au fil du temps
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Graphique d'évolution à implémenter</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="politique" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Lois adoptées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loisAdoptees}</div>
                <p className="text-sm text-muted-foreground">
                  Sur un total de {lois.length} lois
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Lois rejetées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loisRejetees}</div>
                <p className="text-sm text-muted-foreground">
                  Sur un total de {lois.length} lois
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Lois en attente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loisEnAttente}</div>
                <p className="text-sm text-muted-foreground">
                  En cours de délibération
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Équilibre du Sénat</CardTitle>
                <CardDescription>
                  Répartition des factions au Sénat
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Graphique des factions à implémenter</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activité législative</CardTitle>
                <CardDescription>
                  Nombre de lois proposées et adoptées par période
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Graphique d'activité à implémenter</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Votes au Sénat</CardTitle>
                <CardDescription>
                  Résultats des votes pour les lois et élections importantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-80 items-center justify-center">
                  <p className="text-muted-foreground">Graphique des votes à implémenter</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="demographie" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Sénateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{senateurs.length}</div>
                <p className="text-sm text-muted-foreground">
                  Membres du Sénat romain
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Familles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{familles.length}</div>
                <p className="text-sm text-muted-foreground">
                  Familles influentes de Rome
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Provinces</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{provinces.length}</div>
                <p className="text-sm text-muted-foreground">
                  Territoires sous contrôle romain
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des Sénateurs</CardTitle>
                <CardDescription>
                  Analyse des factions au sein du Sénat
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="w-full max-w-md">
                    <ul className="space-y-3">
                      {Object.entries(senateursFactions).map(([faction, count]) => (
                        <li key={faction} className="flex items-center">
                          <div className="w-full">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">{faction}</span>
                              <span className="text-sm text-muted-foreground">
                                {count} ({Math.round((count / senateurs.length) * 100)}%)
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  faction === 'Optimates' ? 'bg-blue-600' :
                                  faction === 'Populares' ? 'bg-red-600' :
                                  faction === 'Moderates' ? 'bg-green-600' : 'bg-gray-600'
                                }`}
                                style={{ width: `${(count / senateurs.length) * 100}%` }}
                              />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statut des Provinces</CardTitle>
                <CardDescription>
                  État actuel des provinces romaines
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Graphique des provinces à implémenter</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Alliances et Relations</CardTitle>
                <CardDescription>
                  Réseau d'alliances entre familles et factions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-80 items-center justify-center">
                  <p className="text-muted-foreground">Réseau d'alliances à implémenter</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
