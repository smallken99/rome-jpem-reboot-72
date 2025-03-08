import { Tab } from '@headlessui/react';
import { useContext, useState } from 'react';
import { MaitreJeuContext } from './context/MaitreJeuContext';
import { EvenementsList } from './components/EvenementsList';
import { EquilibreBarChart } from './components/EquilibreBarChart';
import { PoliticalEventsTimeline } from './components/PoliticalEventsTimeline';
import { PartisGraph } from './components/PartisGraph';
import { CreateEvenementForm } from './components/CreateEvenementForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, RefreshCw } from 'lucide-react';
import { EvenementType } from './types/evenements';

export const GestionEquilibre = () => {
  const { equilibre, updateEquilibre, evenements, resolveEvenement } = useContext(MaitreJeuContext);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [filteredType, setFilteredType] = useState<EvenementType | 'ALL'>('ALL');
  
  const [populaires, setPopulaires] = useState(equilibre.populaires || 35);
  const [optimates, setOptimates] = useState(equilibre.optimates || 40);
  const [moderates, setModerates] = useState(equilibre.moderates || 25);
  
  const filteredEvenements = filteredType === 'ALL' 
    ? evenements 
    : evenements.filter(e => e.type === filteredType);
  
  const handleResolveEvenement = (id: string, optionId: string) => {
    resolveEvenement(id, optionId);
  };
  
  const handleSaveFactionBalance = () => {
    updateEquilibre({
      populaires: populaires,
      optimates: optimates,
      moderates: moderates
    });
  };
  
  return (
    <div className="p-4">
      <Tabs defaultValue="graphiques" className="w-full">
        <TabsList>
          <TabsTrigger value="graphiques">Graphiques</TabsTrigger>
          <TabsTrigger value="historique">Historique</TabsTrigger>
        </TabsList>
        <TabsContent value="graphiques">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Équilibre des Pouvoirs</CardTitle>
                <CardDescription>Visualisation de l'état actuel des différentes forces à Rome.</CardDescription>
              </CardHeader>
              <CardContent>
                <EquilibreBarChart equilibre={equilibre} />
              </CardContent>
            </Card>
            
            <PartisGraph 
              factions={[
                { name: 'Populares', value: populaires, color: '#ef4444' },
                { name: 'Optimates', value: optimates, color: '#3b82f6' },
                { name: 'Moderates', value: moderates, color: '#a855f7' },
              ]}
            />
          </div>
        </TabsContent>
        <TabsContent value="historique">
          <Card>
            <CardHeader>
              <CardTitle>Historique de l'Équilibre</CardTitle>
              <CardDescription>Évolution des forces au fil du temps.</CardDescription>
            </CardHeader>
            <CardContent>
              <PoliticalEventsTimeline events={equilibre.historique} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Événements en cours</h2>
          <div className="flex items-center space-x-2">
            <Select
              value={filteredType}
              onValueChange={(value) => setFilteredType(value as EvenementType | 'ALL')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type d'événement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Tous les types</SelectItem>
                <SelectItem value="POLITIQUE">Politique</SelectItem>
                <SelectItem value="GUERRE">Guerre</SelectItem>
                <SelectItem value="CRISE">Crise</SelectItem>
                <SelectItem value="ECONOMIQUE">Économique</SelectItem>
                <SelectItem value="RELIGION">Religion</SelectItem>
                <SelectItem value="DIPLOMATIQUE">Diplomatique</SelectItem>
                <SelectItem value="SOCIAL">Social</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={() => setShowCreateEvent(true)}
              variant="outline"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Nouvel événement
            </Button>
          </div>
        </div>
        
        <EvenementsList 
          evenements={filteredEvenements} 
          onResolve={handleResolveEvenement}
          filteredType={filteredType}
        />
      </div>
      
      <CreateEvenementForm 
        isOpen={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
      />
    </div>
  );
};
