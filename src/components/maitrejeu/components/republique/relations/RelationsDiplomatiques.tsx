
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { nationsMock } from './data';
import { traitesMock } from './data';
import { alliancesMock } from './data';
import { NationsList } from './NationsList';
import { TraitesList } from './TraitesList';
import { AlliancesMilitaires } from './AlliancesMilitaires';
import { DiplomaticHeader } from './DiplomaticHeader';
import { DiplomaticFilters } from './DiplomaticFilters';
import { Nation, Traite, Alliance } from './types';

export const RelationsDiplomatiques: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nations');
  const [searchTerm, setSearchTerm] = useState('');
  const [nationsData, setNationsData] = useState<Nation[]>([...nationsMock]);
  const [traitesData, setTraitesData] = useState<Traite[]>([...traitesMock]);
  const [alliancesData, setAlliancesData] = useState<Alliance[]>([...alliancesMock]);
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
    // Implémentation à venir
    console.log('Open add nation modal');
  };
  
  const openAddTraiteModal = () => {
    // Implémentation à venir
    console.log('Open add traité modal');
  };
  
  const openAddAllianceModal = () => {
    // Implémentation à venir
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
              nations={nationsData} 
              searchTerm={searchTerm} 
              filters={filters}
              isEditable={true}
            />
          </TabsContent>
          
          <TabsContent value="traites">
            <TraitesList 
              traites={traitesData} 
              searchTerm={searchTerm} 
              filters={filters}
              isEditable={true}
            />
          </TabsContent>
          
          <TabsContent value="alliances">
            <AlliancesMilitaires 
              alliances={alliancesData} 
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
