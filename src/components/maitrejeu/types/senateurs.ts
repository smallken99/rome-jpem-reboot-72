
import { MagistratureType } from './magistratures';

export interface SenateurJouable {
  id: string;
  nom: string;
  famille: string;
  âge: number;
  age?: number; // Pour compatibilité avec le code existant
  joueurId: string | null;
  stats: {
    éloquence: number;
    administration: number;
    militaire: number;
    intrigue: number;
    charisme: number;
  };
  statut?: string;
  ambition?: string;
  popularité: number;
  richesse: number;
  influence: number;
  magistrature: MagistratureType | null;
  faction: string;
  province: string | null;
  fonctionActuelle?: string;
  appartenance?: string;
  compétences?: Record<string, number>;
  relations?: Record<string, number>;
  votes?: number; // Pour compatibilité avec le code existant
  senateurId?: string; // Pour compatibilité avec le code existant
  soutiens?: any[]; // Pour compatibilité avec le code existant
}

export interface SenateurModalProps {
  senateur: SenateurJouable;
  open: boolean;
  isOpen?: boolean; // Pour compatibilité avec le code existant
  onClose?: () => void;
  onSave: (senateur: SenateurJouable) => void;
}

export interface SenateurCardProps {
  senateur: SenateurJouable;
  isAssigned?: boolean;
  playerName?: string;
  onEdit: () => void;
}

export interface AssignmentTableProps {
  senateurs: SenateurJouable[];
  assignments: Record<string, string>;
  onAssign: (senateurId: string, playerId: string) => void;
}
