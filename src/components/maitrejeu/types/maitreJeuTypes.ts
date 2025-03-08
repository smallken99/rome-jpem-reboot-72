
import { ReactNode } from 'react';

// Types pour le système temporel
export interface TimeState {
  year: number;
  month: number;
  day: number;
  season: 'hiver' | 'printemps' | 'été' | 'automne';
  consulat: string;
  advanceTime: (days: number) => void;
}

// Types pour les événements
export interface Evenement {
  id: string;
  type: 'politique' | 'militaire' | 'économique' | 'religieux' | 'social';
  titre: string;
  description: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  impact: {
    stabilité?: number;
    trésorPublique?: number;
    prestigeRome?: number;
    religion?: number;
    autre?: Record<string, number>;
  };
  options?: Array<{
    id: string;
    titre: string;
    description: string;
    conséquences: string;
    impactModifiers: Record<string, number>;
  }>;
  résolu: boolean;
  optionChoisie?: string;
  acteur?: string;
}

// Types pour les provinces
export interface Province {
  id: string;
  nom: string;
  region: string;
  statut: 'pacifiée' | 'instable' | 'en révolte' | 'en guerre';
  population: number;
  richesse: number;
  revenuAnnuel: number;
  impôts: number;
  gouverneur: string | null;
  légions: number;
  garnison: number;
  loyauté: number;
  ressourcesPrincipales: string[];
  problèmes: string[];
  opportunités: string[];
  coordonnées: {
    x: number;
    y: number;
  };
}

// Types pour les senateurs
export interface SenateurJouable {
  id: string;
  nom: string;
  famille: string;
  âge: number;
  fonctionActuelle: string | null;
  statut: 'actif' | 'inactif' | 'décédé';
  popularité: number;
  influence: number;
  richesse: number;
  compétences: Record<string, number>;
  relations: Record<string, number>;
  appartenance: string | null;
  ambition: string;
  joueurId: string | null;
}

// Types pour les factions politiques
export interface FactionPolitique {
  id: string;
  nom: string;
  idéologie: string;
  membres: string[];
  leader: string;
  influence: number;
  alliés: string[];
  ennemis: string[];
  programme: string[];
}

// Types pour les lois
export interface Loi {
  id: string;
  nom: string;
  description: string;
  proposéPar: string;
  datePrésentation: {
    year: number;
    month: number;
    day: number;
  };
  dateVote?: {
    year: number;
    month: number;
    day: number;
  };
  résultat?: 'adoptée' | 'rejetée' | 'en attente';
  votePour: number;
  voteContre: number;
  abstentions: number;
  effets: string[];
  statusActuel: 'en préparation' | 'présentée' | 'débattue' | 'votée' | 'promulguée' | 'abrogée';
}

// Types pour le contexte Maître du Jeu
export interface MaitreJeuContextType {
  // Gestion du temps
  advanceDay: () => void;
  advanceMonth: () => void;
  advanceYear: () => void;
  advanceCustom: (days: number) => void;
  
  // Gestion des événements
  événementsEnCours: Evenement[];
  événementsHistoriques: Evenement[];
  ajouterÉvénement: (événement: Omit<Evenement, 'id'>) => string;
  résoudreÉvénement: (événementId: string, optionId?: string) => void;
  modifierÉvénement: (événement: Evenement) => void;
  
  // Gestion des provinces
  provinces: Province[];
  ajouterProvince: (province: Omit<Province, 'id'>) => string;
  modifierProvince: (province: Province) => void;
  attribuerGouverneur: (provinceId: string, gouverneurId: string | null) => void;
  
  // Gestion des sénateurs
  senateursJouables: SenateurJouable[];
  senateursAssignes: Record<string, string>;
  ajouterSénateur: (sénateur: Omit<SenateurJouable, 'id'>) => string;
  modifierSénateur: (sénateur: SenateurJouable) => void;
  assignerJoueur: (senateurId: string, joueurId: string | null) => void;
  
  // Gestion des lois
  lois: Loi[];
  ajouterLoi: (loi: Omit<Loi, 'id'>) => string;
  modifierLoi: (loi: Loi) => void;
  voterLoi: (loiId: string, résultat: 'adoptée' | 'rejetée', votePour: number, voteContre: number, abstentions: number) => void;
  
  // Gestion des factions
  factionsPolitiques: FactionPolitique[];
  ajouterFaction: (faction: Omit<FactionPolitique, 'id'>) => string;
  modifierFaction: (faction: FactionPolitique) => void;
  
  // Gestion de l'économie
  trésorPublique: number;
  modifierTrésor: (montant: number, raison: string) => void;
  
  // Chargé du contexte
  isLoading: boolean;
}
