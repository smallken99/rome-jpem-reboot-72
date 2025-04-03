import React, { createContext, useState, useContext } from 'react';
import { SenateurJouable, Province, Evenement, Loi, Election, HistoireEntry } from '../types';
import { Equilibre } from '../types/equilibre';
import { Client } from '../types/clients';
import { EconomieRecord, TreasuryStatus, EconomicFactors } from '../types/economie';
import { FamilleInfo, MembreFamille } from '../types/familles';
import { GameDate, GamePhase, Season } from '../types/common';
import { createEquilibreOperations } from './equilibreOperations';
import { normalizeEquilibre } from '../utils/equilibreAdapter';

export interface MaitreJeuContextType {
  senateurs: SenateurJouable[];
  setSenateurs: (senateurs: SenateurJouable[]) => void;
  provinces: Province[];
  setProvinces: (provinces: Province[]) => void;
  evenements: Evenement[];
  addEvenement: (evenement: Evenement) => void;
  updateEvenement: (evenement: Evenement) => void;
  deleteEvenement: (id: string) => void;
  lois: Loi[];
  addLoi: (loi: Loi) => void;
  updateLoi: (loi: Loi) => void;
  deleteLoi: (id: string) => void;
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  economieRecords: EconomieRecord[];
  addEconomieRecord: (record: EconomieRecord) => void;
  updateEconomieRecord: (record: EconomieRecord) => void;
  deleteEconomieRecord: (id: string) => void;
  familles: FamilleInfo[];
  membres: MembreFamille[];
  alliances: any[];
  mariages: any[];
  relations: any[];
  updateAlliance: (id: string, updates: any) => void;
  updateFamille: (famille: FamilleInfo) => void;
  deleteFamille: (id: string) => void;
  histoireEntries: HistoireEntry[];
  addHistoireEntry: (entry: HistoireEntry) => void;
  updateHistoireEntry: (entry: HistoireEntry) => void;
  deleteHistoireEntry: (id: string) => void;
  currentYear: number;
  setCurrentYear: (year: number) => void;
  currentSeason: Season;
  setCurrentSeason: (season: Season) => void;
  currentPhase: GamePhase;
  setCurrentPhase: (phase: GamePhase) => void;
  currentDate: GameDate;
  treasury: TreasuryStatus;
  setTreasury: (treasury: TreasuryStatus) => void;
  economicFactors: EconomicFactors;
  setEconomicFactors: (factors: EconomicFactors) => void;
  equilibre: Equilibre;
  setEquilibre: (equilibre: Equilibre) => void;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  updateFactionBalance: (populaires: number, optimates: number, moderates: number) => void;
  advanceTime: (newSeason?: Season) => void;
  changePhase: (phase: GamePhase) => void;
  advancePhase: (phase?: GamePhase) => void;
  getFamille: (id: string) => FamilleInfo | undefined;
  getMembre: (id: string) => MembreFamille | undefined;
  getMembresByFamille: (familleId: string) => MembreFamille[];
  getAlliances: () => any[];
  updateProvince: (id: string, updates: Partial<Province>) => void;
}

export const MaitreJeuContext = createContext<MaitreJeuContextType>({
  senateurs: [],
  setSenateurs: () => {},
  provinces: [],
  setProvinces: () => {},
  evenements: [],
  addEvenement: () => {},
  updateEvenement: () => {},
  deleteEvenement: () => {},
  lois: [],
  addLoi: () => {},
  updateLoi: () => {},
  deleteLoi: () => {},
  clients: [],
  addClient: () => {},
  updateClient: () => {},
  deleteClient: () => {},
  economieRecords: [],
  addEconomieRecord: () => {},
  updateEconomieRecord: () => {},
  deleteEconomieRecord: () => {},
  familles: [],
  membres: [],
  alliances: [],
  mariages: [],
  relations: [],
  updateAlliance: () => {},
  updateFamille: () => {},
  deleteFamille: () => {},
  histoireEntries: [],
  addHistoireEntry: () => {},
  updateHistoireEntry: () => {},
  deleteHistoireEntry: () => {},
  currentYear: 250,
  setCurrentYear: () => {},
  currentSeason: 'Ver' as Season,
  setCurrentSeason: () => {},
  currentPhase: 'normal' as GamePhase,
  setCurrentPhase: () => {},
  currentDate: { year: 250, season: 'Ver' as Season },
  treasury: { balance: 1000, income: 500, expenses: 300, surplus: 200 },
  setTreasury: () => {},
  economicFactors: { tradeRevenue: 100, provinceRevenue: 200, militaryExpense: 50, religiousCeremonyExpense: 20, publicWorksExpense: 30, adminExpense: 10, warSpoilsRevenue: 50 },
  setEconomicFactors: () => {},
  equilibre: normalizeEquilibre({
    politique: { populaires: 30, optimates: 40, moderates: 30 },
    populaires: 30,
    populares: 30,
    optimates: 40,
    moderates: 30,
    economie: { stabilite: 70, croissance: 60, commerce: 80, agriculture: 50 },
    social: { plebeiens: 60, patriciens: 40, esclaves: 20, cohesion: 70 },
    plébéiens: 60,
    patriciens: 40,
    militaire: { moral: 80, effectifs: 70, equipement: 60, discipline: 90 },
    religion: { piete: 70, traditions: 80, superstition: 50 },
    stability: 75,
    armée: 80,
    loyauté: 70,
    morale: 60,
    facteurJuridique: 85,
    historique: [],
    risques: {}
  }),
  setEquilibre: () => {},
  updateEquilibre: () => {},
  updateFactionBalance: () => {},
  advanceTime: () => {},
  changePhase: () => {},
  advancePhase: () => {},
  getFamille: () => undefined,
  getMembre: () => undefined,
  getMembresByFamille: () => [],
  getAlliances: () => [],
  updateProvince: () => {}
});

export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [senateurs, setSenateurs] = useState<SenateurJouable[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [lois, setLois] = useState<Loi[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [economieRecords, setEconomieRecords] = useState<EconomieRecord[]>([]);
  const [familles, setFamilles] = useState<FamilleInfo[]>([]);
  const [membres, setMembres] = useState<MembreFamille[]>([]);
  const [alliances, setAlliances] = useState<any[]>([]);
  const [mariages, setMariages] = useState<any[]>([]);
  const [relations, setRelations] = useState<any[]>([]);
  const [histoireEntries, setHistoireEntries] = useState<HistoireEntry[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(250);
  const [currentSeason, setCurrentSeason] = useState<Season>('Ver');
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('normal');
  const [treasury, setTreasury] = useState<TreasuryStatus>({ balance: 1000, income: 500, expenses: 300, surplus: 200 });
  const [economicFactors, setEconomicFactors] = useState<EconomicFactors>({ tradeRevenue: 100, provinceRevenue: 200, militaryExpense: 50, religiousCeremonyExpense: 20, publicWorksExpense: 30, adminExpense: 10, warSpoilsRevenue: 50 });
  const [equilibre, setEquilibre] = useState<Equilibre>(normalizeEquilibre({
    politique: { populaires: 30, optimates: 40, moderates: 30 },
    populaires: 30,
    populares: 30, 
    optimates: 40,
    moderates: 30,
    economie: { stabilite: 70, croissance: 60, commerce: 80, agriculture: 50 },
    social: { plebeiens: 60, patriciens: 40, esclaves: 20, cohesion: 70 },
    plébéiens: 60,
    patriciens: 40,
    militaire: { moral: 80, effectifs: 70, equipement: 60, discipline: 90 },
    religion: { piete: 70, traditions: 80, superstition: 50 },
    stability: 75,
    armée: 80,
    loyauté: 70,
    morale: 60,
    facteurJuridique: 85,
    historique: [],
    risques: {}
  }));

  const currentDate: GameDate = { year: currentYear, season: currentSeason, phase: currentPhase };

  const addEvenement = (evenement: Evenement) => {
    setEvenements([...evenements, evenement]);
  };

  const updateEvenement = (evenement: Evenement) => {
    setEvenements(evenements.map(e => e.id === evenement.id ? evenement : e));
  };

  const deleteEvenement = (id: string) => {
    setEvenements(evenements.filter(e => e.id !== id));
  };

  const addLoi = (loi: Loi) => {
    setLois([...lois, loi]);
  };

  const updateLoi = (loi: Loi) => {
    setLois(lois.map(l => l.id === loi.id ? loi : l));
  };

  const deleteLoi = (id: string) => {
    setLois(lois.filter(l => l.id !== id));
  };

  const addClient = (client: Client) => {
    setClients([...clients, client]);
  };

  const updateClient = (client: Client) => {
    setClients(clients.map(c => c.id === client.id ? client : c));
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const addEconomieRecord = (record: EconomieRecord) => {
    setEconomieRecords([...economieRecords, record]);
  };

  const updateEconomieRecord = (record: EconomieRecord) => {
    setEconomieRecords(economieRecords.map(e => e.id === record.id ? record : e));
  };

  const deleteEconomieRecord = (id: string) => {
    setEconomieRecords(economieRecords.filter(e => e.id !== id));
  };

  const updateFamille = (famille: FamilleInfo) => {
    setFamilles(familles.map(f => f.id === famille.id ? famille : f));
  };

  const deleteFamille = (id: string) => {
    setFamilles(familles.filter(f => f.id !== id));
  };

  const addHistoireEntry = (entry: HistoireEntry) => {
    setHistoireEntries([...histoireEntries, entry]);
  };

  const updateHistoireEntry = (entry: HistoireEntry) => {
    setHistoireEntries(histoireEntries.map(h => h.id === entry.id ? entry : h));
  };

  const deleteHistoireEntry = (id: string) => {
    setHistoireEntries(histoireEntries.filter(h => h.id !== id));
  };
  
  const { updateEquilibre, updateFactionBalance } = createEquilibreOperations(setEquilibre);
  
  const advanceTime = (newSeason?: Season) => {
    if (newSeason) {
      setCurrentSeason(newSeason);
    } else {
      const seasons: Season[] = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
      const currentIndex = seasons.indexOf(currentSeason);
      const nextIndex = (currentIndex + 1) % seasons.length;
      
      if (nextIndex === 0) {
        setCurrentYear(currentYear + 1);
      }
      
      setCurrentSeason(seasons[nextIndex]);
    }
  };
  
  const changePhase = (phase: GamePhase) => {
    setCurrentPhase(phase);
  };

  const advancePhase = (phase?: GamePhase) => {
    if (phase) {
      changePhase(phase);
    } else {
      const phases: GamePhase[] = [
        GamePhase.NORMAL,
        GamePhase.SENATE,
        GamePhase.ECONOMY,
        GamePhase.MILITARY,
        GamePhase.EVENTS
      ];
      
      const currentPhaseIndex = phases.indexOf(currentPhase as GamePhase);
      const nextPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      
      changePhase(phases[nextPhaseIndex]);
    }
  };
  
  const getFamille = (id: string): FamilleInfo | undefined => {
    return familles.find(f => f.id === id);
  };
  
  const getMembre = (id: string): MembreFamille | undefined => {
    return membres.find(m => m.id === id);
  };
  
  const getMembresByFamille = (familleId: string): MembreFamille[] => {
    return membres.filter(m => m.familleId === familleId);
  };
  
  const getAlliances = () => {
    return alliances;
  };
  
  const updateAlliance = (id: string, updates: any) => {
    setAlliances(prev => 
      prev.map(alliance => 
        alliance.id === id ? { ...alliance, ...updates } : alliance
      )
    );
  };
  
  const updateProvince = (id: string, updates: Partial<Province>) => {
    setProvinces(provinces.map(province => 
      province.id === id ? { ...province, ...updates } : province
    ));
  };
  
  const senatorsCount = senateurs.length;
  const clientsCount = clients.length;
  
  const contextValue = {
    senateurs,
    setSenateurs,
    provinces,
    setProvinces,
    evenements,
    addEvenement,
    updateEvenement,
    deleteEvenement,
    lois,
    addLoi,
    updateLoi,
    deleteLoi,
    clients,
    addClient,
    updateClient,
    deleteClient,
    economieRecords,
    addEconomieRecord,
    updateEconomieRecord,
    deleteEconomieRecord,
    familles,
    membres,
    alliances,
    mariages,
    relations,
    updateAlliance,
    updateFamille,
    deleteFamille,
    histoireEntries,
    addHistoireEntry,
    updateHistoireEntry,
    deleteHistoireEntry,
    currentYear,
    setCurrentYear,
    currentSeason,
    setCurrentSeason,
    currentPhase,
    setCurrentPhase,
    currentDate,
    treasury,
    setTreasury,
    economicFactors,
    setEconomicFactors,
    equilibre,
    setEquilibre,
    updateEquilibre,
    updateFactionBalance,
    advanceTime,
    changePhase,
    advancePhase,
    getFamille,
    getMembre,
    getMembresByFamille,
    getAlliances,
    updateProvince,
    senatorsCount,
    clientsCount,
    removeClient: deleteClient,
    updateClientCompetences: (clientId: string, competences: string[]) => {
      const client = clients.find(c => c.id === clientId);
      if (client) {
        updateClient({
          ...client,
          competences
        });
      }
    },
    clientTypes: ['patron', 'client', 'ally', 'enemy', 'neutral']
  };
  
  return (
    <MaitreJeuContext.Provider value={contextValue}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

export const useMaitreJeu = () => useContext(MaitreJeuContext);
