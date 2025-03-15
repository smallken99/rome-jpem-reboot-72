
export type ChartViewType = 'yearly' | 'monthly' | 'quarterly' | 'annual';

export interface ProfitabilityHeaderProps {
  activeView: ChartViewType;
  setActiveView: (view: ChartViewType) => void;
}

export interface PropertyProfitData {
  id: string | number;
  name: string;
  type: string;
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
  roi: number;
}

export interface RevenueExpenseData {
  name: string;
  revenue: number;
  expenses: number;
}

export interface RevenueExpenseChartData extends RevenueExpenseData {
  profit: number;
  month?: string;
}

export interface RevenueSourceData {
  id?: string;
  name: string;
  value: number;
  percent: number;
  source?: string;
  percentage?: number;
  color?: string;
  label?: string;
}

export interface PropertyTypeData {
  name: string;
  count: number;
  revenue: number;
  percent: number;
  type?: string;
  value?: number;
  percentage?: number;
}

export interface Recommendation {
  id: string | number;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  propertyId?: string | number;
  propertyName?: string;
  potentialIncrease?: number;
  property?: string;
  action?: string;
  estimatedBenefit?: number;
}

export interface PropertyDistributionPieProps {
  data: PropertyTypeData[];
}

export interface RevenueSourcesChartProps {
  data: RevenueSourceData[];
}

export interface ProfitablePropertiesTableProps {
  properties: PropertyProfitData[];
  activeView?: ChartViewType;
  sortBy?: string;
  onSortChange?: (sortBy: string) => void;
}

export interface OptimizationRecommendationsProps {
  recommendations: Recommendation[];
  onSelectProperty?: (propertyId: string | number) => void;
}

export interface RevenueExpenseChartProps {
  data: RevenueExpenseChartData[];
  activeView: ChartViewType;
}

export interface ProfitabilityData {
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  profitMargin: number;
  roi: number;
  mostProfitable: PropertyProfitData | null;
  leastProfitable: PropertyProfitData | null;
  timeSeriesData: RevenueExpenseData[];
  propertiesData: PropertyProfitData[];
  revenueSources: RevenueSourceData[];
  propertyTypes: PropertyTypeData[];
  recommendations: Recommendation[];
  activeView: ChartViewType;
  setActiveView: (view: ChartViewType) => void;
  // Aliases pour la compatibilité
  profitableProperties?: PropertyProfitData[];
  revenueExpenseData?: RevenueExpenseChartData[];
  optimizationRecommendations?: Recommendation[];
}
