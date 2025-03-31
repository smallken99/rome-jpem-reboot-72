
import { GameDate } from './common';

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

export type RecurringInterval = 'once' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | string;

export interface EconomieRecord {
  id: string;
  date: GameDate | Date;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  category: string;
  recurring?: boolean;
  recurringInterval?: RecurringInterval;
  source?: string;
  approved?: boolean;
  tags?: string[];
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

export interface EconomieCreationData {
  date: GameDate | Date;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  category: string;
  recurring?: boolean;
  recurringInterval?: RecurringInterval;
  source?: string;
  approved?: boolean;
  tags?: string[];
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

export interface EconomieFilter {
  dateRange?: [string, string] | { start: string; end: string };
  types?: string[];
  type?: string;
  category?: string;
  categories?: string[];
  amountRange?: [number, number];
  sources?: string[];
  approved?: boolean;
  recurring?: boolean;
  tags?: string[];
  search?: string;
  searchTerm?: string;
  affectedEntity?: string;
}

export type EconomieSort = string | {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
};

export interface EconomieStatsProps {
  treasury?: TreasuryStatus;
  economicFactors?: EconomicFactors;
  period?: string;
  compareWithPrevious?: boolean;
}

export const ECONOMIE_TYPES = ['income', 'expense'];

export const ECONOMIE_CATEGORIES = [
  'tax', 'tribute', 'trade', 'military', 'building',
  'public_works', 'ceremony', 'administrative', 'other'
];
