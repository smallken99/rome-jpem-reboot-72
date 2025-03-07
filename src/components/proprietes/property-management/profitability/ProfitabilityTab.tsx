
import React from 'react';
import { ProfitabilityHeader } from './ProfitabilityHeader';
import { RevenueExpenseChart } from './RevenueExpenseChart';
import { RevenueSourcesChart } from './RevenueSourcesChart';
import { ProfitablePropertiesTable } from './ProfitablePropertiesTable';
import { OptimizationRecommendations } from './OptimizationRecommendations';
import { useProfitabilityData } from './useProfitabilityData';

export const ProfitabilityTab: React.FC = () => {
  const {
    activeView,
    setActiveView,
    revenueExpenseData,
    revenueSourcesData,
    topProperties
  } = useProfitabilityData();
  
  return (
    <div className="space-y-6">
      <ProfitabilityHeader 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueExpenseChart 
          data={revenueExpenseData} 
          activeView={activeView} 
        />
        <RevenueSourcesChart 
          data={revenueSourcesData} 
        />
      </div>
      
      <ProfitablePropertiesTable 
        properties={topProperties} 
        activeView={activeView} 
      />
      
      <OptimizationRecommendations />
    </div>
  );
};
