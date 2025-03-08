
import { Season } from '@/utils/timeSystem';

// Types de base
export type GamePhase = 
  | 'VOTE_DES_LOIS' 
  | 'ÉLECTIONS' 
  | 'ADMINISTRATION' 
  | 'GUERRE' 
  | 'DIPLOMATIE' 
  | 'COMMERCE' 
  | 'CRISES';

export type EvenementType = 
  | 'politique' 
  | 'militaire' 
  | 'économique' 
  | 'religieux' 
  | 'social';

// Ajoutez ces variantes pour compatibilité avec le code existant
export const EVENEMENT_TYPES = {
  POLITIQUE: 'politique' as EvenementType,
  GUERRE: 'militaire' as EvenementType,
  ÉCONOMIQUE: 'économique' as EvenementType,
  RELIGION: 'religieux' as EvenementType,
  SOCIAL: 'social' as EvenementType,
  DIPLOMATIQUE: 'diplomatique' as EvenementType,
  CRISE: 'crise' as EvenementType
};

export type ProvinceStatus = 
  | 'pacifiée' 
  | 'instable' 
  | 'en révolte' 
  | 'en guerre';

export type MagistratureType = 
  | 'CONSUL' 
  | 'CENSEUR' 
  | 'PRÉTEUR' 
  | 'ÉDILE' 
  | 'QUESTEUR' 
  | 'TRIBUN';

// Pour les factions politiques
export type FactionPolitique = 
  | 'Optimates' 
  | 'Populares' 
  | 'Modérés' 
  | 'Indépendant';

// Action pour les événements
export type EvenementAction = {
  id: string;
  titre: string;
  description: string;
  conséquences: string;
};

// État du jeu
export interface GameState {
  year: number;
  season: Season;
  gamePhase: GamePhase;
  stabilityIndex: number;
  publicTreasury: number;
  romePrestige: number;
  religionIndex: number;
}

// Interface pour les événements
export interface Evenement {
  id: string;
  type: EvenementType;
  titre: string;
  description: string;
  date: {
    year: number;
    season: Season;
    day: number;
  };
  impact: {
    stabilité?: number;
    trésorPublique?: number;
    prestigeRome?: number;
    religion?: number;
    autre?: Record<string, number>;
  };
  options?: {
    id: string;
    titre: string;
    description: string;
    résultat: string;
    impact: {
      stabilité?: number;
      trésorPublique?: number;
      prestigeRome?: number;
      religion?: number;
      autre?: Record<string, number>;
    };
  }[];
  actions?: EvenementAction[];
  résolu: boolean;
  optionChoisie?: string;
}

// Interface pour les entrées historiques
export interface HistoireEntry {
  id: string;
  titre: string;
  description: string;
  date: {
    year: number;
    season: Season;
    day: number;
  };
  catégorie: EvenementType;
  type?: string; // Ajout pour compatibilité
  personnagesImpliqués?: string[]; // Ajout pour compatibilité
  importance: 1 | 2 | 3; // 1 = majeur, 3 = mineur
}

// Interface pour les provinces
export interface Province {
  id: string;
  nom: string;
  région: string;
  gouverneur: string | null;
  status: ProvinceStatus;
  population: number;
  revenu: number;
  dépense: number;
  armée: number;
  loyauté: number;
  description: string;
  ressources: string[];
  position: {
    x: number;
    y: number;
  };
  // Propriétés additionnelles pour compatibilité avec le code existant
  revenuAnnuel?: number;
  légions?: number;
  ressourcesPrincipales?: string[];
  coordonnées?: { x: number; y: number };
  problèmes?: string[];
  opportunités?: string[];
  richesse?: number;
  impôts?: number;
  garnison?: number;
}

// Interface pour les sénateurs
export interface SenateurJouable {
  id: string;
  nom: string;
  famille: string;
  joueurId: string | null;
  age: number;
  stats: {
    éloquence: number;
    administration: number;
    militaire: number;
    intrigue: number;
    charisme: number;
  };
  magistrature: MagistratureType | null;
  province: string | null;
  faction: string;
  richesse: number;
  influence: number;
  // Propriétés additionnelles pour compatibilité avec le code existant
  statut?: string;
  fonctionActuelle?: string;
  popularité?: number;
  appartenance?: FactionPolitique;
  compétences?: Record<string, number>;
  relations?: Record<string, number>;
  ambition?: string;
  âge?: number;
}

// Interface pour les factions
export interface Faction {
  id: string;
  nom: string;
  description: string;
  leader: string | null;
  membres: string[];
  influence: number;
  couleur: string;
  objectifs: string[];
}

// Interface pour les élections
export interface Election {
  id: string;
  année: number;
  saison: Season;
  magistrature: MagistratureType;
  candidats: {
    senateurId: string;
    votes: number;
    soutiens: string[];
  }[];
  élu: string | null;
  terminée: boolean;
}

// Interface pour les lois
export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  date: {
    year: number;
    season: Season;
    day: number;
  };
  catégorie: EvenementType;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  état: 'proposée' | 'votée' | 'rejetée' | 'en vigueur' | 'abrogée';
  impact: {
    stabilité?: number;
    trésorPublique?: number;
    prestigeRome?: number;
    religion?: number;
    autre?: Record<string, number>;
  };
}

// Interface pour l'équilibre des pouvoirs
export interface Equilibre {
  populaires: number;
  optimates: number;
  moderates: number;
  // Propriétés additionnelles pour compatibilité avec le code existant
  plebeiens: number;
  patriciens: number;
  armée: number;
  économie: number;
  religion: number;
  diplomatie: number;
  historique: {
    année: number;
    saison: Season;
    populaires: number;
    optimates: number;
    moderates: number;
  }[];
}

// Props pour les composants
export interface PoliticalEventsTimelineProps {
  events: Evenement[];
  searchTerm?: string; // Ajout de searchTerm en option
}

export interface LoisTableProps {
  lois?: Loi[];
  searchTerm?: string; // Ajout de searchTerm en option
  onVote?: (loiId: string, vote: 'pour' | 'contre' | 'abstention') => void;
}

export interface PartisGraphProps {
  factions: Faction[];
}

export interface ElectionPlannerProps {
  senateurs: SenateurJouable[];
  onScheduleElection: (magistrature: MagistratureType, year: number, season: Season) => void;
}

export interface ProvinceCardProps {
  province: Province;
  onClick?: () => void; // Rendre onClick optionnel
}

export interface ProvincesDataProps {
  provinces: Province[];
  onViewProvince: (provinceId: string) => void;
}

export interface ProvinceModalProps {
  province: Province | null;
  onClose: () => void;
  onSave: (province: Province) => void;
  mode?: 'add' | 'edit'; // Ajout du mode optionnel
}

export interface SenateurCardProps {
  senateur: SenateurJouable;
  isAssigned?: boolean; // Rendre isAssigned optionnel
  playerName?: string; // Rendre playerName optionnel
  onEdit?: () => void;
}

export interface SenateurModalProps {
  senateur: SenateurJouable | null;
  onClose: () => void;
  onSave: (senateur: SenateurJouable) => void;
  isOpen?: boolean; // Ajout de isOpen pour compatibilité
}

export interface AssignmentTableProps {
  senateurs: SenateurJouable[];
  assignments: Record<string, string>;
  onAssign: (senateurId: string, provinceId: string) => void;
}

// Interface pour le contexte MaitreJeu
export interface MaitreJeuContextType {
  // État général
  year: number;
  season: Season;
  gamePhase: GamePhase;
  
  // Indicateurs
  stabilityIndex: number;
  publicTreasury: number;
  romePrestige: number;
  religionIndex: number;
  
  // Données
  evenements: Evenement[];
  histoireEntries: HistoireEntry[];
  provinces: Province[];
  senateurs: SenateurJouable[];
  factions: Faction[];
  elections: Election[];
  lois: Loi[];
  
  // Propriétés additionnelles pour compatibilité avec le code existant
  politicalEvents?: Evenement[];
  senateursJouables?: SenateurJouable[];
  senateursAssignes?: Record<string, string>;
  
  // Équilibre des pouvoirs
  equilibre: Equilibre;
  
  // Gestion du temps
  advanceTime: () => void;
  setGamePhase: (phase: GamePhase) => void;
  
  // Gestion des événements
  addEvenement: (evenement: Omit<Evenement, 'id' | 'résolu'>) => string;
  resolveEvenement: (evenementId: string, optionId?: string) => void;
  
  // Gestion de l'histoire
  addHistoireEntry: (entry: Omit<HistoireEntry, 'id'>) => string;
  updateHistoireEntry: (entryId: string, updates: Partial<HistoireEntry>) => void;
  deleteHistoireEntry: (entryId: string) => void;
  
  // Gestion des provinces
  addProvince: (province: Omit<Province, 'id'>) => string;
  updateProvince: (provinceId: string, updates: Partial<Province>) => void;
  deleteProvince: (provinceId: string) => void;
  assignGovernor: (provinceId: string, senateurId: string | null) => void;
  
  // Gestion des sénateurs
  addSenateur: (senateur: Omit<SenateurJouable, 'id'>) => string;
  updateSenateur: (senateurId: string, updates: Partial<SenateurJouable>) => void;
  deleteSenateur: (senateurId: string) => void;
  assignSenateur: (senateurId: string, joueurId: string | null) => void;
  
  // Gestion des élections
  scheduleElection: (magistrature: MagistratureType, year: number, season: Season) => string;
  addCandidate: (electionId: string, senateurId: string) => void;
  voteForCandidate: (electionId: string, senateurId: string, votes: number) => void;
  finalizeElection: (electionId: string) => void;
  
  // Gestion des lois
  proposeLoi: (loi: Omit<Loi, 'id' | 'état' | 'votesPositifs' | 'votesNégatifs' | 'votesAbstention'>) => string;
  voteLoi: (loiId: string, vote: 'pour' | 'contre' | 'abstention', count: number) => void;
  finalizeLoi: (loiId: string) => void;
  
  // Équilibre des pouvoirs
  updateEquilibre: (populaires: number, optimates: number, moderates: number) => void;
}
