
// Base types
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
export type PhaseType = 'ADMINISTRATIVE' | 'POLITIQUE' | 'ACTIONS' | 'RESOLUTION';
export type EvenementType = 'CRISE' | 'GUERRE' | 'POLITIQUE' | 'RELIGION' | 'ÉCONOMIQUE' | 'DIPLOMATIQUE' | 'SOCIAL';
export type GamePhase = 'ADMINISTRATION' | 'POLITIQUE' | 'MILITAIRE' | 'DIPLOMATIQUE';
export type MagistratureType = 'CONSUL' | 'PRÉTEUR' | 'ÉDILE' | 'QUESTEUR' | 'CENSEUR' | 'TRIBUN';
export type ImportanceType = 'majeure' | 'mineure' | 'normale';

// Faction politique
export interface FactionPolitique {
  id: string;
  nom: string;
  description?: string;
  valeurs?: string[];
  dirigeant?: string;
  membres?: number;
  influence?: number;
}

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

// Interface pour les événements
export interface EvenementAction {
  id: string;
  titre: string;
  description: string;
  conséquences: string;
  coût?: number;
  risque?: number;
  impact?: {
    stabilité?: number;
    trésorPublique?: number;
    prestigeRome?: number;
    religion?: number;
    influence?: number;
    finance?: number;
    militaire?: number;
    economie?: number;
  };
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
  impact: {
    stabilité?: number;
    trésorPublique?: number;
    prestigeRome?: number;
    religion?: number;
    influence?: number;
    finance?: number;
    militaire?: number;
    economie?: number;
  };
  options?: EvenementAction[];
  optionChoisie?: string;
  actions?: EvenementAction[];
  résolu?: boolean;
  sourcePersistante?: boolean;
}

// Entrée historique
export interface HistoireEntry {
  id: string;
  titre: string;
  catégorie: string;
  description: string;
  personnagesImpliqués?: string[];
  date: {
    year: number;
    season: Season;
    day: number;
  };
  importance: ImportanceType;
}

// Province
export interface Province {
  id: string;
  nom: string;
  région: string;
  status: string;
  gouverneur: string | null;
  description: string;
  population: number;
  revenu: number;
  dépense: number;
  revenuAnnuel?: number;
  impôts?: number;
  richesse?: number;
  garnison?: number;
  légions?: number;
  loyauté?: number;
  armée?: number;
  ressources?: string[];
  ressourcesPrincipales?: string[];
  problèmes?: string[];
  opportunités?: string[];
  coordonnées?: {
    x: number;
    y: number;
  };
  position?: {
    x: number;
    y: number;
  };
}

// Sénateur jouable
export interface SenateurJouable {
  id: string;
  nom: string;
  famille: string;
  âge: number;
  age?: number;
  statut?: string;
  fonctionActuelle?: string | null;
  magistrature?: MagistratureType | null;
  appartenance?: string;
  faction?: string;
  province?: string | null;
  ambition?: string;
  popularité?: number;
  influence?: number;
  richesse?: number;
  joueurId?: string | null;
  assignedToPlayer?: string | null;
  compétences?: Record<string, number>;
  stats?: {
    éloquence: number;
    administration: number;
    militaire: number;
    intrigue: number;
    charisme: number;
  };
  relations?: Record<string, number>;
}

// Élection
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

// Loi
export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  date: {
    year: number;
    season: Season;
    day?: number;
  };
  état?: 'proposée' | 'votée' | 'rejetée' | 'amendée';
  status?: 'proposée' | 'votée' | 'rejetée' | 'amendée';
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
  catégorie?: string;
  impact: {
    stabilité?: number;
    trésorPublique?: number;
    prestigeRome?: number;
    plebeiens?: number;
    patriciens?: number;
    militaire?: number;
    economie?: number;
    religion?: number;
    diplomatie?: number;
  };
}

// Équilibre des forces
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

// Props for components
export interface HistoireTimelineProps {
  histoireEntries: HistoireEntry[];
  onUpdateEntry: (entryId: string, updates: Partial<HistoireEntry>) => void;
  onDeleteEntry: (entryId: string) => void;
}

export interface ProvinceCardProps {
  province: Province;
  onViewProvince?: (province: Province) => void;
}

export interface ProvincesDataProps {
  provinces: Province[];
  onViewProvince: (province: Province) => void;
}

export interface ProvincesMapProps {
  provinces: Province[];
  onProvinceSelect?: (provinceId: string) => void;
}

export interface ProvinceModalProps {
  province: Province;
  onClose?: () => void;
  onSave: (province: Province) => void;
  open?: boolean;
}

export interface SenateurCardProps {
  senateur: SenateurJouable;
  playerName?: string;
  onEdit?: () => void;
  isAssigned?: boolean;
}

export interface SenateurModalProps {
  senateur: SenateurJouable;
  open?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onSave: (senateur: SenateurJouable) => void;
}

export interface TimeManagementProps {
  year: number;
  season: Season;
  phase: PhaseType;
  onAdvance: () => void;
  onPhaseChange: (newPhase: PhaseType) => void;
}

export interface LoisTableProps {
  lois: Loi[];
  searchTerm?: string;
  onVote?: (loiId: string, vote: 'pour' | 'contre' | 'abstention', count: number) => void;
}

export interface EquilibreChartProps {
  equilibre: Equilibre;
}

export interface EvenementsListProps {
  evenements: Evenement[];
  onResolve: (evenementId: string, optionId?: string) => void;
  filteredType: EvenementType | 'ALL';
}

export interface PoliticalEventsTimelineProps {
  events: any[];
  searchTerm?: string;
}

export interface ElectionPlannerProps {
  senateurs: SenateurJouable[];
  onScheduleElection: (position: string, date: { year: number; season: Season }) => void;
}

export interface PartisGraphProps {
  factions: Faction[];
}

export interface AssignmentTableProps {
  senateurs: SenateurJouable[];
  assignments: Record<string, string>;
  onAssign: (senateurId: string, playerId: string) => void;
}

// Main context type
export interface MaitreJeuContextType {
  // Time management
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
  scheduleElection: (magistrature: string, year: number, season: Season) => string;
  addCandidate: (electionId: string, senateurId: string) => void;
  voteForCandidate: (electionId: string, senateurId: string, votes: number) => void;
  finalizeElection: (electionId: string) => void;
  
  // Gestion des lois
  proposeLoi: (loi: Omit<Loi, 'id' | 'état' | 'votesPositifs' | 'votesNégatifs' | 'votesAbstention'>) => string;
  voteLoi: (loiId: string, vote: 'pour' | 'contre' | 'abstention', count: number) => void;
  finalizeLoi: (loiId: string) => void;
  
  // Équilibre des pouvoirs
  updateEquilibre: (updates: Partial<Equilibre>) => void;
}
