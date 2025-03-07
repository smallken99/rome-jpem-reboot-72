
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
  propertyId?: number;
  propertyName?: string;
  action?: string;
  potentialSavings?: number;
  description: string;
  title: string;
  impact: 'low' | 'medium' | 'high';
  estimatedRevenue?: number;
  estimatedSavings?: number;
}

export interface RevenueExpenseChartData {
  name: string;
  revenus: number;
  dépenses: number;
  profit: number;
}

export interface RevenueSourceData {
  name: string;
  value: number;
  color?: string;
}

export type ChartViewType = "yearly" | "monthly";

// For RevenueExpenseChart
export interface RevenueExpenseChartProps {
  data: RevenueExpenseChartData[];
  activeView: ChartViewType;
}

// For ProfitablePropertiesTable
export interface ProfitablePropertiesTableProps {
  properties: PropertyProfitData[];
  activeView: ChartViewType;
}

// For OptimizationRecommendations
export interface OptimizationRecommendationsProps {
  recommendations: OptimizationRecommendation[];
}

// For ProfitabilityHeader
export interface ProfitabilityHeaderProps {
  activeView: ChartViewType;
  setActiveView: (view: ChartViewType) => void;
}
