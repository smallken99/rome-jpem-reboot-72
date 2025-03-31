
import { GameDate } from './common';

// Types for economy records
export interface EconomieRecord {
  id: string;
  amount: number;
  date: GameDate | string;
  type: 'income' | 'expense' | 'tax' | 'tribute' | 'gift' | 'other';
  category: string;
  description: string;
  source?: string;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  affectedEntityName?: string;
  approved: boolean;
  approvedBy?: string;
  approvedDate?: string;
  recurring?: boolean;
  recurringPeriod?: 'monthly' | 'quarterly' | 'yearly';
  nextRecurrenceDate?: string;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
}

// Type for creating new economy records
export interface EconomieCreationData {
  amount: number;
  date: GameDate | string;
  type: 'income' | 'expense' | 'tax' | 'tribute' | 'gift' | 'other';
  category: string;
  description: string;
  source?: string;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  affectedEntityName?: string;
  approved?: boolean;
  approvedBy?: string;
  approvedDate?: string;
  recurring?: boolean;
  recurringPeriod?: 'monthly' | 'quarterly' | 'yearly';
  nextRecurrenceDate?: string;
  tags?: string[];
}

// Filters for economy records
export interface EconomieFilter {
  searchTerm: string;
  categories?: string[];
  type: 'all' | 'income' | 'expense' | 'tax' | 'tribute' | 'gift' | 'other';
  affectedEntity?: 'all' | 'senateur' | 'province' | 'other';
  minAmount?: number;
  maxAmount?: number;
  dateRange?: {
    start?: GameDate;
    end?: GameDate;
  };
}

// Sorting for economy records
export interface EconomieSort {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
}

// Type for treasury status
export interface TreasuryStatus {
  balance: number;
  income: number;
  expenses: number;
  surplus: number;
  lastUpdated: string;
  previousBalance?: number;
  taxRate?: number;
  projectedBalance?: number;
  crisisThreshold?: number;
  warFund?: number;
  reserveRatio?: number;
  debtLevel?: number;
  creditRating?: 'excellent' | 'good' | 'fair' | 'poor' | 'terrible';
}

// Type for economic factors influencing the Republic
export interface EconomicFactors {
  taxRatePleb: number;
  taxRatePatrician: number;
  taxRateProvincial: number;
  tradeEfficiency: number;
  agricultureOutput: number;
  inflation: number;
  corruption: number;
  publicWorks: number;
  militaryExpenses: number;
  generalProsperity: number;
}
