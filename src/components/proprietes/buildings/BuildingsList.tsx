
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { OwnedBuilding } from '@/types/buildings';
import { UrbanBuilding } from './UrbanBuilding';

interface BuildingsListProps {
  buildings: OwnedBuilding[];
  onManageBuilding: (id: string) => void;
  onSellBuilding: (id: string) => void;
}

export const BuildingsList: React.FC<BuildingsListProps> = ({ 
  buildings, 
  onManageBuilding, 
  onSellBuilding 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         building.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'urban' && building.buildingType === 'urban') ||
                      (activeTab === 'rural' && building.buildingType === 'rural') ||
                      (activeTab === 'religious' && building.buildingType === 'religious') ||
                      (activeTab === 'public' && building.buildingType === 'public');
                      
    return matchesSearch && matchesTab;
  });
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un bâtiment..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="urban">Urbains</TabsTrigger>
          <TabsTrigger value="rural">Ruraux</TabsTrigger>
          <TabsTrigger value="religious">Religieux</TabsTrigger>
          <TabsTrigger value="public">Publics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBuildings.map(building => (
              <UrbanBuilding 
                key={building.id} 
                building={building} 
                onManage={onManageBuilding} 
                onSell={onSellBuilding} 
              />
            ))}
          </div>
        </TabsContent>
        
        {['urban', 'rural', 'religious', 'public'].map(tab => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBuildings.map(building => (
                <UrbanBuilding 
                  key={building.id} 
                  building={building} 
                  onManage={onManageBuilding} 
                  onSell={onSellBuilding} 
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
