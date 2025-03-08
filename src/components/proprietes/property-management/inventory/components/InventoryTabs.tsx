
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Warehouse, ShoppingCart, ClipboardList } from 'lucide-react';
import { ResourcesList } from '../ResourcesList';
import { MarketPrices } from '../MarketPrices';
import { TransactionsList } from '../TransactionsList';
import { PropertyResource, MarketPrice, Transaction } from '../data/types';

interface InventoryTabsProps {
  resources: PropertyResource[];
  resourceTypes: string[];
  transactions: Transaction[];
  marketPrices: MarketPrice[];
}

export const InventoryTabs: React.FC<InventoryTabsProps> = ({
  resources,
  resourceTypes,
  transactions,
  marketPrices
}) => {
  const [activeTab, setActiveTab] = React.useState<string>('resources');
  const [resourceTypeFilter, setResourceTypeFilter] = React.useState<string>('all');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="resources">
          <Warehouse className="h-4 w-4 mr-2" />
          Ressources
        </TabsTrigger>
        <TabsTrigger value="market">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Marché
        </TabsTrigger>
        <TabsTrigger value="transactions">
          <ClipboardList className="h-4 w-4 mr-2" />
          Transactions
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="resources" className="mt-6">
        <ResourcesList 
          resources={resources}
          resourceTypes={resourceTypes}
          resourceTypeFilter={resourceTypeFilter}
          setResourceTypeFilter={setResourceTypeFilter}
        />
      </TabsContent>
      
      <TabsContent value="market" className="mt-6">
        <MarketPrices prices={marketPrices} />
      </TabsContent>
      
      <TabsContent value="transactions" className="mt-6">
        <TransactionsList transactions={transactions} />
      </TabsContent>
    </Tabs>
  );
};
