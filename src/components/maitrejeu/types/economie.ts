
import { GameDate } from './common';

// Shared enums for economy system
export enum ECONOMIE_TYPES {
  INCOME = "income",
  EXPENSE = "expense",
  TAX = "tax",
  COMMERCE = "commerce",
  MILITARY = "military",
  CONSTRUCTION = "construction"
}

export enum ECONOMIE_CATEGORIES {
  TAXES = "taxes",
  TRIBUTE = "tribute",
  COMMERCE = "commerce",
  CONSTRUCTION = "construction",
  MILITARY = "military",
  ADMINISTRATIVE = "administrative",
  RELIGIOUS = "religious",
  OTHER = "other"
}

export enum ECONOMIE_SOURCE {
  SENATE = "senate",
  PROVINCE = "province",
  CITIZEN = "citizen",
  FOREIGN = "foreign",
  GOVERNMENT = "government",
  MANUAL = "manual_entry",
  COLLECTE_FISCALE = "Collecte fiscale"
}

export const RECURRING_INTERVALS = [
  "monthly",
  "quarterly",
  "biannually", 
  "annually",
  "special",
  "seasonal"
] as const;

export type RecurringInterval = typeof RECURRING_INTERVALS[number];

export interface EconomieRecord {
  id: string;
  amount: number;
  description: string;
  date: GameDate | Date;
  category: ECONOMIE_CATEGORIES;
  type: ECONOMIE_TYPES;
  source: ECONOMIE_SOURCE;
  recurring: boolean;
  recurringInterval?: RecurringInterval;
  approvedBy?: string;
  affectedSenateurId?: string; 
  affectedProvinceId?: string;
  updatedAt?: string;
}

export interface EconomieCreationData {
  amount: number;
  description: string;
  date: GameDate | Date;
  category: ECONOMIE_CATEGORIES;
  type: ECONOMIE_TYPES; 
  source: ECONOMIE_SOURCE;
  recurring: boolean;
  recurringInterval?: RecurringInterval;
  approvedBy?: string;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

export interface EconomieFilter {
  searchTerm: string;
  types?: ECONOMIE_TYPES[];
  category?: ECONOMIE_CATEGORIES[];
  minAmount?: number;
  maxAmount?: number;
  dateRange?: {
    start: GameDate;
    end: GameDate;
  };
  approved?: boolean;
  recurring?: boolean;
  affectedEntity?: 'all' | 'senateur' | 'province';
  showRecurring?: boolean;
  showApproved?: boolean;
}

export type EconomieSort = {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
} | string;

export interface TreasuryStatus {
  balance: number;
  income: number;
  expenses: number;
  surplus?: number;
  debt?: number;
  taxRate?: number;
  totalIncome?: number;
  totalExpenses?: number;
}

export interface EconomicFactors {
  taxRate: number;
  militarySpending: number;
  publicWorks: number;
  commerce: number;
  stability: number;
  inflation: number;
  growth: number;
  tradeRevenue?: number;
  provinceRevenue?: number;
  religiousCeremonyExpense?: number;
  publicWorksExpense?: number;
  warSpoilsRevenue?: number;
  adminExpense?: number;
  militaryExpense?: number;
  currentYear?: number;
}
