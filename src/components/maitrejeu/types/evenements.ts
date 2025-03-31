
import { GameDate } from './common';

export type EvenementType = 'POLITIQUE' | 'MILITAIRE' | 'ECONOMIQUE' | 'SOCIAL' | 'RELIGIEUX' | 'CATASTROPHE';

export type ImportanceType = 'mineure' | 'normale' | 'majeure' | 'critique';

export interface EvenementAction {
  id: string;
  texte: string;
  label: string;
  effets: Record<string, any>;
  consequence: string;
  description: string;
}

export interface Evenement {
  id: string;
  title: string;
  description: string;
  type: EvenementType;
  date: GameDate;
  importance: ImportanceType;
  options: EvenementAction[];
  resolved: boolean;
  // Champs français pour compatibilité
  titre?: string;
  nom?: string;
}

export interface EvenementFormProps {
  onSubmit: (evenement: Evenement) => void;
  currentDate?: GameDate;
  isOpen?: boolean;
  onClose?: () => void;
}

// Exportation correcte du type ImportanceType
export type { ImportanceType };
