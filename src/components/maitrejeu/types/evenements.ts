
import { ImportanceType } from './common';

export type EvenementType = 'politique' | 'militaire' | 'economic' | 'social' | 'religious' | 'political' | 'military' | 'other' | string;

export interface EvenementAction {
  id: string;
  label: string;
  description: string;
  texte?: string;
  consequence?: string;
  impact?: Record<string, number>;
  effets?: any;
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
  onSubmit: (evenement: Omit<Evenement, "id">) => void;
  initialValues?: Partial<Evenement>;
  mode?: 'create' | 'edit';
  isOpen?: boolean;
  onClose?: () => void;
}

// Adapter function to convert between different Evenement formats
export function adaptEvenement(evenement: any): Evenement {
  // Default values
  const defaultEvenement: Evenement = {
    id: evenement.id || '',
    title: '',
    description: '',
    type: 'politique',
    date: { year: 2023, season: 'spring' },
    importance: 'medium',
    options: [],
    resolved: false
  };
  
  // Handle interchangeable properties
  const adaptedEvenement: Evenement = {
    ...defaultEvenement,
    ...evenement,
    title: evenement.title || evenement.titre || evenement.nom || '',
    options: evenement.options || evenement.actions || []
  };
  
  return adaptedEvenement;
}
