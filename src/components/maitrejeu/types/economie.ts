
// Treasury status definition
export interface TreasuryStatus {
  balance: number;
  income: number;
  expenses: number;
  totalIncome: number;
  totalExpenses: number;
  surplus?: number;
  debt?: number;
  taxRate?: number;
}

// Economic factors definition
export interface EconomicFactors {
  taxCollection: number;
  tradeEfficiency: number;
  militaryExpenses: number;
  militaryExpense?: number; // Alias for compatibility
  corruption: number;
  inflation?: number;
  productivity?: number;
}

// Props for the EconomieStats component
export interface EconomieStatsProps {
  treasury: TreasuryStatus;
  economicFactors: EconomicFactors;
}

// Basic economy record
export interface EconomieRecord {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date | { year: number; season: string };
  source?: string;
  approved: boolean;
  recurring?: boolean;
  recurringInterval?: 'weekly' | 'monthly' | 'seasonal' | 'yearly';
  tags?: string[];
  impact?: Record<string, number>;
}

// Data for creating a new economy record
export interface EconomieCreationData {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date | { year: number; season: string };
  source?: string;
  approved?: boolean;
  recurring?: boolean;
  recurringInterval?: 'weekly' | 'monthly' | 'seasonal' | 'yearly';
  tags?: string[];
}

// Filters for economy records
export interface EconomieFilter {
  type: 'all' | 'income' | 'expense' | string;
  category: string | null;
  dateRange?: [string, string] | { start: string; end: string };
  searchTerm: string;
  amount?: [number, number];
  affectedEntity?: string;
  approved?: boolean;
}

// Sort field for economy records
export interface EconomieSort {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
}

// Economy type enum
export enum EconomieType {
  ALL = 'all',
  INCOME = 'income',
  EXPENSE = 'expense',
}
