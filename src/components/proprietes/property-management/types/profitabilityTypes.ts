
// Types for profitability data
export interface RevenueData {
  name: string;
  value: number;
  color?: string;
}

export interface PropertyProfitData {
  id: number;
  name: string;
  type: string;
  revenue: number;
  expenses: number;
  profit: number;
  roi: number;
}

export interface OptimizationRecommendation {
  id: number;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  estimatedSavings?: number;
  estimatedRevenue?: number;
}
