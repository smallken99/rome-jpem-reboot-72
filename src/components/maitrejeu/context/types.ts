
import { 
  SenateurJouable, 
  Province, 
  Evenement, 
  Election, 
  HistoireEntry,
  Loi,
  Equilibre
} from '../types';
import { GameDate, Season, GamePhase } from '../types/common';
import { MagistratureType } from '../types/magistratures';
import { Client, ClientCreationData, ClientFilter, ClientSort } from '../types/clients';
import { EconomieRecord, EconomieCreationData, TreasuryStatus, EconomicFactors } from '../types/economie';

// Type du contexte
export interface MaitreJeuContextType {
  // Contexte des sénateurs
  senateurs: SenateurJouable[];
  setSenateurs: React.Dispatch<React.SetStateAction<SenateurJouable[]>>;
  updateSenateur: (id: string, updates: Partial<SenateurJouable>) => void;
  assignSenateurToPlayer: (senateurId: string, playerId: string) => void;
  addSenateur: (senateur: Omit<SenateurJouable, "id">) => void;
  deleteSenateur: (id: string) => void;
  
  // Contexte des provinces
  provinces: Province[];
  setProvinces: React.Dispatch<React.SetStateAction<Province[]>>;
  updateProvince: (province: Province) => void;
  
  // Contexte des événements
  evenements: Evenement[];
  setEvenements: React.Dispatch<React.SetStateAction<Evenement[]>>;
  addEvenement: (evenement: Omit<Evenement, "id">) => void;
  resolveEvenement: (id: string, optionId: string) => void;
  
  // Contexte des élections
  elections: Election[];
  setElections: React.Dispatch<React.SetStateAction<Election[]>>;
  scheduleElection: (magistrature: MagistratureType, year: number, season: Season) => string;
  
  // Contexte de l'histoire
  histoireEntries: HistoireEntry[];
  setHistoireEntries: React.Dispatch<React.SetStateAction<HistoireEntry[]>>;
  addHistoireEntry: (entry: Omit<HistoireEntry, "id">) => void;
  
  // Contexte des lois
  lois: Loi[];
  setLois: React.Dispatch<React.SetStateAction<Loi[]>>;
  addLoi: (loi: Loi) => void;
  
  // Contexte d'équilibrage
  equilibre: Equilibre | null;
  setEquilibre: React.Dispatch<React.SetStateAction<Equilibre | null>>;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  
  // Contexte des clients
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  addClient: (client: ClientCreationData) => string;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  assignClientToSenateur: (clientId: string, senateurId: string | null) => void;
  adjustCompetencePoints: (clientId: string, points: number) => void;
  updateSpecialAbilities: (clientId: string, abilities: string[]) => void;
  filterClients: (clients: Client[], filter: ClientFilter) => Client[];
  sortClients: (clients: Client[], sort: ClientSort) => Client[];
  changeClientStatus: (clientId: string, status: 'active' | 'inactive' | 'probation') => void;
  
  // Contexte de l'économie
  economieRecords: EconomieRecord[];
  setEconomieRecords: React.Dispatch<React.SetStateAction<EconomieRecord[]>>;
  treasury: TreasuryStatus;
  setTreasury: React.Dispatch<React.SetStateAction<TreasuryStatus>>;
  economicFactors: EconomicFactors;
  setEconomicFactors: React.Dispatch<React.SetStateAction<EconomicFactors>>;
  addEconomieRecord: (data: EconomieCreationData) => string;
  updateEconomieRecord: (id: string, updates: Partial<EconomieCreationData>) => void;
  deleteEconomieRecord: (id: string) => void;
  
  // Contexte de date
  currentDate: GameDate;
  setCurrentDate: React.Dispatch<React.SetStateAction<GameDate>>;
  currentYear: number;
  currentSeason: Season;
  currentPhase: GamePhase;
  
  // Méthodes utilitaires
  advanceTime: (newSeason?: Season) => void;
  changePhase: (phase: GamePhase) => void;
}
