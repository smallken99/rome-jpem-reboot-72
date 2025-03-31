
import { GameDate } from './common';

export enum ECONOMIE_TYPES {
  INCOME = 'income',
  EXPENSE = 'expense',
  TAX = 'tax',
  TRADE = 'trade',
  MILITARY = 'military',
  CONSTRUCTION = 'construction',
  SLAVES = 'slaves',
  OTHER = 'other'
}

export enum ECONOMIE_CATEGORIES {
  MILITARY = 'military',
  ADMINISTRATIVE = 'administration',
  CONSTRUCTION = 'construction',
  RELIGION = 'religion',
  SLAVES = 'slaves',
  ENTERTAINMENT = 'entertainment',
  TAX = 'tax',
  TRADE = 'trade',
  DIPLOMACY = 'diplomacy',
  OTHER = 'other',
  MAINTENANCE = 'maintenance'
}

export enum ECONOMIE_SOURCE {
  TREASURY = 'treasury',
  GOVERNMENT = 'Gouvernement',
  SENATE = 'senate',
  PROVINCES = 'provinces',
  PRIVATE = 'private'
}

export type RecurringInterval = 'monthly' | 'quarterly' | 'biannually' | 'annually' | 'special' | 'seasonal';

export interface EconomieRecord {
  id: string;
  amount: number;
  description: string;
  date: GameDate | Date;
  type: ECONOMIE_TYPES;
  category: ECONOMIE_CATEGORIES;
  source: ECONOMIE_SOURCE;
  recurring: boolean;
  recurringInterval?: RecurringInterval;
  approvedBy?: string;
  affectedProvinceId?: string;
}

export interface EconomieCreationData {
  amount: number;
  description: string;
  date: GameDate | Date;
  type: ECONOMIE_TYPES;
  category: ECONOMIE_CATEGORIES;
  source: ECONOMIE_SOURCE;
  recurring: boolean;
  recurringInterval: RecurringInterval;
  approvedBy?: string;
  affectedProvinceId?: string;
}

export interface EconomieFilter {
  types?: ECONOMIE_TYPES;
  category?: ECONOMIE_CATEGORIES;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string | GameDate;
  endDate?: string | GameDate;
  searchTerm?: string;
  source?: ECONOMIE_SOURCE;
}

export interface EconomieSort {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
}

export interface TreasuryStatus {
  balance: number;
  income: number;
  expenses: number;
  surplus: number;
  previousBalance?: number;
}

export interface EconomicFactors {
  tradeRevenue: number;
  provinceRevenue: number;
  militaryExpense: number;
  religiousCeremonyExpense: number;
  publicWorksExpense: number;
  adminExpense: number;
  warSpoilsRevenue: number;
  taxRate?: number;
  inflation?: number;
  militarySpending?: number;
  publicWorks?: number;
  commerce?: number;
  agriculture?: number;
  taxCollection?: number;
  growthRate?: number;
  taxRates?: Record<string, number>;
}

export interface EconomieStatsProps {
  treasury: TreasuryStatus;
  economicFactors: EconomicFactors;
  economieRecords: EconomieRecord[];
}
