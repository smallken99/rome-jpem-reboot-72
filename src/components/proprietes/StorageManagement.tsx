
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { ResourceTable } from './property-management/inventory/ResourcesList';
import { StorageLocations } from './property-management/inventory/StorageLocations';
import { ResourceTransactions } from './property-management/inventory/TransactionsList';

export const StorageManagement = () => {
  const [activeTab, setActiveTab] = useState('resources');
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion du Stockage</CardTitle>
        <CardDescription>
          Gérez vos ressources, vos entrepôts et vos transactions
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des ressources..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Ajouter une transaction</span>
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resources">Ressources</TabsTrigger>
            <TabsTrigger value="locations">Entrepôts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources" className="mt-6">
            <ResourceTable searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="locations" className="mt-6">
            <StorageLocations searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="transactions" className="mt-6">
            <ResourceTransactions searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
