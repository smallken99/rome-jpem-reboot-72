
import { Dispatch, SetStateAction } from 'react';

export type ChartViewType = 'monthly' | 'quarterly' | 'annual';

export interface PropertyProfitData {
  id: number;
  name: string;
  type: string;
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
  roi: number;
}

export interface RevenueExpenseChartData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface RevenueSourceData {
  source: string;
  value: number;
  percentage: number;
}

export interface PropertyTypeData {
  type: string;
  count: number;
  value: number;
  percentage: number;
}

export interface Recommendation {
  id: number;
  property: string;
  action: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
  estimatedBenefit: number;
}

export interface ProfitabilityData {
  profitableProperties: PropertyProfitData[];
  revenueExpenseData: RevenueExpenseChartData[];
  revenueSources: RevenueSourceData[];
  propertyTypes: PropertyTypeData[];
  optimizationRecommendations: Recommendation[];
  activeView: ChartViewType;
  setActiveView: Dispatch<SetStateAction<ChartViewType>>;
}

export interface PropertyDistributionPieProps {
  data: PropertyTypeData[];
}

export interface RevenueExpenseChartProps {
  data: RevenueExpenseChartData[];
  activeView: ChartViewType;
}

export interface RevenueSourcesChartProps {
  data: RevenueSourceData[];
}

export interface ProfitablePropertiesTableProps {
  data: PropertyProfitData[];
}

export interface OptimizationRecommendationsProps {
  recommendations: Recommendation[];
}
