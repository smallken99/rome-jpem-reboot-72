
import { Equilibre } from './equilibre';
import { Loi } from './lois';
import { Province } from './provinces';
import { SenateurJouable } from './senateurs';
import { Evenement } from './evenements';
import { HistoireEntry } from './histoire';
import { Election } from './elections';
import { GamePhase, Season } from './common';
import { MagistratureType } from './magistratures';

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
  setSenateurs: React.Dispatch<React.SetStateAction<SenateurJouable[]>>;
  
  // Actions
  advanceTime: (newSeason?: Season) => void;
  changePhase: (phase: GamePhase) => void;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  updateFactionBalance: (populaires: number, optimates: number, moderates: number) => void;
  
  // Political
  addLoi: (loi: Omit<Loi, "id">) => void;
  voteLoi: (id: string, vote: 'pour' | 'contre' | 'abstention', count?: number) => void;
  scheduleElection: (magistrature: MagistratureType) => string;
  
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
