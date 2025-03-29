
import { GameDate } from './common';

export type LoiType = 
  'social' | 
  'economic' | 
  'military' | 
  'political' | 
  'religious' | 
  'administrative' | 
  'judicial' | 
  'constitutional' | 
  string;

export type LoiState = 
  'proposed' | 
  'in_review' | 
  'to_vote' | 
  'passed' | 
  'enacted' | 
  'rejected' | 
  'repealed' | 
  'draft' |
  string;

export type ImportanceType = 
  'low' | 
  'medium' | 
  'high' | 
  'critical' |
  string;

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: GameDate;
  état: LoiState;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  soutiens: string[];
  opposants: string[];
  commentaires: string[];
  type: LoiType;
  impacts: Record<string, number>;
  effets: string[];
  history: { date: GameDate; event: string; actor?: string }[];
  
  // Additional properties for backwards compatibility
  title?: string;
  clauses?: any;
  tags?: string[];
}

export interface LoiDetail extends Loi {
  analysis?: string;
  precedents?: string[];
  consequences?: string[];
}

export interface LoiFormData {
  titre: string;
  description: string;
  proposeur: string;
  catégorie?: string;
  type: LoiType;
  importance: ImportanceType;
  clauses?: string[];
  impacts?: Record<string, number>;
  effets?: string[];
  tags?: string[];
}

export interface LoiVoteResult {
  id: string;
  loiId: string;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  date: GameDate;
  passed: boolean;
  participationRate: number;
}

export interface LoiTimelineProps {
  lois: Loi[];
  onSelectLoi?: (loi: Loi) => void;
}

export interface LoiFilterCriteria {
  state?: LoiState[];
  type?: LoiType[];
  importance?: ImportanceType[];
  proposeur?: string;
  dateMin?: GameDate;
  dateMax?: GameDate;
  searchText?: string;
}

export interface LoiSortCriteria {
  field: keyof Loi | 'votesTotal';
  direction: 'asc' | 'desc';
}
