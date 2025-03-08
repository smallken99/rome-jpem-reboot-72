
import React, { useState } from 'react';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PoliticalEventsTimeline } from './components/PoliticalEventsTimeline';
import { ElectionPlanner } from './components/ElectionPlanner';
import { LoisTable } from './components/LoisTable';
import { PartisGraph } from './components/PartisGraph';
import { Search, Calendar, Book, Users, PlusCircle } from 'lucide-react';

export const GestionPolitique: React.FC = () => {
  const { 
    gameState, 
    lois, 
    senateurs,
    evenements,
    scheduleElection 
  } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('evenements');
  
  // Filtrer les événements politiques
  const politicalEvents = evenements.filter(event => 
    event.type === 'POLITIQUE' || event.type === 'SOCIAL'
  );
  
  // Données pour le graphique des partis
  const factions = [
    { name: "Populares", value: 35, color: "#ef4444" },
    { name: "Optimates", value: 40, color: "#3b82f6" },
    { name: "Moderates", value: 25, color: "#a855f7" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Politique Romaine</h2>
        <div>
          <span className="text-sm text-gray-500 mr-2">Année: {gameState.year} AUC</span>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle Proposition
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="evenements" className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Événements
              </TabsTrigger>
              <TabsTrigger value="lois" className="flex items-center">
                <Book className="mr-1 h-4 w-4" />
                Lois
              </TabsTrigger>
              <TabsTrigger value="elections" className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                Élections
              </TabsTrigger>
              <TabsTrigger value="partis">Partis</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative w-60">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <TabsContent value="evenements" className="pt-2">
          <PoliticalEventsTimeline 
            events={politicalEvents}
          />
        </TabsContent>
        
        <TabsContent value="elections" className="pt-2">
          <ElectionPlanner 
            senateurs={senateurs}
            onScheduleElection={scheduleElection}
          />
        </TabsContent>
        
        <TabsContent value="lois" className="pt-2">
          <LoisTable 
            lois={lois}
            searchTerm={searchTerm}
          />
        </TabsContent>
        
        <TabsContent value="partis" className="pt-2">
          <PartisGraph 
            factions={factions}
          />
        </TabsContent>
      </div>
    </div>
  );
};
