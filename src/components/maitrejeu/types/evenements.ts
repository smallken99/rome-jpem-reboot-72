
import { GameDate, ImportanceType } from './common';

export type EvenementType = 'POLITIQUE' | 'ECONOMIQUE' | 'GUERRE' | 'RELIGION' | 'DIPLOMATIQUE' | 'SOCIAL' | 'CRISE';

export interface EvenementAction {
  id: string;
  texte: string;
  effets: Record<string, number>;
  // Propriétés de compatibilité avec l'ancien système
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
  selectedOption?: string;
}

export interface EvenementFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PoliticalEvent {
  id: string;
  date: GameDate;
  title: string;
  description: string;
  type: EvenementType;
  importance: ImportanceType;
  resolved?: boolean;
  impact?: {
    politique?: number;
    sociale?: number;
    economique?: number;
    militaire?: number;
  };
}
