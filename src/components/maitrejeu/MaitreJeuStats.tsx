
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { formatMoney, formatNumber } from '@/utils/formatUtils';
import { useMaitreJeu } from './context/MaitreJeuContext';

export const MaitreJeuStats = () => {
  const { equilibre, treasury, economieRecords } = useMaitreJeu();
  const [activeTab, setActiveTab] = useState('apercu');

  // Données pour le graphique des factions
  const factionData = [
    { name: 'Populares', value: equilibre?.populares || 30, color: '#ef4444' },
    { name: 'Optimates', value: equilibre?.optimates || 40, color: '#3b82f6' },
    { name: 'Modérés', value: equilibre?.moderates || 30, color: '#a3a3a3' },
  ];

  // Données pour le graphique des religions
  const religionData = [
    { name: 'Jupiter', value: 35, color: '#f59e0b' },
    { name: 'Mars', value: 25, color: '#ef4444' },
    { name: 'Minerve', value: 20, color: '#3b82f6' },
    { name: 'Vénus', value: 15, color: '#ec4899' },
    { name: 'Autres', value: 5, color: '#a3a3a3' },
  ];

  // Stats économiques
  const economicStats = {
    totalIncome: economieRecords
      ? economieRecords.filter(record => record.type === 'income').reduce((sum, record) => sum + record.amount, 0)
      : 0,
    totalExpenses: economieRecords
      ? economieRecords.filter(record => record.type === 'expense').reduce((sum, record) => sum + record.amount, 0)
      : 0,
    balance: treasury?.balance || 0,
    taxCollection: 85, // Pourcentage collecté
    publicWorks: 12000000, // Coût des travaux publics en cours
  };

  // Données pour les statistiques militaires
  const militaryStats = {
    legions: 8,
    totalSoldiers: 40000,
    navalStrength: 120, // Nombre de navires
    auxiliaries: 15000,
    readiness: 75, // Pourcentage
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trésor Public</CardTitle>
            <CardDescription>Balance actuelle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMoney(economicStats.balance)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {economicStats.totalIncome > economicStats.totalExpenses
                ? `+${formatMoney(economicStats.totalIncome - economicStats.totalExpenses)} ce mois`
                : `-${formatMoney(economicStats.totalExpenses - economicStats.totalIncome)} ce mois`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Population</CardTitle>
            <CardDescription>Citoyens romains</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(1250000)}</div>
            <p className="text-xs text-muted-foreground mt-1">+2.5% depuis l'année dernière</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Armée</CardTitle>
            <CardDescription>Force totale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(militaryStats.totalSoldiers)}</div>
            <p className="text-xs text-muted-foreground mt-1">{militaryStats.legions} légions actives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Provinces</CardTitle>
            <CardDescription>Territoires contrôlés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-1">3 provinces en révolte</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="apercu">Aperçu politique</TabsTrigger>
          <TabsTrigger value="economie">Économie</TabsTrigger>
          <TabsTrigger value="militaire">Forces militaires</TabsTrigger>
        </TabsList>

        <TabsContent value="apercu" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Équilibre des factions</CardTitle>
                <CardDescription>Répartition des factions au Sénat</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={factionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {factionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Influence religieuse</CardTitle>
                <CardDescription>Cultes les plus influents</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={religionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {religionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="economie" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Finances publiques</CardTitle>
                <CardDescription>Vue d'ensemble des finances de la République</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Revenus mensuels</p>
                      <p className="text-sm text-muted-foreground">Estimation</p>
                    </div>
                    <div className="font-medium">{formatMoney(economicStats.totalIncome)}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Dépenses mensuelles</p>
                      <p className="text-sm text-muted-foreground">Estimation</p>
                    </div>
                    <div className="font-medium">{formatMoney(economicStats.totalExpenses)}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Solde</p>
                      <p className="text-sm text-muted-foreground">Surplus/Déficit mensuel</p>
                    </div>
                    <div className={`font-medium ${economicStats.totalIncome > economicStats.totalExpenses ? 'text-green-600' : 'text-red-600'}`}>
                      {economicStats.totalIncome > economicStats.totalExpenses
                        ? `+${formatMoney(economicStats.totalIncome - economicStats.totalExpenses)}`
                        : `-${formatMoney(economicStats.totalExpenses - economicStats.totalIncome)}`}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">Collection des impôts</p>
                      <p className="text-sm font-medium">{economicStats.taxCollection}%</p>
                    </div>
                    <Progress value={economicStats.taxCollection} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Travaux publics en cours</p>
                      <p className="text-sm text-muted-foreground">Coût total</p>
                    </div>
                    <div className="font-medium">{formatMoney(economicStats.publicWorks)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production et commerce</CardTitle>
                <CardDescription>Vue d'ensemble des activités économiques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">Production agricole</p>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                        <p className="text-sm font-medium">Bon</p>
                      </div>
                    </div>
                  </div>
                  <Progress value={80} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">Production minière</p>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                        <p className="text-sm font-medium">Moyen</p>
                      </div>
                    </div>
                  </div>
                  <Progress value={60} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">Commerce maritime</p>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                        <p className="text-sm font-medium">Bon</p>
                      </div>
                    </div>
                  </div>
                  <Progress value={75} className="h-2 bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">Routes commerciales</p>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                        <p className="text-sm font-medium">Excellent</p>
                      </div>
                    </div>
                  </div>
                  <Progress value={90} className="h-2 bg-muted" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="militaire" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Forces terrestres</CardTitle>
                <CardDescription>Vue d'ensemble des légions romaines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Légions</p>
                    <p className="text-2xl font-bold">{militaryStats.legions}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Légionnaires</p>
                    <p className="text-2xl font-bold">{formatNumber(militaryStats.totalSoldiers)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Auxiliaires</p>
                    <p className="text-2xl font-bold">{formatNumber(militaryStats.auxiliaries)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Cavalerie</p>
                    <p className="text-2xl font-bold">{formatNumber(4800)}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">État de préparation</p>
                    <p className="text-sm font-medium">{militaryStats.readiness}%</p>
                  </div>
                  <Progress value={militaryStats.readiness} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">Déploiement actuel</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Gaule</span>
                      <span className="font-medium">3 légions</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hispanie</span>
                      <span className="font-medium">2 légions</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Afrique</span>
                      <span className="font-medium">1 légion</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Italie</span>
                      <span className="font-medium">2 légions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forces navales</CardTitle>
                <CardDescription>Vue d'ensemble de la flotte romaine</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Navires de guerre</p>
                    <p className="text-2xl font-bold">{militaryStats.navalStrength}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Équipages</p>
                    <p className="text-2xl font-bold">{formatNumber(24000)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Quinquérèmes</p>
                    <p className="text-2xl font-bold">80</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Trirèmes</p>
                    <p className="text-2xl font-bold">40</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">État de la flotte</p>
                    <p className="text-sm font-medium">85%</p>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">Déploiement naval</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Mare Nostrum</span>
                      <span className="font-medium">60 navires</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mer Égée</span>
                      <span className="font-medium">25 navires</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mer Adriatique</span>
                      <span className="font-medium">20 navires</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Côtes hispaniques</span>
                      <span className="font-medium">15 navires</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
