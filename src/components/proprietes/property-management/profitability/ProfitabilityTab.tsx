
import React from 'react';
import { useProfitabilityData } from './useProfitabilityData';
import { ProfitabilityHeader } from './ProfitabilityHeader';
import { RevenueExpenseChart } from './RevenueExpenseChart';
import { RevenueSourcesChart } from './RevenueSourcesChart';
import { ProfitablePropertiesTable } from './ProfitablePropertiesTable';
import { OptimizationRecommendations } from './OptimizationRecommendations';

export const ProfitabilityTab: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    revenueExpenseData, 
    revenueSourcesData, 
    topProperties,
    totalRevenue,
    totalExpenses,
    totalProfit,
    overallRoi,
    recommendations
  } = useProfitabilityData();
  
  return (
    <div className="space-y-6">
      <ProfitabilityHeader 
        activeView={activeView}
        setActiveView={setActiveView}
        totalRevenue={totalRevenue.value}
        totalExpenses={totalExpenses.value}
        totalProfit={totalProfit}
        overallRoi={overallRoi}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueExpenseChart data={revenueExpenseData} />
        <RevenueSourcesChart data={revenueSourcesData} />
      </div>
      
      <ProfitablePropertiesTable properties={topProperties} />
      
      <OptimizationRecommendations recommendations={recommendations} />
    </div>
  );
};
