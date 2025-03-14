
import { GameDate } from './common';

export interface EconomieRecord {
  id: string;
  source: string;
  category: string;
  amount: number;
  description: string;
  date: string | GameDate;
  type: 'income' | 'expense' | 'transfer' | 'tax';
  isRecurring: boolean;
  recurringInterval?: string;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  tags?: string[];
  approvedBy?: string;
  notes?: string;
  createdAt?: string | Date;
  approved?: boolean;
  impactFactors?: Record<string, number>;
}

export interface EconomieCreationData {
  source: string;
  category: string;
  amount: number;
  description: string;
  date: string | GameDate;
  type: 'income' | 'expense' | 'transfer' | 'tax';
  isRecurring: boolean;
  recurringInterval?: string;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  tags?: string[];
  approvedBy?: string;
  notes?: string;
  approved?: boolean;
  impactFactors?: Record<string, number>;
}

export interface EconomieFilter {
  type?: 'income' | 'expense' | 'transfer' | 'tax' | string;
  dateRange?: [Date, Date] | null;
  category?: string;
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  tags?: string[];
}

export interface EconomieSort {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
}

export interface TreasuryStatus {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  surplus: number;
  projectedBalance: number;
  lastUpdated: string | Date;
  inflationRate?: number;
  taxCollectionRate?: number;
  reserves?: number;
  debt?: number;
}

export interface EconomicFactors {
  id?: string;
  taxCollection?: number;
  tradeRevenue?: number;
  militaryExpense?: number;
  provinceRevenue?: number;
  religiousCeremonyExpense?: number;
  publicWorksExpense?: number;
  warSpoilsRevenue?: number;
  adminExpense?: number;
  currentYear?: number;
  tradeStability?: number;
}
