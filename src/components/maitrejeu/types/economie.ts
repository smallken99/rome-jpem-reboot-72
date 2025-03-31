
import { GameDate } from './common';

export type EconomieType = 'income' | 'expense' | 'all';
export type EconomieSort = 'date' | 'amount' | 'category' | 'type';
export type EconomieCategory = 
  | 'tax' 
  | 'tribute' 
  | 'trade' 
  | 'agriculture' 
  | 'military' 
  | 'administration' 
  | 'public_works' 
  | 'ceremonies' 
  | 'other'
  | string;

export type RecurringInterval = 'weekly' | 'monthly' | 'seasonal' | 'yearly';

export interface EconomieCreationData {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date | GameDate;
  source?: string;
  approved?: boolean;
  recurring?: boolean;
  recurringInterval?: RecurringInterval;
  tags?: string[];
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

export interface EconomieRecord extends EconomieCreationData {
  id: string;
  createdAt?: Date;
}

export interface EconomieStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  byCategory: Record<string, {
    income: number;
    expenses: number;
    balance: number;
  }>;
  treasury: {
    current: number;
    previous: number;
    change: number;
    changePercent: number;
  };
  economicFactors: {
    tradeRevenue: number;
    provinceRevenue: number;
    militaryExpense: number;
    religiousCeremonyExpense: number;
    publicWorksExpense: number;
    adminExpense: number;
    warSpoilsRevenue: number;
  };
}

export interface EconomieFilter {
  type?: EconomieType;
  category?: string | string[];
  amount?: number;
  minAmount?: number;
  maxAmount?: number;
  source?: string;
  dateRange?: [string, string] | { start: string; end: string };
  tags?: string[];
  affectedSenateur?: string;
  affectedProvince?: string;
  recurring?: boolean;
  approved?: boolean;
}

export interface EconomieStatsProps {
  treasury: {
    balance: number;
    income: number;
    expenses: number;
    surplus: number;
    taxRate?: number;
    previous?: number;
    change?: number;
    changePercent?: number;
  };
  economicFactors?: {
    tradeRevenue: number;
    provinceRevenue: number;
    militaryExpense: number;
    religiousCeremonyExpense: number;
    publicWorksExpense: number;
    adminExpense: number;
    warSpoilsRevenue: number;
    currentYear?: number;
  };
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
}
