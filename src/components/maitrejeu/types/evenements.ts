
import { ImportanceType } from './common';

export type EvenementType = 'politique' | 'militaire' | 'economic' | 'social' | 'religious' | 'political' | 'military' | 'other' | string;

export interface EvenementAction {
  id: string;
  label: string;
  description: string;
  consequence?: string;
  impact?: Record<string, number>;
}

export interface Evenement {
  id: string;
  title: string;
  titre?: string;
  description: string;
  type: EvenementType;
  date: { year: number; season: string };
  endDate?: { year: number; season: string };
  importance: ImportanceType;
  options: EvenementAction[];
  actions?: EvenementAction[];
  resolved: boolean;
  nom?: string;
  tags?: string[];
}
