
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Package, History, BarChart3 } from 'lucide-react';
import { StorageStats } from './storage/StorageStats';
import { ResourcesTable } from './storage/ResourcesTable';
import { TransactionsList } from './storage/TransactionsList'; // Changed to named import

export const StorageManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  
  const handleAddResource = () => {
    console.log('Add resource clicked');
  };
  
  const handleAddTransaction = () => {
    console.log('Add transaction clicked');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Stocks</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleAddResource}
          >
            <PlusCircle className="h-4 w-4" />
            Ajouter Ressource
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={handleAddTransaction}
          >
            <PlusCircle className="h-4 w-4" />
            Ajouter Transaction
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <StorageStats />
        </CardContent>
      </Card>
      
      <Tabs defaultValue="inventory" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Inventaire
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analyses
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="inventory">
          <ResourcesTable onAddResource={handleAddResource} />
        </TabsContent>
        
        <TabsContent value="transactions">
          <TransactionsList onAddTransaction={handleAddTransaction} />
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Visualisez la valeur et l'évolution de vos stocks au fil du temps.
              </p>
              <div className="h-[350px] flex items-center justify-center border rounded-md mt-6">
                <p className="text-muted-foreground">Graphiques à venir...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
