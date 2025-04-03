
import { GameDate } from './common';

export enum ECONOMIE_TYPES {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer',
  LOAN = 'loan',
  INVESTMENT = 'investment',
  TAX = 'tax'
}

export enum ECONOMIE_CATEGORIES {
  MILITARY = 'military',
  ADMINISTRATIVE = 'administration',
  CONSTRUCTION = 'construction',
  RELIGION = 'religion',
  TRADE = 'trade',
  DIPLOMACY = 'diplomacy',
  ENTERTAINMENT = 'entertainment',
  OTHER = 'other',
  TAX = 'tax',
  TRIBUTE = 'tribute',
  SPOILS = 'spoils',
  DONATION = 'donation',
  PENALTY = 'penalty',
  SALARY = 'salary',
  MAINTENANCE = 'maintenance',
  CEREMONY = 'ceremony',
  income = 'income',
  all = 'all'
}

export enum ECONOMIE_SOURCE {
  TREASURY = 'treasury',
  PROVINCE = 'province',
  PRIVATE = 'private',
  FOREIGN = 'foreign',
  OTHER = 'other',
  TAX_COLLECTION = 'Collecte fiscale'
}

export type RecurringInterval = 'monthly' | 'quarterly' | 'biannually' | 'annually' | 'special';

export interface EconomieCreationData {
  amount: number;
  description: string;
  date: string | GameDate | Date;
  type: ECONOMIE_TYPES | string;
  category: ECONOMIE_CATEGORIES | string;
  source: ECONOMIE_SOURCE | string;
  tags?: string[];
  recurring?: boolean;
  recurringInterval?: RecurringInterval | string;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  approved?: boolean;
}

export interface EconomieRecord extends EconomieCreationData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface EconomieFilter {
  types?: ECONOMIE_TYPES | string;
  category?: ECONOMIE_CATEGORIES | string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: Date | string | GameDate;
  endDate?: Date | string | GameDate;
  source?: ECONOMIE_SOURCE | string;
  showRecurring?: boolean;
  showApproved?: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface EconomieSort {
  field: keyof EconomieRecord;
  direction: SortDirection;
}

export interface TreasuryStatus {
  balance: number;
  income: number;
  expenses: number;
  surplus: number;
  previousBalance?: number;
  taxRate?: number;
  totalIncome?: number;
  lastUpdated?: string | Date;
}

export interface EconomicFactors {
  tradeRevenue: number;
  provinceRevenue: number;
  militaryExpense: number;
  religiousCeremonyExpense: number;
  publicWorksExpense: number;
  adminExpense: number;
  warSpoilsRevenue: number;
}

export interface Economie {
  stabilite: number;
  croissance: number;
  commerce: number;
  agriculture: number;
  value?: number;
  production?: number;
}
