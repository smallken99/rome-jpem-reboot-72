
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiplomaticFilters } from './DiplomaticFilters';
import { NationsTab } from './tabs/NationsTab';
import { TraitesTab } from './tabs/TraitesTab';
import { AlliancesTab } from './tabs/AlliancesTab';
import { AddNationModal } from './modals/AddNationModal';
import { AddTraiteModal } from './modals/AddTraiteModal';
import { AddAllianceModal } from './modals/AddAllianceModal';
import { nationsMock } from './data/nations';
import { traitesMock } from './data/traites';
import { alliancesMock } from './data/alliances';
import { Nation, Traite, Alliance } from './types';
import { Card, CardContent } from '@/components/ui/card';

export const RelationsDiplomatiques: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nations');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: '',
    status: '',
    type: '',
    dateFrom: '',
    dateTo: ''
  });
  
  // Modals state
  const [isAddNationModalOpen, setIsAddNationModalOpen] = useState(false);
  const [isAddTraiteModalOpen, setIsAddTraiteModalOpen] = useState(false);
  const [isAddAllianceModalOpen, setIsAddAllianceModalOpen] = useState(false);
  
  // Handlers for adding new items
  const handleAddNation = (nation: Nation) => {
    console.log('Nation ajoutée:', nation);
    // Dans une implémentation réelle, ajoutez la nation à la liste
  };
  
  const handleAddTraite = (traite: Traite) => {
    console.log('Traité ajouté:', traite);
    // Dans une implémentation réelle, ajoutez le traité à la liste
  };
  
  const handleAddAlliance = (alliance: Alliance) => {
    console.log('Alliance ajoutée:', alliance);
    // Dans une implémentation réelle, ajoutez l'alliance à la liste
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <DiplomaticFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          activeTab={activeTab}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="nations">Nations</TabsTrigger>
            <TabsTrigger value="traites">Traités</TabsTrigger>
            <TabsTrigger value="alliances">Alliances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nations">
            <NationsTab 
              searchTerm={searchTerm} 
              filters={filters} 
              openAddNationModal={() => setIsAddNationModalOpen(true)} 
            />
          </TabsContent>
          
          <TabsContent value="traites">
            <TraitesTab 
              searchTerm={searchTerm} 
              filters={filters} 
              openAddTraiteModal={() => setIsAddTraiteModalOpen(true)} 
            />
          </TabsContent>
          
          <TabsContent value="alliances">
            <AlliancesTab 
              searchTerm={searchTerm} 
              filters={filters} 
              openAddAllianceModal={() => setIsAddAllianceModalOpen(true)} 
            />
          </TabsContent>
        </Tabs>
        
        {/* Modals */}
        <AddNationModal
          isOpen={isAddNationModalOpen}
          onClose={() => setIsAddNationModalOpen(false)}
          onSave={handleAddNation}
        />
        
        <AddTraiteModal
          isOpen={isAddTraiteModalOpen}
          onClose={() => setIsAddTraiteModalOpen(false)}
          nations={nationsMock}
          onSave={handleAddTraite}
        />
        
        <AddAllianceModal
          isOpen={isAddAllianceModalOpen}
          onClose={() => setIsAddAllianceModalOpen(false)}
          nations={nationsMock}
          onSave={handleAddAlliance}
        />
      </CardContent>
    </Card>
  );
};
