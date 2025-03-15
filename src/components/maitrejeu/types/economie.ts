
import { GameDate } from './common';

export type EconomieType = 'income' | 'expense' | 'tax' | 'trade' | 'military' | 'construction' | 'slaves' | 'other' | 'all';
export type EconomieSource = 'tax' | 'trade' | 'war' | 'donation' | 'fine' | 'sale' | 'purchase' | 'salary' | 'rent' | 'manual_entry' | 'other';
export type EconomieCategory = 'military' | 'administration' | 'construction' | 'religion' | 'slaves' | 'entertainment' | 'tax' | 'trade' | 'diplomacy' | 'other' | 'all';

export interface EconomieFilter {
  searchTerm?: string;
  type?: EconomieType;
  categories?: EconomieCategory[];
  minAmount?: number;
  maxAmount?: number;
  affectedEntity?: string;
  dateRange?: {
    start: GameDate | null;
    end: GameDate | null;
  };
}

export interface EconomieSort {
  field: 'date' | 'amount' | 'category' | 'source' | 'description';
  direction: 'asc' | 'desc';
}

export interface ImpactFactors {
  economy?: number;
  stability?: number;
  military?: number;
  religion?: number;
  population?: number;
}

export interface EconomieRecord {
  id: string;
  amount: number;
  category: EconomieCategory;
  description: string;
  date: string | GameDate;
  type: EconomieType;
  source: EconomieSource;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  approved: boolean;
  tags: string[];
  impactFactors: ImpactFactors;
  isRecurring?: boolean;
  recurringInterval?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EconomieCreationData {
  amount: number;
  category: EconomieCategory;
  description: string;
  date?: string | GameDate;
  type: EconomieType;
  source?: EconomieSource;
  affectedSenateurId?: string;
  affectedProvinceId?: string;
  approved?: boolean;
  tags?: string[];
  impactFactors?: ImpactFactors;
  isRecurring?: boolean;
  recurringInterval?: number;
}

export interface TreasuryStatus {
  balance: number;
  income: number;
  expenses: number;
  reserves: number;
  debt: number;
  lastUpdated: Date;
}

export interface EconomicFactors {
  taxCollection: number;
  tradeRevenue: number;
  militaryExpense: number;
  provinceRevenue: number;
  religiousCeremonyExpense: number;
  publicWorksExpense: number;
  warSpoilsRevenue: number;
  adminExpense: number;
  currentYear?: number;
  currentSeason?: string;
}

export interface EconomieTableProps {
  records: EconomieRecord[];
  sort: EconomieSort;
  onSortChange: (field: keyof EconomieRecord) => void;
  onEdit: (record: EconomieRecord) => void;
  onDelete: (id: string) => void;
}

export interface EconomieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EconomieCreationData) => void;
  record: EconomieRecord | null;
}

export interface EconomieStatsProps {
  treasury: TreasuryStatus;
  economicFactors: EconomicFactors;
}
