
import { 
  SenateurJouable, 
  Province, 
  Evenement, 
  Election, 
  HistoireEntry,
  Loi,
  Equilibre,
  FamilleInfo,
  MembreFamille,
  FamilleAlliance,
  MariageInfo,
  FamilleRelation,
  FamilleFilter,
  MembreFamilleFilter,
  FamilleCreationData,
  MembreFamilleCreationData
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
  
  // Contexte des familles
  familles: FamilleInfo[];
  setFamilles: React.Dispatch<React.SetStateAction<FamilleInfo[]>>;
  membres: MembreFamille[];
  setMembres: React.Dispatch<React.SetStateAction<MembreFamille[]>>;
  alliances: FamilleAlliance[];
  setAlliances: React.Dispatch<React.SetStateAction<FamilleAlliance[]>>;
  mariages: MariageInfo[];
  setMariages: React.Dispatch<React.SetStateAction<MariageInfo[]>>;
  relations: FamilleRelation[];
  setRelations: React.Dispatch<React.SetStateAction<FamilleRelation[]>>;
  
  // Opérations sur les familles
  addFamille: (familleData: FamilleCreationData) => string;
  updateFamille: (id: string, updates: Partial<FamilleInfo>) => void;
  deleteFamille: (id: string) => void;
  getFamille: (id: string) => FamilleInfo | undefined;
  getFamilles: () => FamilleInfo[];
  filterFamilles: (filter: FamilleFilter) => FamilleInfo[];
  
  // Opérations sur les membres
  addMembreFamille: (membreData: MembreFamilleCreationData) => string;
  updateMembreFamille: (id: string, updates: Partial<MembreFamille>) => void;
  deleteMembreFamille: (id: string) => void;
  getMembre: (id: string) => MembreFamille | undefined;
  getMembres: () => MembreFamille[];
  filterMembres: (filter: MembreFamilleFilter) => MembreFamille[];
  getFamilleOfMembre: (membreId: string) => FamilleInfo | undefined;
  getMembresByFamille: (familleId: string) => MembreFamille[];
  
  // Opérations sur les alliances
  createAlliance: (famille1Id: string, famille2Id: string, type: FamilleAlliance['type'], termes: string, benefices: string[]) => string;
  updateAlliance: (id: string, updates: Partial<FamilleAlliance>) => void;
  getAlliancesByFamille: (familleId: string) => FamilleAlliance[];
  getAlliances: () => FamilleAlliance[];
  
  // Opérations sur les mariages
  createMariage: (epouxId: string, epouseId: string, familleEpouxId: string, familleEpouseId: string, dot: number) => string;
  updateMariage: (id: string, updates: Partial<MariageInfo>) => void;
  getMariages: () => MariageInfo[];
  getMariagesByMembre: (membreId: string) => MariageInfo[];
  
  // Opérations sur les relations
  addRelation: (membre1Id: string, membre2Id: string, type: import('../types/familles').RelationType) => string;
  getRelations: () => FamilleRelation[];
  getRelationsByMembre: (membreId: string) => FamilleRelation[];
  
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
