
import { GameDate, ImportanceType } from './common';

export type EvenementType = 'POLITIQUE' | 'GUERRE' | 'ECONOMIQUE' | 'RELIGION' | 'DIPLOMATIQUE' | 'SOCIAL' | 'CRISE';

export interface EvenementAction {
  id: string;
  texte: string; 
  effets: Record<string, any>;
  // Additional properties for compatibility
  label?: string;
  consequence?: string;
}

export interface Evenement {
  id: string;
  titre: string;
  description: string;
  type: EvenementType;
  date: GameDate;
  importance: ImportanceType;
  options: EvenementAction[];
  resolved: boolean;
  resolvedOption?: string;
}

export interface EvenementFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface EvenementsListProps {
  evenements: Evenement[];
  onResolve: (id: string, optionId: string) => void;
  filteredType: EvenementType | 'ALL';
}
