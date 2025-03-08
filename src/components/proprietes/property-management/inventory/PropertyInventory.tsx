
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Warehouse, 
  ShoppingCart, 
  ClipboardList,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronsUpDown,
  ArrowUpDown
} from 'lucide-react';
import { useProfitabilityData } from '../profitability/useProfitabilityData';
import { PropertyManagementHeader } from '../PropertyManagementHeader';
import { ResourceItem } from './ResourceItem';
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
  
  const filteredResources = resourceTypeFilter === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === resourceTypeFilter);
  
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
      <PropertyManagementHeader 
        title={`Inventaire: ${property.name}`}
        subtitle="Gestion des ressources et stocks de votre propriété"
        backHref={`/patrimoine/proprietes/${propertyId}`}
      />
      
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Ressources disponibles</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Filtrer par type:</span>
                <select 
                  className="border border-input px-3 py-1 rounded text-sm"
                  value={resourceTypeFilter}
                  onChange={(e) => setResourceTypeFilter(e.target.value)}
                >
                  <option value="all">Tous</option>
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Gérez vos stocks de ressources, matières premières et marchandises.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.length > 0 ? (
                  filteredResources.map(resource => (
                    <ResourceItem 
                      key={resource.id}
                      name={resource.name}
                      type={resource.type}
                      quantity={resource.quantity}
                      unit={resource.unit}
                      value={resource.value}
                      trend={resource.trend}
                      trendPercentage={resource.trendPercentage}
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center p-8">
                    <p className="text-muted-foreground">Aucune ressource trouvée</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="market" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Marché des ressources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Consultez les prix actuels du marché et effectuez des achats et ventes.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ressource</TableHead>
                    <TableHead>Prix d'achat (as)</TableHead>
                    <TableHead>Prix de vente (as)</TableHead>
                    <TableHead>Tendance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketPrices.map((price, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{price.resourceName}</TableCell>
                      <TableCell>{price.buyPrice} par unité</TableCell>
                      <TableCell>{price.sellPrice} par unité</TableCell>
                      <TableCell>
                        <Badge 
                          variant={price.trend === 'up' ? 'default' : price.trend === 'down' ? 'destructive' : 'secondary'} 
                          className="flex items-center gap-1 w-fit"
                        >
                          {price.trend === 'up' && <ArrowUp className="h-3 w-3" />}
                          {price.trend === 'down' && <ArrowDown className="h-3 w-3" />}
                          {price.trend === 'stable' && <Minus className="h-3 w-3" />}
                          {price.trendPercentage}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">Acheter</Button>
                        <Button variant="outline" size="sm">Vendre</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historique des transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Consultez l'historique des achats, ventes et transferts de ressources.
              </p>
              {transactions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Ressource</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Prix unitaire</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map(transaction => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              transaction.type === 'buy' ? 'destructive' : 
                              transaction.type === 'sell' ? 'default' : 
                              'secondary'
                            }
                          >
                            {transaction.type === 'buy' && 'Achat'}
                            {transaction.type === 'sell' && 'Vente'}
                            {transaction.type === 'transfer' && 'Transfert'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{transaction.resourceName}</TableCell>
                        <TableCell>{transaction.quantity}</TableCell>
                        <TableCell>{transaction.unitPrice} as</TableCell>
                        <TableCell className="text-right font-bold">{transaction.total} as</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">Aucune transaction enregistrée</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
