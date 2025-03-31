import React, { useState } from 'react';
import { useMaitreJeu } from '../../context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PoliticalEventsTimeline } from '../PoliticalEventsTimeline';
import { Equilibre } from '../../types/equilibre';
import { PoliticalEvent } from '../../types/histoire';
import { BellOff, BellRing, Landmark, LineChart, Shield, TrendingUp } from 'lucide-react';

export const GestionEquilibreModule: React.FC = () => {
  const { equilibre, updateEquilibre, updateFactionBalance } = useMaitreJeu();
  const [activeTab, setActiveTab] = useState('politique');
  
  const handleFactionsBalanceUpdate = (
    populaires: number,
    optimates: number,
    moderates: number
  ) => {
    updateFactionBalance(populaires, optimates, moderates);
  };
  
  const handleEconomieUpdate = (
    stabilite: number,
    croissance: number,
    commerce: number,
    agriculture: number
  ) => {
    if (!equilibre?.economie) return;
    
    updateEquilibre({
      economie: {
        stabilite,
        croissance,
        commerce,
        agriculture
      }
    });
  };
  
  const politicalEvents: PoliticalEvent[] = [
    {
      id: '1',
      title: 'Élection consulaire',
      description: 'Élection des consuls pour l\'année à venir',
      type: 'POLITIQUE',
      date: { year: 202, season: 'WINTER' },
      importance: 'high'
    },
    {
      id: '2',
      title: 'Guerre contre Carthage',
      description: 'Début des hostilités avec Carthage',
      type: 'MILITAIRE',
      date: { year: 201, season: 'SPRING' },
      importance: 'critical'
    },
    {
      id: '3',
      title: 'Traité commercial avec l\'Égypte',
      description: 'Signature d\'un traité commercial avantageux',
      type: 'ECONOMIQUE',
      date: { year: 200, season: 'AUTUMN' },
      importance: 'medium'
    }
  ];
  
  // Ensure equilibre.politique is properly structured
  const politiqueData = [
    { name: 'Populares', value: equilibre.politique.populaires || 0 },
    { name: 'Optimates', value: equilibre.politique.optimates || 0 },
    { name: 'Modérés', value: equilibre.politique.moderates || 0 }
  ];
  
  // Handle partial updates to Equilibre sections
  const handlePolitiqueUpdate = (updates: Partial<Equilibre>) => {
    // Make sure we're maintaining structure compatibility
    updateEquilibre({
      ...updates,
      politique: {
        populaires: updates.politique?.populaires ?? equilibre.politique.populaires,
        optimates: updates.politique?.optimates ?? equilibre.politique.optimates,
        moderates: updates.politique?.moderates ?? equilibre.politique.moderates
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Équilibre de la République</CardTitle>
          <CardDescription>
            Gérez les différentes forces qui façonnent Rome
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="politique">Politique</TabsTrigger>
              <TabsTrigger value="economie">Économie</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="militaire">Militaire</TabsTrigger>
              <TabsTrigger value="religion">Religion</TabsTrigger>
            </TabsList>
            
            {/* Politique Tab */}
            <TabsContent value="politique">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Équilibre des factions politiques</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={politiqueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Ajuster l'équilibre politique</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <label>Populares</label>
                          <span>{equilibre.politique.populaires}%</span>
                        </div>
                        <Slider 
                          defaultValue={[equilibre.politique.populaires]} 
                          max={100} 
                          step={1}
                          onValueChange={([value]) => {
                            handlePolitiqueUpdate({
                              politique: {
                                populaires: value,
                                optimates: equilibre.politique.optimates,
                                moderates: equilibre.politique.moderates
                              }
                            });
                          }}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <label>Optimates</label>
                          <span>{equilibre.politique.optimates}%</span>
                        </div>
                        <Slider 
                          defaultValue={[equilibre.politique.optimates]} 
                          max={100} 
                          step={1}
                          onValueChange={([value]) => {
                            handlePolitiqueUpdate({
                              politique: {
                                populaires: equilibre.politique.populaires,
                                optimates: value,
                                moderates: equilibre.politique.moderates
                              }
                            });
                          }}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <label>Modérés</label>
                          <span>{equilibre.politique.moderates}%</span>
                        </div>
                        <Slider 
                          defaultValue={[equilibre.politique.moderates]} 
                          max={100} 
                          step={1}
                          onValueChange={([value]) => {
                            handlePolitiqueUpdate({
                              politique: {
                                populaires: equilibre.politique.populaires,
                                optimates: equilibre.politique.optimates,
                                moderates: value
                              }
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Économie Tab */}
            <TabsContent value="economie">
              <div className="grid gap-6">
                {equilibre.economie && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Indices économiques</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <label>Stabilité économique</label>
                            <span>{equilibre.economie.stabilite}%</span>
                          </div>
                          <Slider 
                            defaultValue={[equilibre.economie.stabilite]} 
                            max={100} 
                            step={1}
                            onValueChange={([value]) => {
                              handleEconomieUpdate(
                                value,
                                equilibre.economie.croissance,
                                equilibre.economie.commerce,
                                equilibre.economie.agriculture
                              );
                            }}
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <label>Croissance</label>
                            <span>{equilibre.economie.croissance}%</span>
                          </div>
                          <Slider 
                            defaultValue={[equilibre.economie.croissance]} 
                            max={100} 
                            step={1}
                            onValueChange={([value]) => {
                              handleEconomieUpdate(
                                equilibre.economie.stabilite,
                                value,
                                equilibre.economie.commerce,
                                equilibre.economie.agriculture
                              );
                            }}
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <label>Commerce</label>
                            <span>{equilibre.economie.commerce}%</span>
                          </div>
                          <Slider 
                            defaultValue={[equilibre.economie.commerce]} 
                            max={100} 
                            step={1}
                            onValueChange={([value]) => {
                              handleEconomieUpdate(
                                equilibre.economie.stabilite,
                                equilibre.economie.croissance,
                                value,
                                equilibre.economie.agriculture
                              );
                            }}
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <label>Agriculture</label>
                            <span>{equilibre.economie.agriculture}%</span>
                          </div>
                          <Slider 
                            defaultValue={[equilibre.economie.agriculture]} 
                            max={100} 
                            step={1}
                            onValueChange={([value]) => {
                              handleEconomieUpdate(
                                equilibre.economie.stabilite,
                                equilibre.economie.croissance,
                                equilibre.economie.commerce,
                                value
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">Impacts économiques récents</h3>
                      {/* We'll use a simpler version of events here that's compatible */}
                      <div className="border rounded-lg p-4">
                        {politicalEvents.map(event => (
                          <div key={event.id} className="mb-3 pb-3 border-b last:border-0">
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs">{`${event.date.year} ${event.date.season}`}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                event.importance === 'critical' ? 'bg-red-100 text-red-800' :
                                event.importance === 'high' ? 'bg-amber-100 text-amber-800' :
                                event.importance === 'medium' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {event.importance}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Social Tab */}
            <TabsContent value="social">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Structure Sociale</CardTitle>
                    <CardDescription>
                      Ajustez l'équilibre entre les différentes classes sociales
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Patriciens</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(equilibre.social.patriciens * 100)}%
                        </span>
                      </div>
                      <Slider
                        value={[equilibre.social.patriciens * 100]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handleUpdateEquilibre('social', 'patriciens', value[0]/100)}
                        className="w-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        Influence et pouvoir de l'aristocratie patricienne dans la société romaine.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Plébéiens</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(equilibre.social.plebeiens * 100)}%
                        </span>
                      </div>
                      <Slider
                        value={[equilibre.social.plebeiens * 100]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handleUpdateEquilibre('social', 'plebeiens', value[0]/100)}
                        className="w-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        Influence et pouvoir des classes populaires et de la plèbe dans la société.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Esclaves</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((equilibre.social.esclaves || 0) * 100)}%
                        </span>
                      </div>
                      <Slider
                        value={[(equilibre.social.esclaves || 0) * 100]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handleUpdateEquilibre('social', 'esclaves', value[0]/100)}
                        className="w-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        Proportion et importance des esclaves dans l'économie et la société.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Cohésion Sociale</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((equilibre.social.cohesion || 0) * 100)}%
                        </span>
                      </div>
                      <Slider
                        value={[(equilibre.social.cohesion || 0) * 100]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handleUpdateEquilibre('social', 'cohesion', value[0]/100)}
                        className="w-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        Mesure de l'unité et de la stabilité sociale dans la République.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Militaire Tab */}
            <TabsContent value="militaire">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Évolution militaire</CardTitle>
                    <CardDescription>
                      Analysez l'évolution des forces militaires romaines
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Le graphique de l'évolution militaire sera disponible prochainement
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Religion Tab */}
            <TabsContent value="religion">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Évolution religieuse</CardTitle>
                    <CardDescription>
                      Analysez l'évolution des pratiques religieuses romaines
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <p className="text-muted-foreground">
                        Le graphique de l'évolution religieuse sera disponible prochainement
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="evenements">
              <PoliticalEventsTimeline events={politicalEvents} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
