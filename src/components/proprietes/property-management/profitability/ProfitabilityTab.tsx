
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ProfitabilityHeader } from './ProfitabilityHeader';
import { RevenueExpenseChart } from './RevenueExpenseChart';
import { RevenueSourcesChart } from './RevenueSourcesChart';
import { PropertyDistributionPie } from './PropertyDistributionPie';
import { ProfitablePropertiesTable } from './ProfitablePropertiesTable';
import { OptimizationRecommendations } from './OptimizationRecommendations';
import { useProfitabilityData } from './useProfitabilityData';

export const ProfitabilityTab = () => {
  const {
    activeView,
    setActiveView,
    revenueSources,
    propertyTypes,
    revenueExpenseData,
    propertiesData,
    recommendations,
    totalRevenue,
    totalExpenses,
    totalProfit,
    profitMargin,
    roi
  } = useProfitabilityData();

  return (
    <div className="space-y-6">
      {/* En-tête avec les sélecteurs de période */}
      <ProfitabilityHeader activeView={activeView} setActiveView={setActiveView} />
      
      {/* Métriques générales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenu Total</CardTitle>
          </CardHeader>
          <CardContent className="py-1">
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} As</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dépenses Totales</CardTitle>
          </CardHeader>
          <CardContent className="py-1">
            <div className="text-2xl font-bold">{totalExpenses.toLocaleString()} As</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profit Total</CardTitle>
          </CardHeader>
          <CardContent className="py-1">
            <div className="text-2xl font-bold">{totalProfit.toLocaleString()} As</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Marge de Profit</CardTitle>
          </CardHeader>
          <CardContent className="py-1">
            <div className="text-2xl font-bold">{profitMargin.toFixed(1)}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">ROI Global</CardTitle>
          </CardHeader>
          <CardContent className="py-1">
            <div className="text-2xl font-bold">{roi.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Graphiques et tableaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenus et Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueExpenseChart data={revenueExpenseData || []} activeView={activeView} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Propriétés les plus rentables</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfitablePropertiesTable properties={propertiesData} activeView={activeView} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sources de revenus</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueSourcesChart data={revenueSources} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommandations d'optimisation</CardTitle>
          </CardHeader>
          <CardContent>
            <OptimizationRecommendations recommendations={recommendations} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
