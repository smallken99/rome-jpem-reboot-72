
import { GameDate } from './common';

export interface SenateurJouable {
  id: string;
  nom: string;
  famille: string;
  faction?: string;
  playerId?: string;
  âge?: number;
  fonctionActuelle?: string;
  magistrature?: string;
  appartenance?: string;
  stats?: {
    eloquence: number;
    militaire: number;
    administration: number;
    intrigue: number;
  };
  // Additional properties can be added here
}

export interface SenateurCardProps {
  senateur: SenateurJouable;
  onViewSenateur: (id: string) => void;
}

export interface SenateurModalProps {
  senateur: SenateurJouable;
  open: boolean;
  onClose: () => void;
  onSave: (updatedSenateur: SenateurJouable) => void;
}

export interface AssignmentTableProps {
  senateurs: SenateurJouable[];
  assignments: Record<string, string>;
  onAssign: (senateurId: string, playerId: string) => void;
}
