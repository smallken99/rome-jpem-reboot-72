
import { GameDate } from './common';

export type EconomieType = 'income' | 'expense';
export type EconomieCategory = 'Impôts' | 'Armée' | 'Construction' | 'Administration' | 'Religion' | 'Commerce' | 'Agriculture' | 'Autre';
export type RecurringInterval = 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'yearly';

export interface EconomieRecord {
  id: string;
  date: GameDate | string;
  source: string;
  category: EconomieCategory;
  amount: number;
  description: string;
  type: EconomieType;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  isRecurring: boolean;
  recurringInterval?: RecurringInterval;
  tags: string[];
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EconomieCreationData {
  date: GameDate | string;
  source: string;
  category: EconomieCategory;
  amount: number;
  description: string;
  type: EconomieType;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  isRecurring?: boolean;
  recurringInterval?: RecurringInterval;
  tags?: string[];
  approved?: boolean;
}

export interface EconomieFilter {
  searchTerm?: string;
  type?: 'all' | EconomieType;
  categories?: ('all' | EconomieCategory)[];
  minAmount?: number;
  maxAmount?: number;
  affectedEntity?: string;
  dateRange?: {
    start?: GameDate;
    end?: GameDate;
  };
}

export interface EconomieSort {
  field: 'date' | 'amount' | 'category' | 'source' | 'description' | keyof EconomieRecord;
  direction: 'asc' | 'desc';
}

export interface TreasuryStatus {
  id: string;
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  surplus: number;
  projectedBalance: number;
  lastUpdated: GameDate;
  inflationRate: number;
  taxRate: number;
  comments?: string;
}

export interface EconomicFactors {
  tradeStability: number;
  militaryExpense: number;
  publicWorksExpense: number;
  religiousCeremonyExpense: number;
  adminExpense: number;
  taxCollection: number;
  provinceRevenue: number;
  tradeRevenue: number;
  warSpoilsRevenue: number;
  loanInterestRate: number;
}
