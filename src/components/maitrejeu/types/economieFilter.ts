
import { GameDate } from './common';
import { ECONOMIE_CATEGORIES, ECONOMIE_TYPES } from './economie';

export interface EconomieFilter {
  searchTerm: string;
  types?: ECONOMIE_TYPES[];
  category?: ECONOMIE_CATEGORIES[];
  minAmount?: number;
  maxAmount?: number;
  dateRange?: {
    start: GameDate;
    end: GameDate;
  };
  approved?: boolean;
  recurring?: boolean;
  affectedEntity?: 'all' | 'senateur' | 'province';
  showRecurring?: boolean;
  showApproved?: boolean;
}
