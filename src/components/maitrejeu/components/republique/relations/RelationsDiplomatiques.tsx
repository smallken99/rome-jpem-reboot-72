
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { nations } from './data/nations';
import { traites } from './data/traites';
import { alliances } from './data/alliances';
import { NationsList } from './NationsList';
import { TraitesList } from './TraitesList';
import { AlliancesMilitaires } from './AlliancesMilitaires';
import { DiplomaticHeader } from './DiplomaticHeader';
import { DiplomaticFilters } from './DiplomaticFilters';
import { Nation, Traite, Alliance } from './types';

export const RelationsDiplomatiques: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nations');
  const [searchTerm, setSearchTerm] = useState('');
  const [nations, setNations] = useState<Nation[]>([...nations]);
  const [traites, setTraites] = useState<Traite[]>([...traites]);
  const [alliances, setAlliances] = useState<Alliance[]>([...alliances]);
  const [filters, setFilters] = useState({
    status: '',
    region: '',
    dateFrom: '',
    dateTo: ''
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  const resetFilters = () => {
    setFilters({
      status: '',
      region: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilter: any) => {
    setFilters(newFilter);
  };
  
  const openAddNationModal = () => {
    // TODO: Implement nation modal
    console.log('Open add nation modal');
  };
  
  const openAddTraiteModal = () => {
    // TODO: Implement traité modal
    console.log('Open add traité modal');
  };
  
  const openAddAllianceModal = () => {
    // TODO: Implement alliance modal
    console.log('Open add alliance modal');
  };
  
  return (
    <Card>
      <CardHeader className="p-6">
        <DiplomaticHeader 
          activeTab={activeTab}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={resetFilters}
          openAddNationModal={openAddNationModal}
          openAddTraiteModal={openAddTraiteModal}
          openAddAllianceModal={openAddAllianceModal}
        />
      </CardHeader>
      
      <CardContent className="p-6 pt-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="nations">Nations</TabsTrigger>
            <TabsTrigger value="traites">Traités</TabsTrigger>
            <TabsTrigger value="alliances">Alliances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nations">
            <NationsList 
              nations={nations} 
              searchTerm={searchTerm} 
              filters={filters}
              isEditable={true}
            />
          </TabsContent>
          
          <TabsContent value="traites">
            <TraitesList 
              traites={traites} 
              searchTerm={searchTerm} 
              filters={filters}
              isEditable={true}
            />
          </TabsContent>
          
          <TabsContent value="alliances">
            <AlliancesMilitaires 
              alliances={alliances} 
              searchTerm={searchTerm} 
              filters={filters}
              isEditable={true}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
