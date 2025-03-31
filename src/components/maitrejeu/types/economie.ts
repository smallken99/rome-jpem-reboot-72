
// Treasury status definition
export interface TreasuryStatus {
  balance: number;
  income: number;
  expenses: number;
  totalIncome?: number;
  totalExpenses?: number;
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
  
  // Additional factors needed by components
  tradeRevenue?: number;
  provinceRevenue?: number;
  religiousCeremonyExpense?: number;
  publicWorksExpense?: number;
  warSpoilsRevenue?: number;
  adminExpense?: number;
  currentYear?: number;
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
  
  // Additional fields used in components
  affectedSenateurId?: string;
  affectedProvinceId?: string;
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
  
  // Additional fields used in components
  affectedSenateurId?: string;
  affectedProvinceId?: string;
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
  
  // Additional fields used in components
  minAmount?: number;
  maxAmount?: number;
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

// Economy categories enum
export enum EconomieCategory {
  TAX = 'tax',
  TRADE = 'trade',
  MILITARY = 'military',
  ADMINISTRATION = 'administration',
  CONSTRUCTION = 'construction',
  RELIGION = 'religion',
  OTHER = 'other'
}

// Economy source enum
export enum EconomieSource {
  SENATE = 'senate',
  PROVINCE = 'province',
  PERSONAL = 'personal',
  OTHER = 'other'
}
