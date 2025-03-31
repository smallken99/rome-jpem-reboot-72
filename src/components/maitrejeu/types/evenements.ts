
import { ImportanceType } from './common';

export type EvenementType = 'politique' | 'militaire' | 'economic' | 'social' | 'religious' | 'political' | 'military' | 'other' | string;

export interface EvenementAction {
  id: string;
  label: string;
  description: string;
  texte?: string;
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
  selectedOption?: string;
  nom?: string;
  tags?: string[];
}

export interface EvenementFormProps {
  onSubmit: (evenement: Omit<Evenement, 'id'>) => void;
  initialValues?: Partial<Evenement>;
  mode?: 'create' | 'edit';
}
