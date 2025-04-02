
import { Equilibre } from './equilibre';
import { Loi } from './lois';
import { Province } from './province';
import { SenateurJouable } from './senateurs';
import { Evenement } from './evenements';
import { HistoireEntry } from './histoire';
import { Election } from './elections';
import { GamePhase, Season, GameDate } from './common';
import { MagistratureType } from './magistratures';
import { Client, ClientCreationData } from './clients';
import { TreasuryStatus } from './economie';

export interface MaitreJeuContextType {
  // Game state
  gameState: {
    year: number;
    season: Season;
    phase: GamePhase;
    day: number;
  };
  currentYear: number;
  currentSeason: Season;
  currentPhase: GamePhase;
  currentDate: GameDate;
  year?: number; // For compatibility with existing code
  season?: Season; // For compatibility with existing code
  
  // Entities
  equilibre: Equilibre;
  lois: Loi[];
  provinces: Province[];
  senateurs: SenateurJouable[];
  evenements: Evenement[];
  histoireEntries: HistoireEntry[];
  elections: Election[];
  clients: Client[];
  factions?: any[]; // For compatibility with existing code
  treasury: TreasuryStatus;
  senatorsCount?: number;
  clientsCount?: number;
  
  // State setters
  setSenateurs: React.Dispatch<React.SetStateAction<SenateurJouable[]>>;
  setProvinces: React.Dispatch<React.SetStateAction<Province[]>>;
  setEvenements: React.Dispatch<React.SetStateAction<Evenement[]>>;
  setLois: React.Dispatch<React.SetStateAction<Loi[]>>;
  setHistoireEntries: React.Dispatch<React.SetStateAction<HistoireEntry[]>>;
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  setEquilibre: React.Dispatch<React.SetStateAction<Equilibre>>;
  
  // Actions
  advanceTime: (newSeason?: Season) => void;
  changePhase: (phase: GamePhase) => void;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  updateFactionBalance: (populaires: number, optimates: number, moderates: number) => void;
  advancePhase?: () => void; // For compatibility with MaitreJeuWelcome
  
  // Political
  addLoi: (loi: Omit<Loi, "id">) => void;
  voteLoi: (id: string, vote: 'pour' | 'contre' | 'abstention', count?: number) => void;
  scheduleElection: (magistrature: MagistratureType, year?: number, season?: Season) => string;
  
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
  addSenateur?: (senateur: Omit<SenateurJouable, "id">) => void; // For compatibility
  deleteSenateur?: (id: string) => void; // For compatibility
  assignSenateur?: (senateurId: string, playerId: string) => void; // For compatibility
  
  // Client operations
  addClient: (client: ClientCreationData) => string;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  assignClientToSenateur: (clientId: string, senateurId: string | null) => void;
  adjustCompetencePoints: (clientId: string, points: number) => void;
  changeClientStatus: (clientId: string, status: 'active' | 'inactive' | 'probation') => void;
  
  // Family operations
  getFamille?: (id: string) => any;
  getMembre?: (id: string) => any;
  getMembresByFamille?: (familleId: string) => any[];
  deleteMembreFamille?: (id: string) => void;
  updateMembreFamille?: (id: string, updates: any) => void;
  addFamille?: (familleData: any) => string;
  addMembreFamille?: (membreData: any) => string;
  createAlliance?: (famille1Id: string, famille2Id: string, type: string, termes: string, benefices: string[]) => string;
  
  // Additional compatibility methods
  removeClient?: (id: string) => void;
  clientTypes?: string[];
  updateClientCompetences?: (clientId: string, competences: any) => void;
  voteLoi?: (id: string, vote: string, count?: number) => void;
}
