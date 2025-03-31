
import { GameDate } from './common';

export type EvenementType = 'POLITIQUE' | 'MILITAIRE' | 'ECONOMIQUE' | 'SOCIAL' | 'RELIGIEUX' | 'DIPLOMATIC' | string;
export type ImportanceType = 'mineure' | 'normale' | 'majeure' | 'critique' | 'low' | 'medium' | 'high' | 'critical' | string;

export interface EvenementAction {
  id: string;
  texte: string;
  label: string;
  consequence: string;
  description: string;
  effets?: Record<string, number> | {};
}

export interface Evenement {
  id: string;
  title: string; // Standard English field
  titre?: string; // French alias
  description: string;
  type: EvenementType;
  date: GameDate;
  importance: ImportanceType;
  options: EvenementAction[];
  resolved: boolean;
  selectedOption?: string;
  endDate?: GameDate;
  tags?: string[];
  actions?: EvenementAction[];
}

export interface EvenementFormProps {
  onSubmit: (evenement: Omit<Evenement, "id">) => void;
  evenementInitial?: Partial<Evenement>;
}

// Export types for compatibility
export { ImportanceType as ImportanceType };
