
export type ChartViewType = 'yearly' | 'monthly';

export interface RevenueExpenseChartData {
  name: string;
  revenus: number;
  dépenses: number;
  profit: number;
}

export interface RevenueSourceData {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface PropertyProfitData {
  id: string;
  name: string;
  type: string;
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  estimatedImpact: string;
  difficulty: 'easy' | 'medium' | 'hard';
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
  recommendations: Recommendation[];
}

export interface PropertyDistributionPieProps {
  urbanProperties: number;
  ruralProperties: number;
  otherProperties: number;
}
