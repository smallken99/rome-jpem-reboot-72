
import { GameDate } from './common';

export type EvenementType = 'POLITIQUE' | 'MILITAIRE' | 'ECONOMIQUE' | 'SOCIAL' | 'RELIGIEUX' | 'CATASTROPHE';

// Define ImportanceType as an enum-like type
export enum ImportanceType {
  MINEURE = "mineure",
  NORMALE = "normale",
  MAJEURE = "majeure",
  CRITIQUE = "critique"
}

export interface EvenementAction {
  id: string;
  texte: string;
  label: string;
  effets: Record<string, any>;
  consequence: string;
  description: string;  // Add missing required field
}

export interface Evenement {
  id: string;
  title: string;
  description: string;
  type: EvenementType;
  date: GameDate;
  importance: ImportanceType | string;
  options: EvenementAction[];
  resolved: boolean;
  selectedOption?: string;  // Add missing field
  endDate?: GameDate;      // Add missing field
  tags?: string[];         // Add missing field
  actions?: any[];         // Add missing field
  // French fields for compatibility
  titre?: string;
  nom?: string;
}

export interface EvenementFormProps {
  onSubmit: (evenement: Evenement | Omit<Evenement, "id">) => void;
  currentDate?: GameDate;
  isOpen?: boolean;
  onClose?: () => void;
}

// Use export type for re-exporting a type alias
export type { ImportanceType as ImportanceTypeAlias };
