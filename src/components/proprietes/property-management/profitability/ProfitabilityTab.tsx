
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfitabilityData } from './useProfitabilityData';
import { ProfitabilityHeader } from './ProfitabilityHeader';
import { RevenueExpenseChart } from './RevenueExpenseChart';
import { RevenueSourcesChart } from './RevenueSourcesChart';
import { ProfitablePropertiesTable } from './ProfitablePropertiesTable';
import { OptimizationRecommendations } from './OptimizationRecommendations';
import { ChartViewType } from '../types/profitabilityTypes';

export const ProfitabilityTab: React.FC = () => {
  const [activeView, setActiveView] = useState<ChartViewType>("yearly");
  const { 
    chartData, 
    revenueSourcesData, 
    profitableProperties, 
    recommendations 
  } = useProfitabilityData();
  
  return (
    <div className="space-y-6">
      <ProfitabilityHeader />
      
      <div className="flex justify-end mb-4">
        <Tabs defaultValue="yearly" value={activeView} onValueChange={(value) => setActiveView(value as ChartViewType)}>
          <TabsList className="border border-rome-gold/30 bg-white">
            <TabsTrigger value="yearly">Annuel</TabsTrigger>
            <TabsTrigger value="monthly">Mensuel</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueExpenseChart data={chartData} activeView={activeView} />
        <RevenueSourcesChart data={revenueSourcesData} />
      </div>
      
      <ProfitablePropertiesTable properties={profitableProperties} activeView={activeView} />
      
      <OptimizationRecommendations recommendations={recommendations} />
    </div>
  );
};
