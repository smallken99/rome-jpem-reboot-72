
import { GameDate } from './common';

// Types pour les sénateurs
export interface SenateurJouable {
  id: string;
  nom: string;
  famille: string;
  age: number;
  popularite: number;
  richesse: number;
  influence: number;
  fonction?: string;
  appartenance?: string;
  status: string;
  magistrature?: string;
  playerId: string | null;
}

export interface SenateurNonJouable {
  id: string;
  nom: string;
  famille: string;
  age: number;
  faction: string;
  statut: string;
}

export interface SenateurHistorique {
  id: string;
  nom: string;
  dates: {
    naissance?: GameDate;
    mort?: GameDate;
  };
  accomplissements: string[];
  famille: string;
}

export interface FactionPolitique {
  id: string;
  nom: string;
  leader: string;
  membres: string[];
  influence: number;
  idéologie: string;
  alliés: string[];
  rivaux: string[];
}

// Interfaces pour les assignations spéciales
export interface AssignationPolitique {
  id: string;
  senateurId: string;
  poste: string;
  début: GameDate;
  fin?: GameDate;
  description: string;
}

export interface AssignationMilitaire {
  id: string;
  senateurId: string;
  province: string;
  armée: string;
  début: GameDate;
  fin?: GameDate;
  succès: boolean[];
}

// Interfaces pour les composants de l'UI
export interface SenateurListProps {
  senateurs: SenateurJouable[];
  onViewSenateur: (id: string) => void;
}

export interface AssignmentTableProps {
  senateurs: SenateurJouable[];
  onAssign: (senateurId: string, playerId: string) => void;
}
