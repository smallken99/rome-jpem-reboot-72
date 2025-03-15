
export interface RevenueExpenseData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface RevenueExpenseChartProps {
  data: RevenueExpenseData[];
  activeView: 'monthly' | 'quarterly' | 'yearly';
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
