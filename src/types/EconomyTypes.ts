
export interface Transaction {
  id: string;
  date: Date | string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
}

export interface EconomyStats {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  annualTaxes: number;
  inflation: number;
}

export interface PaymentRecipient {
  id: string;
  name: string;
  type: 'individual' | 'business' | 'government' | 'other';
}

export interface ResourceItem {
  id: string;
  name: string;
  quantity: number;
  value: number;
  location: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface PropertyFinance {
  id: string;
  propertyId: string;
  revenue: number;
  expenses: number;
  profitability: number;
  lastUpdated: Date | string;
}
