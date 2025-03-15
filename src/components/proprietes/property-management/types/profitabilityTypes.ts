
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
  impact: 'low' | 'medium' | 'high';
  estimatedRevenue?: number;
  estimatedSavings?: number;
}

export interface ProfitabilityHeaderProps {
  totalRevenue: number;
  totalExpenses: number;
  profitMargin: number;
  viewType: ChartViewType;
  setViewType: (type: ChartViewType) => void;
}

export interface ProfitablePropertiesTableProps {
  properties: PropertyProfitData[];
}

export interface RevenueExpenseChartProps {
  data: RevenueExpenseChartData[];
  viewType: ChartViewType;
}

export interface OptimizationRecommendationsProps {
  recommendations: OptimizationRecommendation[];
}
