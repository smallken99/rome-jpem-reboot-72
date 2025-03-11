
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { TraitesList } from './relations/TraitesList';
import { NationsList } from './relations/NationsList';
import { AlliancesMilitaires } from './relations/AlliancesMilitaires';

export const RelationsDiplomatiques: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('traites');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relations Diplomatiques</CardTitle>
        <CardDescription>
          Gestion des traités, alliances et relations internationales
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
                placeholder="Rechercher..."
                className="pl-8 px-3 py-2 border rounded-md w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <ActionButton 
              variant="default"
              label="Nouveau traité"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => console.log('Nouveau traité')}
            />
          </div>
        </div>

        {/* Onglets */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="traites">Traités</TabsTrigger>
            <TabsTrigger value="nations">Nations</TabsTrigger>
            <TabsTrigger value="alliances">Alliances militaires</TabsTrigger>
          </TabsList>
          
          <TabsContent value="traites" className="pt-6">
            <TraitesList searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="nations" className="pt-6">
            <NationsList searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="alliances" className="pt-6">
            <AlliancesMilitaires searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
