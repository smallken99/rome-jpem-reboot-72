
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResourceTable } from './storage/ResourceTable';
import { StorageLocations } from './storage/StorageLocations';
import { ResourceTransactions } from './storage/ResourceTransactions';
import { Package, Search, Building, History } from 'lucide-react';

export const StorageManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('resources');
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des ressources ou entrepôts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button className="roman-btn">
            <Package className="mr-2 h-4 w-4" />
            <span>Ajouter une ressource</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          variant={activeTab === 'resources' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('resources')}
        >
          <Package className="h-4 w-4" />
          <span>Ressources</span>
        </Button>
        <Button 
          variant={activeTab === 'locations' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('locations')}
        >
          <Building className="h-4 w-4" />
          <span>Entrepôts</span>
        </Button>
        <Button 
          variant={activeTab === 'transactions' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('transactions')}
        >
          <History className="h-4 w-4" />
          <span>Transactions</span>
        </Button>
      </div>
      
      <RomanCard>
        <RomanCard.Content className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="resources" className="p-6 m-0">
              <ResourceTable searchTerm={searchTerm} />
            </TabsContent>
            
            <TabsContent value="locations" className="p-6 m-0">
              <StorageLocations searchTerm={searchTerm} />
            </TabsContent>
            
            <TabsContent value="transactions" className="p-6 m-0">
              <ResourceTransactions searchTerm={searchTerm} />
            </TabsContent>
          </Tabs>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
