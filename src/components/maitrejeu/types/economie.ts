
import { GameDate } from './common';

export interface EconomieRecord {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: Date | GameDate;
  source?: string;
  approved?: boolean;
  recurring?: boolean;
  recurringInterval?: string;
  tags?: string[];
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

export interface TreasuryStatus {
  balance: number;
  income: number;
  expenses: number;
  surplus: number;
  previousBalance?: number;
  taxRate?: number;
}

export interface EconomicFactors {
  tradeRevenue: number;
  provinceRevenue: number;
  militaryExpense: number;
  religiousCeremonyExpense: number;
  publicWorksExpense: number;
  adminExpense: number;
  warSpoilsRevenue: number;
  inflationRate?: number;
  growthRate?: number;
  taxRates?: Record<string, number>;
  taxCollection?: number;
  currentYear?: number;
}

export interface EconomieCreationData {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: Date | GameDate;
  source?: string;
  approved?: boolean;
  recurring?: boolean;
  recurringInterval?: string;
  tags?: string[];
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

// Define the structure of the filter
export interface EconomieFilter {
  types?: ('income' | 'expense')[];
  category?: string;
  dateRange?: [string, string] | { start: string; end: string };
  searchTerm?: string;
  showRecurring?: boolean;
  showApproved?: boolean;
  minAmount?: number;
  maxAmount?: number;
  affectedEntity?: string;
}

// Define sorting options
export interface EconomicSortOption {
  field: 'date' | 'amount' | 'type' | 'category' | 'id';
  direction: 'asc' | 'desc';
}

export type EconomieSort = string | EconomicSortOption;

// Constants for economie types and categories
export const ECONOMIE_TYPES = ['income', 'expense', 'revenue', 'cost', 'tax'];
export const ECONOMIE_CATEGORIES = [
  'trade', 
  'tax', 
  'military', 
  'construction', 
  'maintenance', 
  'administration', 
  'religion', 
  'games', 
  'subsidy', 
  'tribute',
  'other'
];

export interface EconomieStatsProps {
  economieRecords: EconomieRecord[];
  treasury: TreasuryStatus;
  economicFactors: EconomicFactors;
}
