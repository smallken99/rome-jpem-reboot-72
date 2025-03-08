
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Warehouse, ShoppingCart, ClipboardList } from 'lucide-react';
import { useProfitabilityData } from '../profitability/useProfitabilityData';
import { ResourcesList } from './ResourcesList';
import { MarketPrices } from './MarketPrices';
import { TransactionsList } from './TransactionsList';
import { 
  getResourcesByPropertyId, 
  getResourceTypes, 
  marketPrices,
  getTransactionsByPropertyId
} from './data/inventoryData';

export const PropertyInventory: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('resources');
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string>('all');
  const { profitableProperties } = useProfitabilityData();
  
  const property = profitableProperties.find(p => p.id.toString() === propertyId);
  const resources = propertyId ? getResourcesByPropertyId(propertyId) : [];
  const resourceTypes = getResourceTypes();
  const transactions = propertyId ? getTransactionsByPropertyId(propertyId) : [];
  
  if (!property) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Propriété non trouvée</h2>
              <p className="text-muted-foreground mb-4">
                La propriété que vous recherchez n'existe pas.
              </p>
              <Button onClick={() => navigate('/patrimoine/proprietes')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux propriétés
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventaire: {property.name}</h1>
          <p className="text-muted-foreground">Gestion des ressources et stocks de votre propriété</p>
        </div>
        <Button variant="outline" onClick={() => navigate(`/patrimoine/proprietes/${propertyId}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux détails
        </Button>
      </div>
      
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
    </div>
  );
};
