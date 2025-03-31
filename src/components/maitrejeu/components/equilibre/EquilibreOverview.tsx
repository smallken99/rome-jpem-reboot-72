
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Check, Info, AlertTriangle, AlertCircle, Heart, Scroll, Shield, Users, Building, BadgePercent } from 'lucide-react';
import { Equilibre, PoliticalEvent } from '../../types/equilibre';
import { Badge } from '@/components/ui/badge';
import { RecentEventsTable } from './RecentEventsTable';

interface EquilibreOverviewProps {
  equilibre: Equilibre;
  recentEvents?: PoliticalEvent[];
}

export const EquilibreOverview: React.FC<EquilibreOverviewProps> = ({ equilibre, recentEvents = [] }) => {
  // Data for political pie chart
  const politicalData = useMemo(() => [
    { name: 'Populares', value: equilibre.populaires, color: '#ef4444' },
    { name: 'Optimates', value: equilibre.optimates, color: '#3b82f6' },
    { name: 'Modérés', value: equilibre.moderates, color: '#84cc16' }
  ], [equilibre.populaires, equilibre.optimates, equilibre.moderates]);
  
  // Data for social pie chart
  const socialData = useMemo(() => [
    { name: 'Patriciens', value: equilibre.patriciens, color: '#8b5cf6' },
    { name: 'Plébéiens', value: equilibre.plébéiens, color: '#f59e0b' }
  ], [equilibre.patriciens, equilibre.plébéiens]);
  
  // Data for economic factors
  const economicData = useMemo(() => {
    if (typeof equilibre.economie === 'object') {
      const { stabilite, croissance, commerce, agriculture } = equilibre.economie;
      return [
        { name: 'Stabilité', value: stabilite, color: '#0ea5e9' },
        { name: 'Croissance', value: croissance, color: '#84cc16' },
        { name: 'Commerce', value: commerce, color: '#f59e0b' },
        { name: 'Agriculture', value: agriculture, color: '#22c55e' }
      ];
    }
    
    // Fallback when economie is just a number
    return [
      { name: 'Économie', value: equilibre.economie, color: '#0ea5e9' }
    ];
  }, [equilibre.economie]);
  
  // Data for stability factors
  const stabilityData = useMemo(() => [
    { name: 'Stabilité', value: equilibre.stability, color: '#3b82f6', icon: Shield },
    { name: 'Armée', value: equilibre.armée, color: '#ef4444', icon: Shield },
    { name: 'Loyauté', value: equilibre.loyauté, color: '#84cc16', icon: Heart },
    { name: 'Morale', value: equilibre.morale, color: '#8b5cf6', icon: Heart },
    { name: 'Religion', value: equilibre.religion, color: '#ec4899', icon: Scroll },
    { name: 'Juridique', value: equilibre.facteurJuridique, color: '#0ea5e9', icon: Scroll }
  ], [equilibre.stability, equilibre.armée, equilibre.loyauté, equilibre.morale, equilibre.religion, equilibre.facteurJuridique]);
  
  // Function to get status icon based on value
  const getStatusIcon = (value: number) => {
    if (value >= 75) return <Check className="h-5 w-5 text-green-500" />;
    if (value >= 50) return <Info className="h-5 w-5 text-blue-500" />;
    if (value >= 25) return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    return <AlertCircle className="h-5 w-5 text-red-500" />;
  };
  
  // Function to get status label
  const getStatusLabel = (value: number) => {
    if (value >= 75) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (value >= 50) return { label: 'Stable', color: 'bg-blue-100 text-blue-800' };
    if (value >= 25) return { label: 'Problématique', color: 'bg-amber-100 text-amber-800' };
    return { label: 'Critique', color: 'bg-red-100 text-red-800' };
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="summary">
        <TabsList className="w-full">
          <TabsTrigger value="summary">Résumé</TabsTrigger>
          <TabsTrigger value="political">Politique</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="economic">Économique</TabsTrigger>
          <TabsTrigger value="events">Événements récents</TabsTrigger>
        </TabsList>
        
        {/* Summary Tab */}
        <TabsContent value="summary" className="pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Political Balance */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2" /> Équilibre politique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={politicalData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {politicalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <div className="font-semibold">Populares</div>
                    <div className="text-red-500">{equilibre.populaires}%</div>
                  </div>
                  <div>
                    <div className="font-semibold">Optimates</div>
                    <div className="text-blue-500">{equilibre.optimates}%</div>
                  </div>
                  <div>
                    <div className="font-semibold">Modérés</div>
                    <div className="text-green-500">{equilibre.moderates}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Social Balance */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2" /> Équilibre social
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={socialData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {socialData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-center text-sm">
                  <div>
                    <div className="font-semibold">Patriciens</div>
                    <div className="text-purple-500">{equilibre.patriciens}%</div>
                  </div>
                  <div>
                    <div className="font-semibold">Plébéiens</div>
                    <div className="text-amber-500">{equilibre.plébéiens}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Economic Stability */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Building className="h-5 w-5 mr-2" /> Économie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center h-32">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-500">
                      {typeof equilibre.economie === 'object' 
                        ? Math.round((equilibre.economie.stabilite + equilibre.economie.croissance + equilibre.economie.commerce + equilibre.economie.agriculture) / 4) 
                        : equilibre.economie}%
                    </div>
                    <div className="text-sm text-muted-foreground">Stabilité économique</div>
                    <Badge className={`mt-2 ${getStatusLabel(typeof equilibre.economie === 'number' ? equilibre.economie : 50).color}`}>
                      {getStatusLabel(typeof equilibre.economie === 'number' ? equilibre.economie : 50).label}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Stability Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Facteurs de stabilité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stabilityData}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {stabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Events */}
          {recentEvents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Événements récents importants</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentEventsTable events={recentEvents} />
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Political Tab */}
        <TabsContent value="political" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Équilibre politique détaillé</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={politicalData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {politicalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-red-500">Populares</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{equilibre.populaires}%</div>
                      <p className="text-sm text-muted-foreground">
                        Faction favorisant les réformes populaires, menée par les tribuns de la plèbe.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-blue-500">Optimates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{equilibre.optimates}%</div>
                      <p className="text-sm text-muted-foreground">
                        Faction conservatrice défendant les valeurs traditionnelles et l'autorité du Sénat.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-green-500">Modérés</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{equilibre.moderates}%</div>
                      <p className="text-sm text-muted-foreground">
                        Faction intermédiaire cherchant à équilibrer les intérêts de tous les citoyens.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* History of political changes if available */}
                {equilibre.historique && equilibre.historique.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Historique des changements</h3>
                    <ul className="space-y-2">
                      {equilibre.historique.map((entry, index) => (
                        <li key={index} className="text-sm border p-2 rounded-md">
                          <span className="font-medium">{entry.date}</span>: {entry.event || 'Changement d\'équilibre'}
                          {entry.values && entry.values.populaires !== undefined && (
                            <span className="text-xs ml-2">
                              (Pop: {entry.values.populaires > 0 ? '+' : ''}{entry.values.populaires}%, 
                              Opt: {entry.values.optimates > 0 ? '+' : ''}{entry.values.optimates}%)
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Social Tab */}
        <TabsContent value="social" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Dynamique sociale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={socialData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {socialData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-purple-500">Patriciens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{equilibre.patriciens}%</div>
                      <p className="text-sm text-muted-foreground">
                        L'aristocratie romaine, influente et privilégiée.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-amber-500">Plébéiens</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{equilibre.plébéiens}%</div>
                      <p className="text-sm text-muted-foreground">
                        La classe populaire romaine, représentant la majorité des citoyens.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Economic Tab */}
        <TabsContent value="economic" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Stabilité économique</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {typeof equilibre.economie === 'object' ? (
                  <>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={economicData}>
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {economicData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base text-blue-500">Stabilité</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{equilibre.economie.stabilite}%</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base text-green-500">Croissance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{equilibre.economie.croissance}%</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base text-amber-500">Commerce</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{equilibre.economie.commerce}%</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base text-green-500">Agriculture</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{equilibre.economie.agriculture}%</div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center h-32">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-500">{equilibre.economie}%</div>
                      <div className="text-sm text-muted-foreground">Stabilité économique globale</div>
                    </div>
                  </div>
                )}
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Facteurs économiques clés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Inflation:</span>
                        <span className="font-medium">2.5%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Taux d'imposition patricien:</span>
                        <span className="font-medium">5%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Taux d'imposition plébéien:</span>
                        <span className="font-medium">3%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Revenus du commerce:</span>
                        <span className="font-medium">25,000,000 as</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Dépenses militaires:</span>
                        <span className="font-medium">18,000,000 as</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Événements récents ayant affecté l'équilibre</CardTitle>
            </CardHeader>
            <CardContent>
              {recentEvents.length > 0 ? (
                <RecentEventsTable events={recentEvents} />
              ) : (
                <p className="text-center text-muted-foreground py-4">Aucun événement récent</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
