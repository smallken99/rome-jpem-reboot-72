
import { GameDate } from './common';

export interface SenateurJouable {
  id: string;
  nom: string;
  famille: string;
  age: number;
  popularite: number;
  richesse: number;
  influence: number;
  fonction: string;
  appartenance: string;
  status: string;
  magistrature: string;
  playerId: string | null;
  // Propriétés de compatibilité
  âge?: number;
  popularité?: number;
  fonctionActuelle?: string;
  statut?: string;
  stats?: Record<string, number>;
}

export interface SenateurCardProps {
  senateur: SenateurJouable;
  onSelect?: (id: string) => void;
  selected?: boolean;
}

export interface SenateurModalProps {
  isOpen: boolean;
  senateur: SenateurJouable | null;
  onClose: () => void;
  onUpdate: (senateur: SenateurJouable) => void;
}
