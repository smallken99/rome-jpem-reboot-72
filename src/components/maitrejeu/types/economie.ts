
import { GameDate } from './common';

export interface EconomieRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  source: string;
  approved: boolean;
  tags: string[];
  type: string;
  recurring: boolean;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EconomieCreationData {
  amount: number;
  category: string;
  description: string;
  date: string;
  source?: string;
  approved?: boolean;
  tags?: string[];
  type: string;
  recurring?: boolean;
  recurringInterval?: string;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
}

export interface EconomieFilter {
  category?: string;
  source?: string;
  startDate?: string;
  endDate?: string;
  type?: 'income' | 'all' | 'expense';
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
  categories?: string[]; // Add for backward compatibility
  affectedEntity?: string; // Add for backward compatibility
  dateRange?: [string, string]; // Add for backward compatibility
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
  taxRate: number;
  totalIncome?: number;
  totalExpenses?: number;
  debt?: number;
}

export interface EconomicFactors {
  taxCollection?: number;
  tradeRevenue?: number;
  militaryExpenses?: number;
  militaryExpense?: number; // For backward compatibility
  provinceRevenue?: number;
  religiousCeremonyExpense?: number;
  publicWorksExpense?: number;
  warSpoilsRevenue?: number;
  adminExpense?: number;
  currentYear?: number;
  // Default values
  administrativeEfficiency?: number;
  taxComplianceRate?: number;
  marketStability?: number;
  inflationRate?: number;
}

export interface EconomieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EconomieCreationData) => void;
  record?: EconomieRecord;
}

export enum EconomieType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer',
  LOAN = 'loan',
  INVESTMENT = 'investment',
  TAX = 'tax',
  TRIBUTE = 'tribute',
  OTHER = 'other'
}

export enum EconomieCategory {
  MILITARY = 'military',
  ADMINISTRATION = 'administration',
  INFRASTRUCTURE = 'infrastructure',
  RELIGION = 'religion',
  TRADE = 'trade',
  DIPLOMACY = 'diplomacy',
  ENTERTAINMENT = 'entertainment',
  OTHER = 'other'
}

export enum EconomieSource {
  TREASURY = 'treasury',
  PROVINCE = 'province',
  PRIVATE = 'private',
  FOREIGN = 'foreign',
  OTHER = 'other'
}

export interface EconomieStatsProps {
  treasury: TreasuryStatus;
  factors: EconomicFactors;
}
