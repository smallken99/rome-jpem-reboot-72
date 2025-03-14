
import { GameDate } from './common';

export interface Loi {
  id: string;
  title: string;
  description: string;
  proposedBy: string;
  date: GameDate;
  status: 'proposed' | 'active' | 'rejected' | 'expired';
  category: string;
  votesFor?: number;
  votesAgainst?: number;
  implementationDate?: GameDate;
  expirationDate?: GameDate;
  notes?: string;
  effets?: string[];
  conditions?: string[];
  penalites?: string[];
}

export interface CategorieLoi {
  id: string;
  name: string;
  description: string;
}

export interface LoiVote {
  id: string;
  loiId: string;
  senateurId: string;
  vote: 'for' | 'against' | 'abstain';
  comment?: string;
  date: GameDate;
}

export interface LoiFilters {
  status?: 'proposed' | 'active' | 'rejected' | 'expired';
  category?: string;
  proposedBy?: string;
  dateRange?: [Date, Date] | null;
  searchTerm?: string;
}

export interface LoiSorting {
  field: keyof Loi;
  direction: 'asc' | 'desc';
}

export interface LoiCreate {
  title: string;
  description: string;
  proposedBy: string;
  category: string;
  effets?: string[];
  conditions?: string[];
  penalites?: string[];
  notes?: string;
}

export interface LoiUpdate extends Partial<LoiCreate> {
  id: string;
  status?: 'proposed' | 'active' | 'rejected' | 'expired';
  votesFor?: number;
  votesAgainst?: number;
  implementationDate?: GameDate;
  expirationDate?: GameDate;
}
