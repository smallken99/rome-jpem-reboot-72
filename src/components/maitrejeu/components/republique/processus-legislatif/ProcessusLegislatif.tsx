
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { ProjetsDeLoi } from './ProjetsDeLoi';
import { VotesEnCours } from './VotesEnCours';
import { HistoriqueLois } from './HistoriqueLois';

export const ProcessusLegislatif: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('projets');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processus Législatif</CardTitle>
        <CardDescription>
          Gérez les propositions de loi et le processus de vote
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filtres et recherche */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher une loi..."
                className="pl-8 px-3 py-2 border rounded-md w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <ActionButton 
              variant="default"
              label="Nouvelle proposition"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => console.log('Nouvelle proposition')}
            />
          </div>
        </div>

        {/* Onglets */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="projets">Projets de loi</TabsTrigger>
            <TabsTrigger value="votes">Votes en cours</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projets" className="pt-6">
            <ProjetsDeLoi searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="votes" className="pt-6">
            <VotesEnCours searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="historique" className="pt-6">
            <HistoriqueLois searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
