
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Plus, Clock, Shield, Scroll, Network 
} from 'lucide-react';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { LoisTable } from './components/LoisTable';
import { PartisGraph } from './components/PartisGraph';
import { ElectionPlanner } from './components/ElectionPlanner';
import { PoliticalEventsTimeline } from './components/PoliticalEventsTimeline';

export const GestionPolitique: React.FC = () => {
  const { evenements, senateurs, factions, scheduleElection } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="evenements" className="w-full">
          <TabsList>
            <TabsTrigger value="evenements" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Événements</span>
            </TabsTrigger>
            <TabsTrigger value="elections" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Élections</span>
            </TabsTrigger>
            <TabsTrigger value="lois" className="flex items-center gap-2">
              <Scroll className="h-4 w-4" />
              <span>Lois</span>
            </TabsTrigger>
            <TabsTrigger value="partis" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              <span>Partis politiques</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex justify-between items-center mt-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Rechercher..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[250px]" 
              />
            </div>
            <Button 
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter</span>
            </Button>
          </div>
          
          <TabsContent value="evenements" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chronologie politique</CardTitle>
              </CardHeader>
              <CardContent>
                <PoliticalEventsTimeline events={evenements} searchTerm={searchTerm} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="elections" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Planification des élections</CardTitle>
              </CardHeader>
              <CardContent>
                <ElectionPlanner 
                  senateurs={senateurs || []} 
                  onScheduleElection={scheduleElection} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="lois" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Registre des lois</CardTitle>
              </CardHeader>
              <CardContent>
                <LoisTable searchTerm={searchTerm} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="partis" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Réseau des partis politiques</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <PartisGraph factions={factions || []} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
