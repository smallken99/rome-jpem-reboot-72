
import { GameDate } from './common';

// Types de base pour l'économie
export type ECONOMIE_TYPES = 'income' | 'expense' | 'transfer' | 'loan' | 'investment' | 'tax' | 'trade' | 'military' | 'construction' | 'slaves' | 'other';
export type ECONOMIE_CATEGORIES = 'military' | 'administration' | 'construction' | 'religion' | 'slaves' | 'entertainment' | 'tax' | 'trade' | 'diplomacy' | 'other';
export type ECONOMIE_SOURCE = 'treasury' | 'province' | 'private' | 'foreign' | 'other';

// Type EconomieFilter pour le filtrage
export interface EconomieFilter {
  searchTerm?: string;
  category?: ECONOMIE_CATEGORIES | 'all';
  types?: ECONOMIE_TYPES | 'all';
  affectedEntity?: 'all' | 'senateur' | 'province';
  minAmount?: number;
  maxAmount?: number;
  dateRange?: {
    start: GameDate;
    end: GameDate;
  };
}

// Type pour le tri des données économiques
export interface EconomieSort {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
}

// Type pour un enregistrement économique
export interface EconomieRecord {
  id: string;
  amount: number;
  category: ECONOMIE_CATEGORIES;
  description: string;
  type: ECONOMIE_TYPES;
  source: ECONOMIE_SOURCE;
  tags: string[];
  approved: boolean;
  date: GameDate | Date;
  recurring: boolean;
  recurringInterval?: 'monthly' | 'quarterly' | 'biannually' | 'annually' | 'special';
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

// Type pour la création d'un enregistrement économique
export interface EconomieCreationData {
  amount: number;
  category: ECONOMIE_CATEGORIES;
  description: string;
  type: ECONOMIE_TYPES;
  source: ECONOMIE_SOURCE;
  tags: string[];
  approved: boolean;
  date: string | GameDate | Date;
  recurring: boolean;
  recurringInterval?: 'monthly' | 'quarterly' | 'biannually' | 'annually' | 'special';
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

// Type pour le statut du trésor
export interface TreasuryStatus {
  balance: number;
  income: number;
  expenses: number;
  debt: number;
  totalIncome?: number;
  totalExpenses?: number;
  previousBalance?: number;
}

// Type pour les facteurs économiques
export interface EconomicFactors {
  taxCollection: number;
  militaryExpense: number;
  militaryExpenses?: number; // Alias pour compatibilité
  tradeProfitability: number;
  constructionCosts: number;
  slavePrices: number;
  inflationRate?: number;
  growthRate?: number;
  taxRates?: Record<string, number>;
}

// Props pour le composant EconomieStats
export interface EconomieStatsProps {
  treasury: TreasuryStatus;
  economicFactors: EconomicFactors;
  economieRecords?: EconomieRecord[];
}
