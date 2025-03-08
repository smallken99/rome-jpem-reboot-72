
import { Season as TimeSystemSeason } from '@/utils/timeSystem';

// Redéfinir Season compatible avec le système de temps
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

// Types de base
export type EvenementType = 'POLITIQUE' | 'GUERRE' | 'CRISE' | 'ECONOMIQUE' | 'ÉCONOMIQUE' | 'RELIGION' | 'DIPLOMATIQUE' | 'SOCIAL';
export type ImportanceType = 'majeure' | 'mineure' | 'normale';
export type GamePhase = 'SETUP' | 'ELECTION' | 'ACTION' | 'SENAT' | 'EVENEMENT' | 'ADMINISTRATION';
export type Faction = string | { 
  id: string; 
  nom: string; 
  description: string; 
  leader: any; 
  membres: any[]; 
  influence: number; 
  couleur: string; 
  objectifs: string[];
};
export type MagistratureType = 'CONSUL' | 'PRETEUR' | 'PRÉTEUR' | 'EDILE' | 'QUESTEUR' | 'CENSEUR' | 'TRIBUN' | 'PONTIFEX_MAXIMUS';
export type PhaseType = string;
export type FactionPolitique = string;

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
    populaires?: number;
    optimates?: number;
    moderates?: number;
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
    day?: number;
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
  impact?: any; // Pour compatibilité avec le code existant
}

export interface Province {
  id: string;
  nom: string;
  gouverneur: string | null;
  région: string;
  region?: string; // Pour compatibilité avec le code existant
  population: number;
  status: 'pacifiée' | 'instable' | 'rebelle' | 'conquise' | 'en révolte';
  statut?: string; // Pour compatibilité avec le code existant
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
  armée?: number; // Pour compatibilité avec le code existant
  ressources?: string[]; // Pour compatibilité avec le code existant
}

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

export interface Evenement {
  id: string;
  titre: string;
  description: string;
  type: EvenementType;
  date: {
    year: number;
    season: Season;
    day?: number;
  };
  importance: ImportanceType;
  options?: EvenementAction[];
  resolved: boolean;
  impact?: any; // Pour compatibilité avec le code existant
}

export interface EvenementAction {
  id: string;
  texte: string;
  titre?: string; // Pour compatibilité avec le code existant
  description?: string; // Pour compatibilité avec le code existant
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
  impact?: any; // Pour compatibilité avec le code existant
}

export interface HistoireEntry {
  id: string;
  titre: string;
  contenu: string;
  description?: string; // Pour compatibilité avec le code existant
  catégorie?: string; // Pour compatibilité avec le code existant
  date: {
    year: number;
    season: Season;
    day?: number;
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

// Props pour les composants
export interface EquilibreChartProps {
  equilibre: Equilibre;
}

export interface PartisGraphProps {
  populaires?: number;
  optimates?: number;
  moderates?: number;
  factions?: { name: string; value: number; color: string; }[];
}

export interface PoliticalEventsTimelineProps {
  events: any[];
}

export interface TimeManagementProps {
  currentYear: number;
  currentSeason: Season;
  currentPhase: GamePhase;
  year?: number; // Pour compatibilité avec le code existant
  season?: Season; // Pour compatibilité avec le code existant
  phase?: GamePhase; // Pour compatibilité avec le code existant
  onAdvance: () => void;
  onPhaseChange: (phase: GamePhase) => void;
}

export interface EvenementsListProps {
  evenements: Evenement[];
  onResolve: (id: string, optionId: string) => void;
  filteredType?: EvenementType | 'ALL';
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
  year?: number; // Pour compatibilité avec le code existant
  season?: Season; // Pour compatibilité avec le code existant
  
  // Entities
  equilibre: Equilibre;
  lois: Loi[];
  provinces: Province[];
  senateurs: SenateurJouable[];
  evenements: Evenement[];
  histoireEntries: HistoireEntry[];
  elections: Election[];
  factions?: any[]; // Pour compatibilité avec le code existant
  
  // Actions
  advanceTime: () => void;
  changePhase: (phase: GamePhase) => void;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  updateFactionBalance: (populaires: number, optimates: number, moderates: number) => void;
  
  // Political
  addLoi: (loi: Omit<Loi, "id">) => void;
  voteLoi: (id: string, vote: 'pour' | 'contre' | 'abstention', count?: number) => void;
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
  addSenateur?: (senateur: Omit<SenateurJouable, "id">) => void; // Pour compatibilité avec le code existant
  deleteSenateur?: (id: string) => void; // Pour compatibilité avec le code existant
  assignSenateur?: (senateurId: string, playerId: string) => void; // Pour compatibilité avec le code existant
}

// Props interfaces for components
export interface ProvincesMapProps {
  provinces: Province[];
  onProvinceSelect: (provinceId: string) => void;
}

export interface ProvinceModalProps {
  province: Province;
  open: boolean;
  onClose?: () => void;
  onSave: (province: Province) => void;
}

export interface SenateurModalProps {
  senateur: SenateurJouable;
  open: boolean;
  isOpen?: boolean; // Pour compatibilité avec le code existant
  onClose?: () => void;
  onSave: (senateur: SenateurJouable) => void;
}

export interface ProvinceCardProps {
  province: Province;
  onViewProvince: (provinceId: string) => void;
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
  onVote?: (id: string, vote: 'pour' | 'contre' | 'abstention') => void;
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
