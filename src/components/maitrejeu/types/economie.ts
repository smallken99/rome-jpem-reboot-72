
import { GameDate } from './common';

export interface EconomieRecord {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer' | 'tax';
  source: 'treasury' | 'province' | 'trade' | 'tax' | string;
  date: string | GameDate;
  category?: string;
  responsable?: string;
  notes?: string;
  isRecurring?: boolean;
  recurringInterval?: string;
  tags?: string[];
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  approved?: boolean;
  createdAt?: string;
  impactFactors?: Record<string, number>;
}

export interface EconomieSort {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
}

export interface EconomieFilter {
  type?: 'income' | 'expense' | 'transfer' | 'tax' | 'all';
  source?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
  search?: string;
  affectedEntity?: string;
  categories?: string[];
  dateRange?: [Date | null, Date | null];
}

export interface EconomieStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  byCategory: {
    [key: string]: number;
  };
  byMonth: {
    month: string;
    income: number;
    expenses: number;
  }[];
}

export interface EconomieCreationData {
  description: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer' | 'tax';
  source: string;
  date: string | GameDate;
  category?: string;
  responsable?: string;
  notes?: string;
  isRecurring?: boolean;
  recurringInterval?: string;
  tags?: string[];
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  approved?: boolean;
  impactFactors?: Record<string, number>;
}

export interface TreasuryStatus {
  balance: number;
  lastUpdated: string;
  projectedIncome: number;
  projectedExpenses: number;
  fiscalYear: string;
  inflationRate?: number;
}

export interface EconomicFactors {
  inflation: number;
  taxRate: number;
  economicGrowth: number;
  publicConfidence: number;
  taxCollection?: number;
  tradeRevenue?: number;
  militaryExpense?: number;
  provinceRevenue?: number;
  religiousCeremonyExpense?: number;
  publicWorksExpense?: number;
  warSpoilsRevenue?: number;
  adminExpense?: number;
  currentYear?: number;
  id?: string;
}

export const ECONOMIE_CATEGORIES = [
  'Administration',
  'Armée',
  'Commerce',
  'Construction',
  'Divertissement',
  'Éducation',
  'Impôts',
  'Justice',
  'Religion',
  'Santé',
  'Subventions',
  'Transport',
  'Divers'
];

export const SOURCE_TYPES = [
  'Trésor public',
  'Province',
  'Commerce',
  'Taxes',
  'Militaire',
  'Offrandes',
  'Étranger',
  'Prêts',
  'Autre'
];
