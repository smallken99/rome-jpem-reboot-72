
export interface TreasuryStatus {
  balance: number;
  income: number;
  expenses: number;
  surplus: number;
  taxRate?: number;
  previous?: number;
  change?: number;
  changePercent?: number;
  totalIncome?: number;
  totalExpenses?: number;
  debt?: number;
}

export interface EconomicFactors {
  tradeRevenue: number;
  provinceRevenue: number;
  militaryExpense: number;
  religiousCeremonyExpense: number;
  publicWorksExpense: number;
  adminExpense: number;
  warSpoilsRevenue: number;
  currentYear?: number;
  taxCollection?: number;
  militaryExpenses?: number;
}

export interface EconomieStatsProps {
  treasury: TreasuryStatus;
  economicFactors: EconomicFactors;
}

export type RecurringInterval = 'weekly' | 'monthly' | 'seasonal' | 'yearly';

export interface EconomieRecord {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date | { year: number; season: string };
  source?: string;
  approved?: boolean;
  recurring?: boolean;
  recurringInterval?: RecurringInterval;
  tags?: string[];
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

export interface EconomieCreationData {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date | { year: number; season: string };
  source?: string;
  approved?: boolean;
  recurring?: boolean;
  recurringInterval?: RecurringInterval;
  tags?: string[];
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

export interface EconomieFilter {
  types?: string[];
  category?: string;
  dateRange?: [string, string] | { start: string; end: string };
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
  tags?: string[];
  affectedEntity?: string;
  approved?: boolean;
  recurring?: boolean;
}

export type EconomieSort = keyof EconomieRecord | {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
};

export interface EconomieSource {
  id: string;
  name: string;
  type: string;
  description?: string;
}
