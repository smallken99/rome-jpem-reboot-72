
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfitablePropertiesTable } from './ProfitablePropertiesTable';
import { RevenueExpenseChart } from './RevenueExpenseChart';
import { PropertyDistributionPie } from './PropertyDistributionPie';
import { RevenueSourcesChart } from './RevenueSourcesChart';
import { OptimizationRecommendations } from './OptimizationRecommendations';
import { useProfitabilityData } from './useProfitabilityData';
import { ProfitabilityHeader } from './ProfitabilityHeader';

export const ProfitabilityTab = () => {
  const {
    profitableProperties,
    revenueExpenseData,
    revenueSources,
    propertyTypes,
    optimizationRecommendations,
    activeView,
    setActiveView
  } = useProfitabilityData();

  return (
    <div className="space-y-6">
      <ProfitabilityHeader 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenus et Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueExpenseChart 
              data={revenueExpenseData} 
              activeView={activeView} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribution des Propriétés</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyDistributionPie data={propertyTypes} />
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="properties">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="properties">Propriétés Rentables</TabsTrigger>
          <TabsTrigger value="sources">Sources de Revenus</TabsTrigger>
          <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Propriétés les Plus Rentables</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfitablePropertiesTable data={profitableProperties} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Sources de Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueSourcesChart data={revenueSources} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommandations d'Optimisation</CardTitle>
            </CardHeader>
            <CardContent>
              <OptimizationRecommendations recommendations={optimizationRecommendations} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
