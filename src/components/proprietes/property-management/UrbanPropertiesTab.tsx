
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UrbanCatalogueSection } from './urban/catalogue/UrbanCatalogueSection';
import { OwnedUrbanPropertiesSection } from './urban/owned/OwnedUrbanPropertiesSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUrbanPropertiesTab } from './urban/hooks/useUrbanPropertiesTab';
import { BuildingType } from '../data/types/buildingTypes';

export const UrbanPropertiesTab = () => {
  const { 
    properties, 
    handlePurchaseProperty, 
    handleSellProperty, 
    handleViewDetails,
  } = useUrbanPropertiesTab();

  const [selectedType, setSelectedType] = useState<BuildingType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter properties based on selected type and search term
  const filteredProperties = properties.filter(property => {
    const matchesType = selectedType === 'all' || property.type === selectedType;
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher une propriété..."
            className="w-full px-3 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select 
            className="px-3 py-2 border rounded-md"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as BuildingType | 'all')}
          >
            <option value="all">Tous les types</option>
            <option value="residential">Résidentiel</option>
            <option value="public">Public</option>
            <option value="religious">Religieux</option>
            <option value="military">Militaire</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="owned" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="owned">Mes propriétés</TabsTrigger>
          <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
        </TabsList>
        <TabsContent value="owned" className="border rounded-md p-4">
          <ScrollArea className="h-[500px] pr-4">
            <OwnedUrbanPropertiesSection 
              properties={filteredProperties.filter(p => p.owned)} 
              onViewDetails={handleViewDetails}
              onSellProperty={handleSellProperty}
            />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="catalogue" className="border rounded-md p-4">
          <ScrollArea className="h-[500px] pr-4">
            <UrbanCatalogueSection 
              properties={filteredProperties.filter(p => !p.owned)} 
              onPurchaseProperty={handlePurchaseProperty}
            />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
