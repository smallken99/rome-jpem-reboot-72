
import { GameDate } from './common';

export enum ECONOMIE_TYPES {
  INCOME = 'income',
  EXPENSE = 'expense',
  TAX = 'tax',
  TRADE = 'trade',
  MILITARY = 'military',
  CONSTRUCTION = 'construction',
  SLAVES = 'slaves',
  OTHER = 'other',
  COMMERCE = 'commerce'
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
  MAINTENANCE = 'maintenance',
  IMPOTS = 'Impôts',
  COMMERCE = 'Commerce',
  // Ajout pour la compatibilité
  TAXES = "taxes",
  TRIBUTE = "tribute",
  RELIGIOUS = "religious", 
  ADMINISTRATIVE = "administrative",
  AGRICULTURE = "agriculture",
  ARTISANAT = "artisanat",
  FORUM = "forum",
  administration = "administration",
  income = "income",
  all = "all"
}

export enum ECONOMIE_SOURCE {
  TREASURY = 'treasury',
  GOVERNMENT = 'Gouvernement',
  SENATE = 'senate',
  PROVINCES = 'provinces',
  PRIVATE = 'private',
  MANUAL_ENTRY = 'manual_entry',
  TAX_COLLECTION = 'Collecte fiscale',
  FOREIGN = "foreign",
  CITIZEN = "citizen",
  MANUAL = "manual_entry",
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
  // Champs supplémentaires pour résoudre les erreurs
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
  isRecurring?: boolean; // Pour la compatibilité
  approved?: boolean; // Pour la compatibilité
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
  // Pour compatibilité avec le code existant
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
