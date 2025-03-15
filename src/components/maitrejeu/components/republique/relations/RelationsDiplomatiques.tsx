
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { nationsMock, traitesMock, alliancesMock } from './data';
import { Nation, Traite, Alliance } from './types';
import { NationsList } from './NationsList';
import { TraitesList } from './TraitesList';
import { AlliancesMilitaires } from './AlliancesMilitaires';
import { DiplomaticFilters } from './DiplomaticFilters';

export interface RelationsDiplomatiquesProps {
  isEditable?: boolean;
}

export const RelationsDiplomatiques: React.FC<RelationsDiplomatiquesProps> = ({ 
  isEditable = true 
}) => {
  const [activeTab, setActiveTab] = useState('nations');
  const [nations] = useState<Nation[]>(nationsMock);
  const [traites] = useState<Traite[]>(traitesMock);
  const [alliances] = useState<Alliance[]>(alliancesMock);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<any>({});
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  const handleFilter = (newFilter: any) => {
    setFilter(newFilter);
  };
  
  const filteredNations = nations.filter(nation => {
    // Apply text search
    if (searchTerm && !nation.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (filter.status && nation.status !== filter.status) {
      return false;
    }
    
    // Apply region filter
    if (filter.region && nation.region !== filter.region) {
      return false;
    }
    
    return true;
  });
  
  const filteredTraites = traites.filter(traite => {
    // Apply text search
    if (searchTerm && !traite.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply type filter
    if (filter.type && traite.type !== filter.type) {
      return false;
    }
    
    // Apply status filter
    if (filter.status && traite.status !== filter.status) {
      return false;
    }
    
    return true;
  });
  
  const filteredAlliances = alliances.filter(alliance => {
    // Apply text search
    if (searchTerm && !alliance.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply type filter
    if (filter.type && alliance.type !== filter.type) {
      return false;
    }
    
    // Apply status filter
    if (filter.status && alliance.status !== filter.status) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relations Diplomatiques</CardTitle>
        </CardHeader>
        <CardContent>
          <DiplomaticFilters 
            onSearch={handleSearch} 
            onFilter={handleFilter}
            activeTab={activeTab}
          />
          
          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="nations">Nations</TabsTrigger>
                <TabsTrigger value="traites">Traités</TabsTrigger>
                <TabsTrigger value="alliances">Alliances</TabsTrigger>
              </TabsList>
              
              <TabsContent value="nations" className="mt-4">
                <NationsList 
                  nations={filteredNations} 
                  isEditable={isEditable} 
                />
              </TabsContent>
              
              <TabsContent value="traites" className="mt-4">
                <TraitesList 
                  traites={filteredTraites}
                  isEditable={isEditable}
                />
              </TabsContent>
              
              <TabsContent value="alliances" className="mt-4">
                <AlliancesMilitaires 
                  alliances={filteredAlliances}
                  isEditable={isEditable}
                />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
