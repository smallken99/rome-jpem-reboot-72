
import { GameDate } from './common';

export enum ECONOMIE_TYPES {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TAX = 'TAX',
  TRADE = 'TRADE',
  MILITARY = 'MILITARY',
  CONSTRUCTION = 'CONSTRUCTION',
  SLAVES = 'SLAVES',
  OTHER = 'OTHER',
  COMMERCE = 'COMMERCE'
}

export enum ECONOMIE_CATEGORIES {
  MILITARY = 'MILITARY',
  ADMINISTRATIVE = 'ADMINISTRATIVE',
  CONSTRUCTION = 'CONSTRUCTION',
  RELIGION = 'RELIGION',
  SLAVES = 'SLAVES',
  ENTERTAINMENT = 'ENTERTAINMENT',
  TAX = 'TAX',
  TRADE = 'TRADE',
  DIPLOMACY = 'DIPLOMACY',
  OTHER = 'OTHER',
  MAINTENANCE = 'MAINTENANCE',
  IMPOTS = 'IMPOTS',
  COMMERCE = 'COMMERCE',
  // Additional categories for compatibility
  TAXES = "TAXES",
  TRIBUTE = "TRIBUTE",
  RELIGIOUS = "RELIGIOUS", 
  AGRICULTURE = "AGRICULTURE",
  ARTISANAT = "ARTISANAT",
  FORUM = "FORUM",
  administration = "administration",
  income = "income",
  all = "all"
}

export enum ECONOMIE_SOURCE {
  TREASURY = 'TREASURY',
  GOVERNMENT = 'GOVERNMENT',
  SENATE = 'SENATE',
  PROVINCES = 'PROVINCES',
  PRIVATE = 'PRIVATE',
  MANUAL_ENTRY = 'MANUAL_ENTRY',
  TAX_COLLECTION = 'TAX_COLLECTION',
  FOREIGN = "FOREIGN",
  CITIZEN = "CITIZEN",
  MANUAL = "MANUAL_ENTRY",
  treasury = "treasury"
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
  affectedSenateurId?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  approved?: boolean;
  isRecurring?: boolean;
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
  affectedSenateurId?: string;
  tags?: string[];
  isRecurring?: boolean;
  approved?: boolean;
}

export interface EconomieFilter {
  types?: ECONOMIE_TYPES | 'all';
  category?: ECONOMIE_CATEGORIES[] | ECONOMIE_CATEGORIES | 'all';
  minAmount?: number;
  maxAmount?: number;
  startDate?: string | GameDate;
  endDate?: string | GameDate;
  searchTerm?: string;
  source?: ECONOMIE_SOURCE;
  affectedEntity?: string;
  dateRange?: {
    start?: GameDate;
    end?: GameDate;
  };
  showRecurring?: boolean;
  showApproved?: boolean;
  type?: ECONOMIE_TYPES | 'all';
  categories?: ECONOMIE_CATEGORIES[] | ECONOMIE_CATEGORIES | 'all';
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
  taxRate?: number;
  inflation?: number;
  inflationRate?: number;
  militarySpending?: number;
  publicWorks?: number;
  commerce?: number;
  agriculture?: number;
  taxCollection?: number;
  growthRate?: number;
  taxRates?: Record<string, number>;
  currentYear?: number;
}

export interface EconomieStatsProps {
  treasury: TreasuryStatus;
  economicFactors: EconomicFactors;
  economieRecords: EconomieRecord[];
}

export interface Economie {
  value: number;
  stabilite: number;
  croissance: number;
  commerce: number;
  agriculture: number;
  production: number;
}
