
import { Season as TimeSystemSeason } from '@/utils/timeSystem';

// Redéfinir Season compatible avec le système de temps
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

// Types de base
export type EvenementType = 'POLITIQUE' | 'GUERRE' | 'CRISE' | 'ECONOMIQUE' | 'RELIGION' | 'DIPLOMATIQUE' | 'SOCIAL';
export type ImportanceType = 'majeure' | 'mineure' | 'normale';
export type GamePhase = 'SETUP' | 'ELECTION' | 'ACTION' | 'SENAT' | 'EVENEMENT';
export type Faction = 'Populares' | 'Optimates' | 'Moderates' | 'Indépendant';
export type MagistratureType = 'CONSUL' | 'PRETEUR' | 'EDILE' | 'QUESTEUR' | 'CENSEUR' | 'TRIBUN' | 'PONTIFEX_MAXIMUS';

// Structures de données principales
export interface Equilibre {
  plebeiens: number;
  patriciens: number;
  armée: number;
  économie: number;
  religion: number;
  diplomatie: number;
  populaires?: number;
  optimates?: number;
  moderates?: number;
  historique: {
    année: number;
    saison: Season;
    plebeiens: number;
    patriciens: number;
    armée: number;
    économie: number;
    religion: number;
    diplomatie: number;
  }[];
}

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: {
    year: number;
    season: Season;
    day: number;
  };
  état: 'proposée' | 'votée' | 'rejetée' | 'amendée';
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  effets: {
    stabilité?: number;
    trésorPublique?: number;
    prestigeRome?: number;
    religion?: number;
    influence?: number;
    finance?: number;
    militaire?: number;
    economie?: number;
    autre?: string;
  };
}

export interface Province {
  id: string;
  nom: string;
  gouverneur: string | null;
  région: string;
  population: number;
  status: 'pacifiée' | 'instable' | 'rebelle' | 'conquise';
  description: string;
  revenu: number;
  dépense: number;
  loyauté: number;
  légions: number;
  garnison: number;
  richesse: number;
  revenuAnnuel: number;
  impôts: number;
  ressourcesPrincipales: string[];
  problèmes: string[];
  opportunités: string[];
  coordonnées: {
    x: number;
    y: number;
  };
}

export interface SenateurJouable {
  id: string;
  nom: string;
  famille: string;
  âge: number;
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
}

export interface Evenement {
  id: string;
  titre: string;
  description: string;
  type: EvenementType;
  date: {
    year: number;
    season: Season;
    day: number;
  };
  importance: ImportanceType;
  options?: EvenementAction[];
  resolved: boolean;
}

export interface EvenementAction {
  id: string;
  texte: string;
  effets: {
    stabilité?: number;
    trésorPublique?: number;
    prestigeRome?: number;
    religion?: number;
    influence?: number;
    finance?: number;
    militaire?: number;
    economie?: number;
    autre?: string;
  };
  résultat?: string;
}

export interface HistoireEntry {
  id: string;
  titre: string;
  contenu: string;
  date: {
    year: number;
    season: Season;
    day: number;
  };
  type?: string;
  personnagesImpliqués?: string[];
}

export interface Election {
  id: string;
  année: number;
  saison: Season;
  magistrature: MagistratureType;
  candidats: SenateurJouable[];
  élu: SenateurJouable | null;
  terminée: boolean;
}

// Interfaces de composants
export interface MaitreJeuContextType {
  // État du jeu
  gameState: {
    year: number;
    season: Season;
    phase: GamePhase;
    day: number;
  };
  currentYear: number;
  currentSeason: Season;
  currentPhase: GamePhase;
  
  // Entities
  equilibre: Equilibre;
  lois: Loi[];
  provinces: Province[];
  senateurs: SenateurJouable[];
  evenements: Evenement[];
  histoireEntries: HistoireEntry[];
  elections: Election[];
  
  // Actions
  advanceTime: () => void;
  changePhase: (phase: GamePhase) => void;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  updateFactionBalance: (populaires: number, optimates: number, moderates: number) => void;
  
  // Political
  addLoi: (loi: Omit<Loi, "id">) => void;
  voteLoi: (id: string, vote: 'pour' | 'contre' | 'abstention') => void;
  scheduleElection: (magistrature: MagistratureType, year: number, season: Season) => string;
  
  // Events management
  addEvenement: (evenement: Omit<Evenement, "id">) => void;
  resolveEvenement: (id: string, optionId: string) => void;
  
  // Histoire (History) management
  addHistoireEntry: (entry: Omit<HistoireEntry, "id">) => void;
  
  // Provinces
  updateProvince: (id: string, updates: Partial<Province>) => void;
  
  // Senateurs
  updateSenateur: (id: string, updates: Partial<SenateurJouable>) => void;
  assignSenateurToPlayer: (senateurId: string, playerId: string) => void;
}

// Props interfaces for components
export interface ProvincesMapProps {
  provinces: Province[];
  onProvinceSelect: (provinceId: string) => void;
}

export interface ProvinceModalProps {
  province: Province;
  open: boolean;
  onClose: () => void;
  onSave: (province: Province) => void;
}

export interface SenateurModalProps {
  senateur: SenateurJouable;
  open: boolean;
  onClose: () => void;
  onSave: (senateur: SenateurJouable) => void;
}

export interface ProvinceCardProps {
  province: Province;
  onViewProvince: () => void;
}

export interface SenateurCardProps {
  senateur: SenateurJouable;
  isAssigned?: boolean;
  playerName?: string;
  onEdit: () => void;
}

export interface LoisTableProps {
  lois: Loi[];
  searchTerm?: string;
}

export interface ElectionPlannerProps {
  senateurs: SenateurJouable[];
  onScheduleElection: (magistrature: MagistratureType, year: number, season: Season) => void;
}

export interface ProvincesDataProps {
  provinces: Province[];
  onViewProvince: (provinceId: string) => void;
}

export interface AssignmentTableProps {
  senateurs: SenateurJouable[];
  assignments: Record<string, string>;
  onAssign: (senateurId: string, playerId: string) => void;
}
