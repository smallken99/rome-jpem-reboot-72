
import { GameDate } from './common';
import { MagistratureType } from './magistratures';

export interface SenateurJouable {
  id: string;
  nom: string;
  famille: string;
  age: number;
  playerId?: string; // Ajouté pour résoudre l'erreur
  faction?: string;
  statut: string;
  compétences: {
    éloquence: number;
    guerre: number;
    administration: number;
    intrigue: number;
  };
  popularité: number;
  influence: number;
  richesse: number;
  clientèle: number;
  prestige: number;
  cursusHonorum?: {
    questeur?: GameDate;
    édile?: GameDate;
    préteur?: GameDate;
    consul?: GameDate;
    censeur?: GameDate;
  };
  magistratureActuelle?: MagistratureType;
  posteActuel?: string;
  provinces?: string[];
  alliés?: string[];
  ennemis?: string[];
  traits?: string[];
  historique?: string[];
}

export interface AssignmentTableProps {
  senateurs: SenateurJouable[];
  onAssignToPlayer: (senateurId: string, playerId: string) => void;
}
