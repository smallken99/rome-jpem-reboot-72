
import { GameDate } from '@/utils/types/gameDate';

export interface Evenement {
  id: string;
  title: string;
  description: string;
  date: Date | GameDate;
  type: string;
  importance: string;
  resolved?: boolean;
  impact?: Record<string, number>;
  endDate?: Date | GameDate;
  nom?: string;
  tags?: string[];
  actions?: string[];
}

export type EvenementType = 'POLITIQUE' | 'ECONOMIE' | 'SOCIAL' | 'MILITAIRE' | 'RELIGION';
export type ImportanceType = 'faible' | 'normale' | 'haute' | 'critique';

export interface EvenementAction {
  id: string;
  texte: string;
  label: string;
  effets: Record<string, any>;
  consequence: string;
}
