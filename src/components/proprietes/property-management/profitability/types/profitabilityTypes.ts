
export type ChartViewType = 'yearly' | 'monthly';

export interface RevenueExpenseChartData {
  name: string;
  revenus: number;
  dépenses: number;
  profit: number;
}

export interface RevenueSourceData {
  name: string;
  value: number;
  color: string;
}

export interface PropertyProfitData {
  id: number;
  name: string;
  type: string;
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
}

export interface OptimizationRecommendation {
  id: number;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedRevenue?: number;
  estimatedSavings?: number;
}

export interface ProfitabilityHeaderProps {
  activeView: ChartViewType;
  setActiveView: (view: ChartViewType) => void;
}

export interface RevenueExpenseChartProps {
  data: RevenueExpenseChartData[];
  activeView: ChartViewType;
}

export interface RevenueSourcesChartProps {
  data: RevenueSourceData[];
}

export interface ProfitablePropertiesTableProps {
  properties: PropertyProfitData[];
  activeView: ChartViewType;
}

export interface OptimizationRecommendationsProps {
  recommendations: OptimizationRecommendation[];
}
