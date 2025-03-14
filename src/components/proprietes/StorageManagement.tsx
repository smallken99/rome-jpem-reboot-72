
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Filter } from 'lucide-react';
import ResourcesList from './storage/ResourcesList';
import TransactionsList from './storage/TransactionsList';
import { Resource, Transaction } from './storage/types';

export const StorageManagement = () => {
  const [activeTab, setActiveTab] = useState('resources');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  const handleResourceSelect = (resource: Resource) => {
    setSelectedResource(resource);
    setActiveTab('transactions');
  };
  
  const handleTransactionSelect = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    // You could navigate to a transaction detail page or open a modal here
  };
  
  const handleAddResource = () => {
    // Logic for adding a new resource
    console.log('Add new resource');
  };
  
  const handleAddTransaction = () => {
    // Logic for adding a new transaction
    console.log('Add new transaction');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold">Gestion des Stocks</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resources">Ressources</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources">
          <ResourcesList 
            searchTerm={searchTerm}
            onResourceSelect={handleResourceSelect}
            onAddResource={handleAddResource}
          />
        </TabsContent>
        
        <TabsContent value="transactions">
          <TransactionsList 
            searchTerm={searchTerm}
            resourceId={selectedResource?.id}
            onTransactionSelect={handleTransactionSelect}
            onAddTransaction={handleAddTransaction}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StorageManagement;
