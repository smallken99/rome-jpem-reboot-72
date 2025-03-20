import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const MaitreJeuStats: React.FC = () => {
  const { 
    equilibre, 
    senateurs, 
    provinces, 
    lois, 
    clients, 
    economieRecords, 
    treasury,
    currentYear
  } = useMaitreJeu();
  
  // Préparation des données pour les graphiques
  const factionData = [
    { name: 'Populaires', value: equilibre?.populaires || 0 },
    { name: 'Optimates', value: equilibre?.optimates || 0 },
    { name: 'Moderates', value: equilibre?.moderates || 0 }
  ];
  
  const economicData = [
    { name: 'Q1', revenus: treasury?.income || 0, depenses: treasury?.expenses || 0 },
    { name: 'Q2', revenus: treasury?.income * 1.1 || 0, depenses: treasury?.expenses * 0.9 || 0 },
    { name: 'Q3', revenus: treasury?.income * 0.8 || 0, depenses: treasury?.expenses * 1.2 || 0 },
    { name: 'Q4', revenus: treasury?.income * 1.3 || 0, depenses: treasury?.expenses * 1.1 || 0 }
  ];
  
  const senateursByFaction = senateurs.reduce((acc, sen) => {
    const faction = sen.appartenance || 'Neutre';
    acc[faction] = (acc[faction] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const senateurFactionData = Object.entries(senateursByFaction).map(([name, value]) => ({ name, value }));
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Statistiques de la République</h1>
      <p className="text-muted-foreground">
        Aperçu global des statistiques de la République romaine
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Sénateurs</CardTitle>
            <CardDescription>Total: {senateurs.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Joueurs:</span>
                <span>{senateurs.filter(s => s.joueur).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Patriciens:</span>
                <span>{senateurs.filter(s => s.statut === 'Patricien').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Plébéiens:</span>
                <span>{senateurs.filter(s => s.statut === 'Plébéien').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Provinces</CardTitle>
            <CardDescription>Total: {provinces.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Pacifiées:</span>
                <span>{provinces.filter(p => p.stabilite >= 70).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Instables:</span>
                <span>{provinces.filter(p => p.stabilite < 50).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Loyauté moyenne:</span>
                <span>
                  {provinces.length > 0 
                    ? Math.round(provinces.reduce((acc, p) => acc + p.stabilite, 0) / provinces.length) 
                    : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Économie</CardTitle>
            <CardDescription>Trésor: {treasury?.balance.toLocaleString()} As</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Revenus:</span>
                <span>{treasury?.income.toLocaleString()} As</span>
              </div>
              <div className="flex justify-between">
                <span>Dépenses:</span>
                <span>{treasury?.expenses.toLocaleString()} As</span>
              </div>
              <div className="flex justify-between">
                <span>Solde:</span>
                <span className={treasury?.surplus && treasury.surplus >= 0 ? "text-green-500" : "text-red-500"}>
                  {treasury?.surplus ? treasury.surplus.toLocaleString() : 0} As
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="factions" className="w-full mt-8">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="factions">Factions</TabsTrigger>
          <TabsTrigger value="economie">Économie</TabsTrigger>
          <TabsTrigger value="stabilite">Stabilité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="factions">
          <Card>
            <CardHeader>
              <CardTitle>Équilibre des Factions</CardTitle>
              <CardDescription>
                Répartition des forces politiques dans la République - Année {currentYear} AUC
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={factionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Influence" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="economie">
          <Card>
            <CardHeader>
              <CardTitle>Finances de la République</CardTitle>
              <CardDescription>
                Revenus et dépenses par trimestre - Année {currentYear} AUC
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={economicData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenus" name="Revenus" fill="#22c55e" />
                    <Bar dataKey="depenses" name="Dépenses" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stabilite">
          <Card>
            <CardHeader>
              <CardTitle>Facteurs de Stabilité</CardTitle>
              <CardDescription>
                Facteurs influençant la stabilité de la République
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Stabilité Économique:</span>
                    <span>{equilibre?.economicStability || equilibre?.économie || 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-blue-500 rounded" 
                      style={{ width: `${equilibre?.economicStability || equilibre?.économie || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Force Militaire:</span>
                    <span>{equilibre?.facteurMilitaire || equilibre?.armée || 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-red-500 rounded" 
                      style={{ width: `${equilibre?.facteurMilitaire || equilibre?.armée || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Morale du Peuple:</span>
                    <span>{equilibre?.morale || 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-green-500 rounded" 
                      style={{ width: `${equilibre?.morale || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Loyauté des Patriciens:</span>
                    <span>{equilibre?.facteurPatriciens || equilibre?.patriciens || 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-purple-500 rounded" 
                      style={{ width: `${equilibre?.facteurPatriciens || equilibre?.patriciens || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Soutien Plébéien:</span>
                    <span>{equilibre?.facteurPlebs || equilibre?.plébéiens || 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div 
                      className="h-full bg-yellow-500 rounded" 
                      style={{ width: `${equilibre?.facteurPlebs || equilibre?.plébéiens || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
