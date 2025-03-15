
export interface PropertyProfitData {
  id: number;
  name: string;
  type: string;
  revenue: number;
  expenses: number;
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
  id: string;
  value: number;
  name?: string;
  color?: string;
}

export interface PropertyTypeData {
  label: string;
  value: number;
  color?: string;
}

export type ChartViewType = 'monthly' | 'quarterly' | 'yearly';

export interface ProfitabilityHeaderProps {
  activeView: ChartViewType;
  setActiveView: (view: ChartViewType) => void;
}

export interface RevenueExpenseChartProps {
  data: RevenueExpenseChartData[];
  activeView: ChartViewType;
}

export interface PropertyDistributionPieProps {
  data: PropertyTypeData[];
}

export interface ProfitablePropertiesTableProps {
  properties: PropertyProfitData[];
  activeView: ChartViewType;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'high' | 'medium' | 'low';
  impact?: string;
}

export interface OptimizationRecommendationsProps {
  recommendations: Recommendation[];
}

export interface RevenueSourcesPieProps {
  data: RevenueSourceData[];
}
