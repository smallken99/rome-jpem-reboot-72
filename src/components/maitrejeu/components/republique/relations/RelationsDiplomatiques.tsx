
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { DiplomaticFilters } from './DiplomaticFilters';
import { NationsTab } from './tabs/NationsTab';
import { TraitesTab } from './tabs/TraitesTab';
import { AlliancesTab } from './tabs/AlliancesTab';
import { AddNationModal } from './modals/AddNationModal';
import { AddTraiteModal } from './modals/AddTraiteModal';
import { AddAllianceModal } from './modals/AddAllianceModal';
import { nationsMock } from './data/nations';

export const RelationsDiplomatiques = () => {
  const [activeTab, setActiveTab] = useState('nations');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [isAddNationModalOpen, setIsAddNationModalOpen] = useState(false);
  const [isAddTraiteModalOpen, setIsAddTraiteModalOpen] = useState(false);
  const [isAddAllianceModalOpen, setIsAddAllianceModalOpen] = useState(false);

  const resetFilters = () => {
    setFilters({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Relations Diplomatiques</h2>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[200px]"
          />
          <DiplomaticFilters
            activeTab={activeTab}
            onFilterChange={setFilters}
            onReset={resetFilters}
            onSearch={setSearchTerm}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
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
      
      <AddNationModal
        isOpen={isAddNationModalOpen}
        onOpenChange={setIsAddNationModalOpen}
      />
      
      <AddTraiteModal
        isOpen={isAddTraiteModalOpen}
        onOpenChange={setIsAddTraiteModalOpen}
        nations={nationsMock}
      />
      
      <AddAllianceModal
        isOpen={isAddAllianceModalOpen}
        onOpenChange={setIsAddAllianceModalOpen}
        nations={nationsMock}
      />
    </div>
  );
};
