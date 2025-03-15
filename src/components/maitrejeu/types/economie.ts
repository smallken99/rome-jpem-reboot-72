
import { GameDate } from './common';

export type EconomieType = 'income' | 'expense' | 'tax' | 'trade' | 'military' | 'construction' | 'slaves' | 'other' | 'all';
export type EconomieSource = 
  'tax' | 'trade' | 'war' | 'donation' | 'fine' | 'sale' | 'purchase' | 'salary' | 'rent' | 
  'manual_entry' | 'other' | 'Impôts' | 'Armée' | 'Commerce extérieur' | 'Construction' | 
  'Trésor Public' | 'Services d\'entretien' | 'Vente immobilière' | 'Marché aux esclaves' | 
  'Perception fiscale' | string;

export type EconomieCategory = 
  'military' | 'administration' | 'construction' | 'religion' | 'slaves' | 'entertainment' | 
  'tax' | 'trade' | 'diplomacy' | 'other' | 'all' | 'Impôts' | 'Armée' | 'Commerce' | 
  'Construction' | 'maintenance' | 'sale';

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
  impactFactors?: ImpactFactors;
  isRecurring?: boolean;
  recurringInterval?: string | number;
  createdAt: string | Date;
  updatedAt: string | Date;
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
  recurringInterval?: number | string;
}

export interface TreasuryStatus {
  id: string;
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  surplus: number;
  projectedBalance: number;
  lastUpdated: GameDate | string;
  inflationRate: number;
  taxRate: number;
  comments: string;
  previousBalance?: number;
  income?: number;
  expenses?: number;
  debt?: number;
}

export interface TreasuryData {
  balance: number;
  income: number;
  expenses: number;
  reserves: number;
  taxCollection?: number;
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
  loanInterestRate?: number;
  tradeStability?: number;
  inflationRate?: number;
  growthRate?: number;
  taxRates?: {
    land: number;
    income: number;
    trade: number;
    luxury: number;
    average?: number;
  };
}

export interface EconomieTableProps {
  records: EconomieRecord[];
  sort: EconomieSort;
  onSortChange: (field: string) => void;
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

export interface EconomieActionsProps {
  onAddTransaction: () => void;
  onGenerateReport: () => void;
  onRefreshData: () => void;
  onManageBuildings?: () => void;
  onManageTaxes?: () => void;
  onManageSlaves?: () => void;
  onCalculateProjections?: () => void;
}

export interface EconomieFiltersProps {
  filter: EconomieFilter;
  onFilterChange: (key: string, value: any) => void;
  onResetFilters: () => void;
}
