
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';

export type ChartViewType = 'monthly' | 'quarterly' | 'yearly' | 'annual';

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
}

export interface RevenueSourceData {
  name: string;
  value: number;
  percent: number;
}

export interface PropertyTypeData {
  name: string;
  count: number;
  revenue: number;
  percent: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  propertyId?: string | number;
  propertyName?: string;
  potentialIncrease?: number;
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
}

export interface PropertyDistributionPieProps {
  data: PropertyTypeData[];
}

export interface RevenueSourcesChartProps {
  data: RevenueSourceData[];
}

export interface ProfitablePropertiesTableProps {
  properties: PropertyProfitData[];
  sortBy?: string;
  onSortChange?: (sortBy: string) => void;
}

export interface OptimizationRecommendationsProps {
  recommendations: Recommendation[];
  onSelectProperty?: (propertyId: string | number) => void;
}
