
export interface RevenueExpenseData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface RevenueExpenseChartProps {
  data: RevenueExpenseData[];
  activeView: ChartViewType;
}

export interface ProfitabilityCalculatorProps {
  buildingId: string;
  buildingType: string;
}

export interface BuildingFinancialData {
  name: string;
  type: string;
  initialCost: number;
  maintenanceCost: number;
  revenue: number;
  profitMargin: number;
  roi: number;
  paybackPeriod: number;
}

export type ChartViewType = 'monthly' | 'quarterly' | 'yearly' | 'annual';

export interface RevenueExpenseChartData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface PropertyProfitData {
  id: number | string;
  name: string;
  type: string;
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
  roi: number;
}

export interface ProfitabilityData {
  profitableProperties: PropertyProfitData[];
  revenueExpenseData: RevenueExpenseChartData[];
  revenueSources: RevenueSourceData[];
  propertyTypes: PropertyTypeData[];
  optimizationRecommendations: Recommendation[];
  activeView: ChartViewType;
  setActiveView: (view: ChartViewType) => void;
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
  id: number | string;
  property: string;
  action: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
  estimatedBenefit: number;
}

export interface ProfitabilityHeaderProps {
  activeView: ChartViewType;
  setActiveView: (view: ChartViewType) => void;
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

export interface PropertyDistributionPieProps {
  data: PropertyTypeData[];
}
