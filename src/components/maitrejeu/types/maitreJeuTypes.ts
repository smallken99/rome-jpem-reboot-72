
import { Season } from "@/utils/timeSystem";

// Types pour le système MaitreJeu
export interface GameState {
  year: number;
  season: Season;
  dayInSeason: number;
  gamePhase: GamePhase;
}

export type GamePhase = 
  | 'VOTE_DES_LOIS'
  | 'ÉLECTIONS'
  | 'ADMINISTRATION'
  | 'GUERRE'
  | 'CRISES'
  | 'DIPLOMATIE'
  | 'COMMERCE';

export interface Equilibre {
  plebeiens: number; // 0-100, satisfaction du peuple
  patriciens: number; // 0-100, satisfaction des familles nobles
  armée: number; // 0-100, force et loyauté
  religion: number; // 0-100, piété et faveur des dieux
  économie: number; // 0-100, santé économique 
  diplomatie: number; // 0-100, relations extérieures
}

export interface Evenement {
  id: string;
  title: string;
  description: string;
  date: {
    year: number;
    season: Season;
  };
  impact: Partial<Equilibre>;
  sourcePersistante: boolean;
  type: 'CRISE' | 'GUERRE' | 'POLITIQUE' | 'RELIGION' | 'ÉCONOMIQUE' | 'DIPLOMATIQUE' | 'SOCIAL';
  résolu: boolean;
  actions: EvenementAction[];
}

export interface EvenementAction {
  id: string;
  description: string;
  impact: Partial<Equilibre>;
  coût: number;
  risque: number; // 0-100
}

export interface HistoireEntry {
  id: string;
  title: string;
  description: string;
  date: {
    year: number;
    season: Season;
  };
  type: 'MAJEUR' | 'MINEUR';
  personnagesImpliqués: string[];
  images?: string[];
}

export interface Province {
  id: string;
  nom: string;
  gouverneur: string | null;
  ressources: {
    blé: number;
    or: number;
    bois: number;
    pierre: number;
    fer: number;
  };
  loyauté: number; // 0-100
  garnisonMilitaire: number; // taille de la garnison
  population: number;
  revenus: number;
  dépenses: number;
  statut: 'PACIFIÉE' | 'REBELLE' | 'EN_GUERRE' | 'INSTABLE';
  position: {
    x: number;
    y: number;
  };
}

export interface Senateur {
  id: string;
  nom: string;
  âge: number;
  famille: string;
  faction: string;
  stats: {
    éloquence: number;
    guerre: number;
    intrigue: number;
    administration: number;
    diplomatie: number;
  };
  magistrature: string | null;
  richesse: number;
  influence: number;
  réputation: number;
  assignéJoueur: string | null;
}

export interface Faction {
  id: string;
  nom: string;
  leader: string;
  membres: string[];
  influence: number;
  objectifs: string[];
  couleur: string;
}

export interface Election {
  id: string;
  poste: string;
  candidats: string[];
  date: {
    year: number;
    season: Season;
  };
  résultat: string | null;
}

export interface Loi {
  id: string;
  nom: string;
  description: string;
  proposéPar: string;
  datePropositon: {
    year: number;
    season: Season;
  };
  votes: {
    pour: number;
    contre: number;
    abstention: number;
  };
  status: 'PROPOSÉE' | 'ADOPTÉE' | 'REJETÉE';
  effets: Partial<Equilibre> & { description: string };
}

export interface MaitreJeuContextType {
  gameState: GameState;
  equilibre: Equilibre;
  evenements: Evenement[];
  histoireEntries: HistoireEntry[];
  provinces: Province[];
  senateurs: Senateur[];
  factions: Faction[];
  elections: Election[];
  lois: Loi[];
  
  // Actions
  setGameState: (gameState: GameState) => void;
  advanceTime: () => void;
  modifyEquilibre: (changes: Partial<Equilibre>) => void;
  addEvenement: (evenement: Evenement) => void;
  resolveEvenement: (id: string) => void;
  addHistoireEntry: (entry: HistoireEntry) => void;
  updateHistoireEntry: (id: string, entry: Partial<HistoireEntry>) => void;
  deleteHistoireEntry: (id: string) => void;
  addProvince: (province: Province) => void;
  updateProvince: (id: string, province: Partial<Province>) => void;
  assignGouverneur: (provinceId: string, senateurId: string) => void;
  addSenateur: (senateur: Senateur) => void;
  updateSenateur: (id: string, senateur: Partial<Senateur>) => void;
  assignSenateurToPlayer: (senateurId: string, playerId: string) => void;
  addFaction: (faction: Faction) => void;
  updateFaction: (id: string, faction: Partial<Faction>) => void;
  addElection: (election: Election) => void;
  resolveElection: (id: string, gagnant: string) => void;
  addLoi: (loi: Loi) => void;
  updateLoi: (id: string, loi: Partial<Loi>) => void;
  voteLoi: (id: string, vote: 'pour' | 'contre' | 'abstention', count: number) => void;
}
