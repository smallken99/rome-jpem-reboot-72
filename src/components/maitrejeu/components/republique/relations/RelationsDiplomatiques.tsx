
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus } from 'lucide-react';
import { TraitesList } from './TraitesList';
import { NationsList } from './NationsList';
import { AlliancesMilitaires } from './AlliancesMilitaires';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { ActionsPanel, ActionItem } from '@/components/ui-custom/ActionsPanel';

export const RelationsDiplomatiques: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nations');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Actions spécifiques à chaque tab
  const getTabActions = (): ActionItem[] => {
    switch(activeTab) {
      case 'nations':
        return [
          { 
            label: "Ajouter une nation", 
            icon: <Plus size={16} />, 
            onClick: () => console.log("Ajouter nation"), 
            variant: 'default'
          }
        ];
      case 'traites':
        return [
          { 
            label: "Ajouter un traité", 
            icon: <Plus size={16} />, 
            onClick: () => console.log("Ajouter traité"), 
            variant: 'default'
          }
        ];
      case 'alliances':
        return [
          { 
            label: "Ajouter une alliance", 
            icon: <Plus size={16} />, 
            onClick: () => console.log("Ajouter alliance"), 
            variant: 'default'
          }
        ];
      default:
        return [];
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Relations Diplomatiques</CardTitle>
            <CardDescription>
              Gérez les relations de Rome avec les nations étrangères, les alliances et les traités.
            </CardDescription>
          </div>
          
          <ActionButton 
            icon={<Plus size={16} />}
            label={`Nouveau ${activeTab === 'nations' ? 'nation' : activeTab === 'traites' ? 'traité' : 'alliance'}`}
            onClick={() => console.log(`Ajouter ${activeTab}`)}
            variant="default"
            title={`Ajouter un nouveau ${activeTab === 'nations' ? 'nation' : activeTab === 'traites' ? 'traité' : 'alliance'}`}
          />
        </div>
        
        <div className="relative mt-4">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, région, type..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nations">Nations</TabsTrigger>
            <TabsTrigger value="traites">Traités</TabsTrigger>
            <TabsTrigger value="alliances">Alliances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nations" className="mt-4">
            <ActionsPanel
              title="Actions disponibles"
              description="Gérez les relations avec les nations étrangères"
              actions={getTabActions()}
              className="mb-4"
            />
            <NationsList searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="traites" className="mt-4">
            <ActionsPanel
              title="Actions disponibles"
              description="Gérez les traités diplomatiques"
              actions={getTabActions()}
              className="mb-4"
            />
            <TraitesList searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="alliances" className="mt-4">
            <ActionsPanel
              title="Actions disponibles"
              description="Gérez les alliances militaires"
              actions={getTabActions()}
              className="mb-4"
            />
            <AlliancesMilitaires searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
