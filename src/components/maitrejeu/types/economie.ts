
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
}

export interface TreasuryStatus {
  balance: number;
  lastUpdated: string;
  projectedIncome: number;
  projectedExpenses: number;
  fiscalYear: string;
}

export interface EconomicFactors {
  inflation: number;
  taxRate: number;
  economicGrowth: number;
  publicConfidence: number;
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
