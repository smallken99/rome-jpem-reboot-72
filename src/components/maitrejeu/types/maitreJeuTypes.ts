
// Base types
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
export type PhaseType = 'ADMINISTRATIVE' | 'POLITIQUE' | 'ACTIONS' | 'RESOLUTION';
export type EvenementType = 'CRISE' | 'GUERRE' | 'POLITIQUE' | 'RELIGION' | 'ÉCONOMIQUE' | 'DIPLOMATIQUE' | 'SOCIAL';

// Faction politique
export type FactionPolitique = {
  id: string;
  nom: string;
  description?: string;
  valeurs?: string[];
  dirigeant?: string;
  membres?: number;
  influence?: number;
};

// Interface pour les événements
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
    influence?: number;
    finance?: number;
    militaire?: number;
    religion?: number;
    economie?: number;
  };
  actions: EvenementAction[];
  resolved?: boolean;
  sourcePersistante?: boolean;
}

export interface EvenementAction {
  id: string;
  titre: string;
  description: string;
  conséquences: string;
  coût?: number;
  risque?: number;
  impact?: {
    influence?: number;
    finance?: number;
    militaire?: number;
    religion?: number;
    economie?: number;
  };
}

// Entrée historique
export interface HistoireEntry {
  id: string;
  titre: string;
  type: string;
  description: string;
  personnagesImpliqués: string[];
  date: {
    year: number;
    season: Season;
    day: number;
  };
  importance: 'majeure' | 'mineure' | 'normale';
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
  ressourcesPrincipales?: string[];
  problèmes?: string[];
  opportunités?: string[];
  coordonnées?: {
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
  statut: string;
  fonctionActuelle: string | null;
  appartenance: string;
  ambition: string;
  popularité: number;
  compétences: Record<string, number>;
  relations: Record<string, number>;
  assignedToPlayer?: string | null;
}

// Équilibre des forces
export interface Equilibre {
  plebeiens: number;
  patriciens: number;
  armée: number;
  économie: number;
  religion: number;
  diplomatie: number;
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

// Loi
export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposéPar: string;
  date: {
    year: number;
    season: Season;
  };
  status: 'proposée' | 'votée' | 'rejetée' | 'amendée';
  votes: {
    pour: number;
    contre: number;
    abstention: number;
  };
  impact: {
    plebeiens?: number;
    patriciens?: number;
    militaire?: number;
    economie?: number;
    religion?: number;
    diplomatie?: number;
  };
}

// Props for components
export interface HistoireTimelineProps {
  histoireEntries: HistoireEntry[];
  onUpdateEntry: (entryId: string, updates: HistoireEntry) => void;
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

export interface ProvinceModalProps {
  province: Province;
  onClose: () => void;
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
  open: boolean;
  onClose: () => void;
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
}

export interface EquilibreChartProps {
  equilibre: Equilibre;
}

export interface EvenementsListProps {
  evenements: Evenement[];
  onResolve: (evenementId: string) => void;
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
  factions: any[];
}

export interface AssignmentTableProps {
  senateurs: SenateurJouable[];
  assignments: Record<string, string>;
  onAssign: (senateurId: string, playerId: string) => void;
}

// Main context type
export interface MaitreJeuContextType {
  // Time management
  currentYear: number;
  currentSeason: Season;
  currentPhase: PhaseType;
  advanceTime: () => void;
  changePhase: (newPhase: PhaseType) => void;
  
  // Histoire
  histoireEntries: HistoireEntry[];
  addHistoireEntry: (entry: Omit<HistoireEntry, 'id'>) => void;
  updateHistoireEntry: (entryId: string, updates: Partial<HistoireEntry>) => void;
  deleteHistoireEntry: (entryId: string) => void;
  
  // Provinces
  provinces: Province[];
  addProvince: (province: Omit<Province, 'id'>) => void;
  updateProvince: (provinceId: string, updates: Partial<Province>) => void;
  deleteProvince: (provinceId: string) => void;
  
  // Equilibre
  equilibre: Equilibre;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  
  // Evenements
  evenements: Evenement[];
  addEvenement: (evenement: Omit<Evenement, 'id'>) => void;
  resolveEvenement: (evenementId: string) => void;
  
  // Senateurs
  senateursJouables: SenateurJouable[];
  senateursAssignes: Record<string, string>;
  addSenateur: (senateur: Omit<SenateurJouable, 'id'>) => void;
  updateSenateur: (senateurId: string, updates: Partial<SenateurJouable>) => void;
  assignSenateur: (senateurId: string, playerId: string) => void;
  
  // Lois
  lois: Loi[];
  addLoi: (loi: Omit<Loi, 'id'>) => void;
  updateLoi: (loiId: string, updates: Partial<Loi>) => void;
  
  // Politique
  politicalEvents: any[];
  factions: FactionPolitique[];
}
