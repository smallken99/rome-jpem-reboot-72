
import { GameDate } from './common';

export interface EconomieRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: GameDate | string;
  type: string;
  source?: string;
  approved?: boolean;
  tags?: string[];
  impactFactors?: Record<string, number>;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  isRecurring?: boolean;
  recurringInterval?: number;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

export interface EconomieCreationData {
  amount: number;
  category: string;
  description: string;
  date: GameDate | string;
  type: string;
  source?: string;
  approved?: boolean;
  tags?: string[];
  impactFactors?: Record<string, number>;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  isRecurring?: boolean;
  recurringInterval?: number;
}

export interface EconomieFilter {
  searchTerm: string;
  categories?: string[];
  type: string;
  affectedEntity?: string;
  minAmount?: number;
  maxAmount?: number;
  dateRange?: {
    start?: GameDate;
    end?: GameDate;
  };
}

export interface EconomieSort {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
}

export interface TreasuryStatus {
  balance: number;
  previousBalance?: number;
  reserves?: number;
  debt?: number;
  yearlyIncome?: number;
  yearlyExpenses?: number;
  lastUpdated?: string;
}

export interface EconomicFactors {
  inflationRate: number;
  growthRate: number;
  taxRates?: {
    average: number;
    patrician: number;
    plebeian: number;
    province: number;
  };
  currentYear?: number;
  tradeRevenue: number;
  taxCollection: number;
  militaryExpense: number;
  provinceRevenue: number;
  religiousCeremonyExpense: number;
  publicWorksExpense: number;
  warSpoilsRevenue: number;
  adminExpense: number;
}
