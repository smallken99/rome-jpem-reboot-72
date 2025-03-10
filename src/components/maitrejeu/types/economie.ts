
import { GameDate } from './common';

export interface EconomieRecord {
  id: string;
  date: GameDate;
  source: string;
  category: string;
  amount: number;
  description: string;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  type: 'income' | 'expense';
  isRecurring: boolean;
  recurringInterval?: 'seasonal' | 'yearly';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TreasuryStatus {
  id: string;
  balance: number;
  lastUpdated: GameDate;
  inflationRate: number;
  taxRate: number;
  comments: string;
}

export interface EconomicFactors {
  id: string;
  tradeStability: number; // 0-100
  militaryExpense: number;
  publicWorksExpense: number;
  religiousCeremonyExpense: number;
  adminExpense: number;
  taxCollection: number;
  provinceRevenue: number;
  tradeRevenue: number;
  warSpoilsRevenue: number;
  loanInterestRate: number;
}

export interface EconomieFilter {
  search: string;
  categories: string[];
  minAmount?: number;
  maxAmount?: number;
  dateRange?: {
    start?: GameDate;
    end?: GameDate;
  };
  type?: 'income' | 'expense' | 'all';
  affectedEntity?: 'senateur' | 'province' | 'all';
}

export interface EconomieSort {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
}

export interface EconomieCreationData {
  source: string;
  category: string;
  amount: number;
  description: string;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  type: 'income' | 'expense';
  isRecurring: boolean;
  recurringInterval?: 'seasonal' | 'yearly';
  tags: string[];
}

export const ECONOMIE_CATEGORIES = [
  'Impôts',
  'Commerce',
  'Tribut provincial',
  'Butin de guerre',
  'Construction',
  'Salaires',
  'Cérémonies',
  'Armée',
  'Administration',
  'Logistique',
  'Mines',
  'Agriculture',
  'Prêts',
  'Amendes',
  'Autres'
];

export const SOURCE_TYPES = [
  'Trésor public',
  'Provinces',
  'Sénateurs',
  'Commerce extérieur',
  'Campagnes militaires',
  'Tributaires',
  'Dons',
  'Confiscations',
  'Autres'
];
