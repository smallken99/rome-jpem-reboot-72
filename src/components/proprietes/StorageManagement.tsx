
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Plus, Filter } from 'lucide-react';
import StorageStats from './storage/StorageStats';
import ResourcesTable from './storage/ResourcesTable';
import { TransactionsList } from './storage/TransactionsList';

export const StorageManagement = () => {
  const [activeTab, setActiveTab] = useState('resources');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock data
  const resources = [
    { id: '1', name: 'Blé', type: 'Grain', quantity: 1200, unit: 'kg', value: 12000 },
    { id: '2', name: 'Vin', type: 'Boisson', quantity: 500, unit: 'L', value: 25000 },
    { id: '3', name: 'Huile d\'olive', type: 'Huile', quantity: 300, unit: 'L', value: 15000 },
    { id: '4', name: 'Sel', type: 'Épice', quantity: 100, unit: 'kg', value: 5000 },
    { id: '5', name: 'Poterie', type: 'Artisanat', quantity: 50, unit: 'pièces', value: 2500 },
  ];
  
  // Calculate stats
  const totalCapacity = 5000;
  const usedCapacity = resources.reduce((sum, r) => sum + r.quantity, 0);
  const resourceCount = resources.length;
  const totalValue = resources.reduce((sum, r) => sum + r.value, 0);
  
  const handleAddResource = () => {
    console.log('Add resource');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Stocks</h1>
          <p className="text-muted-foreground">
            Gérez vos ressources, suivez vos transactions et optimisez vos stocks
          </p>
        </div>
      </div>
      
      <StorageStats 
        totalCapacity={totalCapacity}
        usedCapacity={usedCapacity}
        resourceCount={resourceCount}
        totalValue={totalValue}
      />
      
      <Card>
        <CardHeader className="px-6 py-4 flex flex-row items-center justify-between">
          <CardTitle>Stocks et Transactions</CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8 w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="resources">Ressources</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources">
              <ResourcesTable 
                resources={resources} 
                onAddResource={handleAddResource}
              />
            </TabsContent>
            
            <TabsContent value="transactions">
              <TransactionsList />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
