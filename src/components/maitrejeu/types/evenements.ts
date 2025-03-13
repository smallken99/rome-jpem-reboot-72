
// Types pour les événements

export type EvenementType = 'POLITIQUE' | 'MILITAIRE' | 'DIPLOMATIQUE' | 'ECONOMIQUE' | 'SOCIAL' | 'RELIGIEUX' | 'CATASTROPHE';
export type ImportanceType = 'mineure' | 'normale' | 'majeure' | 'critique';

// Interface pour une option de résolution d'un événement
export interface EvenementAction {
  id: string;
  texte: string;
  effets: Record<string, number>;  // Effets sur différentes statistiques
  label: string;
  consequence: string;
}

// Interface principale pour un événement
export interface Evenement {
  id: string;
  titre: string;
  description: string;
  type: EvenementType;
  date: {
    year: number;
    season: string;
  };
  importance: ImportanceType;
  options: EvenementAction[];
  resolved: boolean;
  selectedOption?: string;
}

// Interface pour les props du formulaire d'événements
export interface EvenementFormProps {
  isOpen: boolean;
  onClose: () => void;
}
