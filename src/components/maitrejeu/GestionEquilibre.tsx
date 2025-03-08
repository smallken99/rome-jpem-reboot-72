
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { EquilibreBarChart } from './components/EquilibreBarChart';
import { EvenementsList } from './components/EvenementsList';
import { EvenementType } from './types/maitreJeuTypes';

export const GestionEquilibre: React.FC = () => {
  const { equilibre, updateEquilibre, evenements, resolveEvenement } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [filteredEventType, setFilteredEventType] = useState<EvenementType | 'ALL'>('ALL');
  
  // Fonction pour ajuster un équilibre
  const adjustEquilibre = (type: keyof Omit<typeof equilibre, 'historique'>, value: number) => {
    if (type in equilibre) {
      const updates = { [type]: Math.max(0, Math.min(100, (equilibre[type] as number) + value)) };
      updateEquilibre(updates);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Équilibre des Forces</h2>
        <p className="text-muted-foreground">
          Gérez l'équilibre des pouvoirs au sein de la République
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full">
          <TabsTrigger value="overview">Vue Générale</TabsTrigger>
          <TabsTrigger value="adjustments">Ajustements</TabsTrigger>
          <TabsTrigger value="events">Événements d'Influence</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Vue d'Ensemble des Forces</CardTitle>
              <CardDescription>
                Visualisation de l'équilibre actuel des forces dans la République
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EquilibreBarChart equilibre={equilibre} />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Plébéiens</CardTitle>
                <CardDescription>Influence de la plèbe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{equilibre.plebeiens}%</div>
                <div className="text-sm text-muted-foreground">
                  {equilibre.plebeiens < 30 ? 'Faible influence populaire' :
                   equilibre.plebeiens > 70 ? 'Forte pression populaire' : 
                   'Influence équilibrée'}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Armée</CardTitle>
                <CardDescription>Influence militaire</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{equilibre.armée}%</div>
                <div className="text-sm text-muted-foreground">
                  {equilibre.armée < 30 ? 'Armée peu influente' : 
                   equilibre.armée > 70 ? 'Forte présence militaire' : 
                   'Influence équilibrée'}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Économie</CardTitle>
                <CardDescription>Stabilité économique</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{equilibre.économie}%</div>
                <div className="text-sm text-muted-foreground">
                  {equilibre.économie < 30 ? 'Économie en difficulté' : 
                   equilibre.économie > 70 ? 'Économie florissante' : 
                   'Stabilité moyenne'}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="adjustments" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ajuster l'Équilibre des Forces</CardTitle>
              <CardDescription>
                Modifiez manuellement l'équilibre pour refléter les événements majeurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Plébéiens</h3>
                      <p className="text-sm text-muted-foreground">Influence du peuple romain</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('plebeiens', -5)}>-5</Button>
                      <span className="w-12 text-center font-medium">{equilibre.plebeiens}%</span>
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('plebeiens', 5)}>+5</Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-amber-500 rounded" style={{ width: `${equilibre.plebeiens}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Patriciens</h3>
                      <p className="text-sm text-muted-foreground">Influence des familles nobles</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('patriciens', -5)}>-5</Button>
                      <span className="w-12 text-center font-medium">{equilibre.patriciens}%</span>
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('patriciens', 5)}>+5</Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-purple-500 rounded" style={{ width: `${equilibre.patriciens}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Armée</h3>
                      <p className="text-sm text-muted-foreground">Influence des légions</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('armée', -5)}>-5</Button>
                      <span className="w-12 text-center font-medium">{equilibre.armée}%</span>
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('armée', 5)}>+5</Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-red-500 rounded" style={{ width: `${equilibre.armée}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Religion</h3>
                      <p className="text-sm text-muted-foreground">Influence religieuse</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('religion', -5)}>-5</Button>
                      <span className="w-12 text-center font-medium">{equilibre.religion}%</span>
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('religion', 5)}>+5</Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-blue-500 rounded" style={{ width: `${equilibre.religion}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Économie</h3>
                      <p className="text-sm text-muted-foreground">Stabilité économique</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('économie', -5)}>-5</Button>
                      <span className="w-12 text-center font-medium">{equilibre.économie}%</span>
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('économie', 5)}>+5</Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-green-500 rounded" style={{ width: `${equilibre.économie}%` }}></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Diplomatie</h3>
                      <p className="text-sm text-muted-foreground">Relations internationales</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('diplomatie', -5)}>-5</Button>
                      <span className="w-12 text-center font-medium">{equilibre.diplomatie}%</span>
                      <Button variant="outline" size="sm" onClick={() => adjustEquilibre('diplomatie', 5)}>+5</Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-teal-500 rounded" style={{ width: `${equilibre.diplomatie}%` }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Événements d'Influence</CardTitle>
              <CardDescription>
                Gérez les événements qui affectent l'équilibre de pouvoir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ALL" className="mb-6">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-full mb-4">
                  <TabsTrigger value="ALL" onClick={() => setFilteredEventType('ALL')}>Tous</TabsTrigger>
                  <TabsTrigger value="POLITIQUE" onClick={() => setFilteredEventType('POLITIQUE')}>Politique</TabsTrigger>
                  <TabsTrigger value="SOCIAL" onClick={() => setFilteredEventType('SOCIAL')}>Social</TabsTrigger>
                  <TabsTrigger value="ÉCONOMIQUE" onClick={() => setFilteredEventType('ÉCONOMIQUE')}>Économique</TabsTrigger>
                  <TabsTrigger value="GUERRE" onClick={() => setFilteredEventType('GUERRE')}>Guerre</TabsTrigger>
                  <TabsTrigger value="RELIGION" onClick={() => setFilteredEventType('RELIGION')}>Religion</TabsTrigger>
                  <TabsTrigger value="DIPLOMATIQUE" onClick={() => setFilteredEventType('DIPLOMATIQUE')}>Diplomatie</TabsTrigger>
                  <TabsTrigger value="CRISE" onClick={() => setFilteredEventType('CRISE')}>Crise</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <EvenementsList 
                evenements={evenements} 
                onResolve={resolveEvenement} 
                filteredType={filteredEventType} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
