
import { GameDate } from './common';

export type EconomieType = 'income' | 'expense' | 'tax' | 'trade' | 'military' | 'construction' | 'slaves' | 'other';
export type EconomieCategory = 
  'Impôts' | 'Armée' | 'Construction' | 'Administration' | 'Religion' | 'Commerce' | 'Agriculture' | 'Autre' |
  'Esclaves' | 'Divertissement' | 'Diplomatie' | 'Maintenance' | 'Vente';
export type RecurringInterval = 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'yearly';
export type EconomieSource = 'tax' | 'trade' | 'war' | 'donation' | 'fine' | 'sale' | 'purchase' | 'salary' | 'rent' | 'manual_entry' | 'other'; 

export interface EconomieRecord {
  id: string;
  date: GameDate | string;
  source: string;
  category: EconomieCategory;
  amount: number;
  description: string;
  type: EconomieType;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  isRecurring: boolean;
  recurringInterval?: RecurringInterval;
  tags: string[];
  approved: boolean;
  createdAt: string;
  updatedAt: string;
  impactFactors?: Record<string, number>;
}

export interface EconomieCreationData {
  date?: GameDate | string;
  source: string;
  category: EconomieCategory;
  amount: number;
  description: string;
  type: EconomieType;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  isRecurring?: boolean;
  recurringInterval?: RecurringInterval;
  tags?: string[];
  approved?: boolean;
  impactFactors?: Record<string, number>;
}

export interface EconomieFilter {
  searchTerm?: string;
  type?: 'all' | EconomieType;
  categories?: ('all' | EconomieCategory)[];
  minAmount?: number;
  maxAmount?: number;
  affectedEntity?: string;
  dateRange?: {
    start?: GameDate;
    end?: GameDate;
  };
}

export interface EconomieSort {
  field: 'date' | 'amount' | 'category' | 'source' | 'description' | keyof EconomieRecord;
  direction: 'asc' | 'desc';
}

export interface TreasuryStatus {
  id: string;
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  surplus: number;
  projectedBalance: number;
  lastUpdated: GameDate;
  inflationRate: number;
  taxRate: number;
  comments?: string;
  previousBalance?: number;
}

export interface EconomicFactors {
  tradeStability: number;
  militaryExpense: number;
  publicWorksExpense: number;
  religiousCeremonyExpense: number;
  adminExpense: number;
  taxCollection: number;
  provinceRevenue: number;
  tradeRevenue: number;
  warSpoilsRevenue: number;
  loanInterestRate: number;
  inflationRate?: number;
  growthRate?: number;
  taxRates?: Record<string, number>;
  currentYear?: number;
}

// Interface props pour les composants
export interface EconomieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EconomieCreationData) => void;
  record?: EconomieRecord;
}

export interface EconomieStatsProps {
  treasury: TreasuryStatus;
  economicFactors: EconomicFactors;
}

export interface EconomieTableProps {
  records: EconomieRecord[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  sortConfig: EconomieSort;
  onSort: (field: keyof EconomieRecord) => void;
}
