import React, { createContext, useState, useContext } from 'react';
import { SenateurJouable, Province, Evenement, Loi, Election, HistoireEntry } from '../types';
import { Equilibre } from '../types/equilibre';
import { Client } from '../types/clients';
import { EconomieRecord, TreasuryStatus, EconomicFactors } from '../types/economie';
import { FamilleInfo } from '../types/familles';
import { GameDate, GamePhase } from '../types/common';
import { createEquilibreOperations } from './equilibreOperations';

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
  addFamille: (famille: FamilleInfo) => void;
  updateFamille: (famille: FamilleInfo) => void;
  deleteFamille: (id: string) => void;
  elections: Election[];
  addElection: (election: Election) => void;
  updateElection: (election: Election) => void;
  deleteElection: (id: string) => void;
  histoire: HistoireEntry[];
  addHistoireEntry: (entry: HistoireEntry) => void;
  updateHistoireEntry: (entry: HistoireEntry) => void;
  deleteHistoireEntry: (id: string) => void;
  currentYear: number;
  setCurrentYear: (year: number) => void;
  currentSeason: string;
  setCurrentSeason: (season: string) => void;
  currentPhase: GamePhase;
  setCurrentPhase: (phase: GamePhase) => void;
  treasury: TreasuryStatus;
  setTreasury: (treasury: TreasuryStatus) => void;
  economicFactors: EconomicFactors;
  setEconomicFactors: (factors: EconomicFactors) => void;
  equilibre: Equilibre;
  setEquilibre: (equilibre: Equilibre) => void;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  updateFactionBalance: (populares: number, optimates: number, moderates: number) => void;
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
  addFamille: () => {},
  updateFamille: () => {},
  deleteFamille: () => {},
  elections: [],
  addElection: () => {},
  updateElection: () => {},
  deleteElection: () => {},
  histoire: [],
  addHistoireEntry: () => {},
  updateHistoireEntry: () => {},
  deleteHistoireEntry: () => {},
  currentYear: 250,
  setCurrentYear: () => {},
  currentSeason: 'Ver',
  setCurrentSeason: () => {},
  currentPhase: 'normal',
  setCurrentPhase: () => {},
  treasury: { balance: 1000, income: 500, expenses: 300, surplus: 200 },
  setTreasury: () => {},
  economicFactors: { tradeRevenue: 100, provinceRevenue: 200, militaryExpense: 50, religiousCeremonyExpense: 20, publicWorksExpense: 30, adminExpense: 10, warSpoilsRevenue: 50 },
  setEconomicFactors: () => {},
  equilibre: {
    politique: { populares: 30, optimates: 40, moderates: 30 },
    populares: 30,
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
  },
  setEquilibre: () => {},
  updateEquilibre: () => {},
  updateFactionBalance: () => {}
});

export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [senateurs, setSenateurs] = useState<SenateurJouable[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [lois, setLois] = useState<Loi[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [economieRecords, setEconomieRecords] = useState<EconomieRecord[]>([]);
  const [familles, setFamilles] = useState<FamilleInfo[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [histoire, setHistoire] = useState<HistoireEntry[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(250);
  const [currentSeason, setCurrentSeason] = useState<string>('Ver');
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('normal');
  const [treasury, setTreasury] = useState<TreasuryStatus>({ balance: 1000, income: 500, expenses: 300, surplus: 200 });
  const [economicFactors, setEconomicFactors] = useState<EconomicFactors>({ tradeRevenue: 100, provinceRevenue: 200, militaryExpense: 50, religiousCeremonyExpense: 20, publicWorksExpense: 30, adminExpense: 10, warSpoilsRevenue: 50 });
  const [equilibre, setEquilibre] = useState<Equilibre>({
    politique: { populares: 30, optimates: 40, moderates: 30 },
    populares: 30,
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
  });

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

  const addFamille = (famille: FamilleInfo) => {
    setFamilles([...familles, famille]);
  };

  const updateFamille = (famille: FamilleInfo) => {
    setFamilles(familles.map(f => f.id === famille.id ? famille : f));
  };

  const deleteFamille = (id: string) => {
    setFamilles(familles.filter(f => f.id !== id));
  };

  const addElection = (election: Election) => {
    setElections([...elections, election]);
  };

  const updateElection = (election: Election) => {
    setElections(elections.map(e => e.id === election.id ? election : e));
  };

  const deleteElection = (id: string) => {
    setElections(elections.filter(e => e.id !== id));
  };

  const addHistoireEntry = (entry: HistoireEntry) => {
    setHistoire([...histoire, entry]);
  };

  const updateHistoireEntry = (entry: HistoireEntry) => {
    setHistoire(histoire.map(h => h.id === entry.id ? entry : h));
  };

  const deleteHistoireEntry = (id: string) => {
    setHistoire(histoire.filter(h => h.id !== id));
  };
  
  // Import and use the equilibre operations
  const { updateEquilibre, updateFactionBalance } = createEquilibreOperations(setEquilibre);
  
  // Add updateFactionBalance to the context value
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
    addFamille,
    updateFamille,
    deleteFamille,
    elections,
    addElection,
    updateElection,
    deleteElection,
    histoire,
    addHistoireEntry,
    updateHistoireEntry,
    deleteHistoireEntry,
    currentYear,
    setCurrentYear,
    currentSeason,
    setCurrentSeason,
    currentPhase,
    setCurrentPhase,
    treasury,
    setTreasury,
    economicFactors,
    setEconomicFactors,
    equilibre,
    setEquilibre,
    updateEquilibre,
    updateFactionBalance
  };
  
  return (
    <MaitreJeuContext.Provider value={contextValue}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

export const useMaitreJeu = () => useContext(MaitreJeuContext);
