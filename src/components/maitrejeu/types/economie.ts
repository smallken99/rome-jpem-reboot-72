
export type EconomieType = 'income' | 'expense' | 'all';
export type RecurringInterval = 'weekly' | 'monthly' | 'seasonal' | 'yearly' | string;

export interface EconomieRecord {
  id: string;
  amount: number;
  date: Date | { year: number; season: string };
  description: string;
  type: 'income' | 'expense';
  category: string;
  source?: string;
  tags?: string[];
  approved?: boolean;
  recurring?: boolean;
  recurringInterval?: RecurringInterval;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

export interface EconomieCreationData {
  amount: number;
  date: Date | { year: number; season: string };
  description: string;
  type: 'income' | 'expense';
  category: string;
  source?: string;
  tags?: string[];
  approved?: boolean;
  recurring?: boolean;
  recurringInterval?: RecurringInterval;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

export interface EconomieFilter {
  type?: EconomieType;
  category?: string;
  dateRange?: [string, string] | { start: string; end: string };
  amount?: number;
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
  categories?: string[];
  affectedEntity?: string;
}

export interface EconomieSort {
  field?: keyof EconomieRecord | string;
  direction?: 'asc' | 'desc' | string;
}

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
}

// Categories for economy records
export enum EconomieCategory {
  TAX = 'tax',
  TRADE = 'trade',
  TRIBUTE = 'tribute',
  SPOILS = 'spoils',
  MILITARY = 'military',
  ADMINISTRATION = 'administration',
  CONSTRUCTION = 'construction',
  GAMES = 'games',
  RELIGION = 'religion',
  LOAN = 'loan',
  OTHER = 'other'
}

// Sources of economic transactions
export enum EconomieSource {
  SENATE = 'senate',
  CONSUL = 'consul',
  PROVINCE = 'province',
  FOREIGN = 'foreign',
  PRIVATE = 'private',
  OTHER = 'other'
}
