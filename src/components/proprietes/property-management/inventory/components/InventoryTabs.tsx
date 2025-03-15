
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Resource, ResourceType, Transaction, MarketPrice } from '../data/types';
import { ResourcesList } from './ResourcesList';
import { TransactionsList } from '../../inventory/TransactionsList';
import { MarketPricesTable } from './MarketPricesTable';

interface InventoryTabsProps {
  resources: Resource[];
  resourceTypes: ResourceType[];
  transactions: Transaction[];
  marketPrices: MarketPrice[];
}

export const InventoryTabs: React.FC<InventoryTabsProps> = ({
  resources,
  resourceTypes,
  transactions,
  marketPrices
}) => {
  const [activeTab, setActiveTab] = useState('resources');
  
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="resources">Ressources</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="market">Prix du marché</TabsTrigger>
      </TabsList>
      
      <TabsContent value="resources">
        <ResourcesList resources={resources} resourceTypes={resourceTypes} />
      </TabsContent>
      
      <TabsContent value="transactions">
        <TransactionsList transactions={transactions} />
      </TabsContent>
      
      <TabsContent value="market">
        <MarketPricesTable marketPrices={marketPrices} />
      </TabsContent>
    </Tabs>
  );
};
