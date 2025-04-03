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
  removeClient?: (id: string) => void;
  clientTypes?: string[];
  updateClientCompetences?: (clientId: string, competences: string[]) => void;
  economieRecords: EconomieRecord[];
  addEconomieRecord: (record: EconomieRecord) => void;
  updateEconomieRecord: (id: string, updates: Partial<EconomieRecord>) => void;
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
  addHistoireEntry: (entry: Omit<HistoireEntry, "id">) => void;
  treasury: TreasuryStatus;
  setTreasury: React.Dispatch<React.SetStateAction<TreasuryStatus>>;
  economicFactors: EconomicFactors;
  setEconomicFactors: React.Dispatch<React.SetStateAction<EconomicFactors>>;
  currentDate: GameDate;
  setCurrentDate: React.Dispatch<React.SetStateAction<GameDate>>;
  currentYear: number;
  currentSeason: Season;
  currentPhase: GamePhase;
  equilibre: Equilibre;
  setEquilibre: React.Dispatch<React.SetStateAction<Equilibre>>;
  
  // Extended methods
  updateProvince: (province: Province) => void;
  resolveEvenement: (id: string, optionId: string) => void;
  voteLoi: (id: string, vote: "pour" | "contre" | "abstention", count?: number) => void;
  advanceTime: (newSeason?: Season) => void;
  changePhase: (phase: GamePhase) => void;
  advancePhase: (phase?: GamePhase) => void;
  historique?: HistoireEntry[];
  addHistoriqueEntry?: (entry: Omit<HistoireEntry, "id">) => void;
  risques?: Record<string, any>;

  // Allow accessing counts directly
  senatorsCount?: number;
  clientsCount?: number;
}

// Create the context
const MaitreJeuContext = createContext<MaitreJeuContextType | null>(null);

// Provider component
export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Here we would have all the state variables and methods
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
    politique: { populares: 30, optimates: 40, moderates: 30 },
    optimates: 40,
    moderates: 30,
    economie: { stabilite: 70, croissance: 60, commerce: 80, agriculture: 50 },
    social: { plebeiens: 60, patriciens: 40, esclaves: 20, cohesion: 70 },
    militaire: { moral: 80, effectifs: 70, equipement: 60, discipline: 90, morale: 90, force: 85 },
    religion: { piete: 70, traditions: 80, superstition: 50 },
    stability: 75,
    armée: 80,
    loyauté: 70,
    morale: 60,
    facteurJuridique: 85,
    historique: [],
    risques: {}
  }));

  const currentDate: GameDate = { 
    year: currentYear, 
    season: currentSeason, 
    phase: currentPhase as GamePhase 
  };

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

  const updateEconomieRecord = (id: string, updates: Partial<EconomieRecord>) => {
    setEconomieRecords(economieRecords.map(e => e.id === id ? { ...e, ...updates } : e));
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

  const addHistoireEntry = (entry: Omit<HistoireEntry, "id">) => {
    const newEntry: HistoireEntry = {
      ...entry,
      id: `history-${Date.now()}`
    };
    setHistoireEntries([...histoireEntries, newEntry]);
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

  const advancePhase = (phase: GamePhase = GamePhase.NORMAL) => {
    console.log(`Advancing to phase: ${phase}`);
    // Update the current date's phase
    setCurrentDate(prevDate => ({
      ...prevDate,
      phase
    }));
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
  
  const createAlliance = (famille1Id, famille2Id, type, termes, benefices) => {
    const id = `alliance-${Date.now()}`;
    const newAlliance = { id, famille1Id, famille2Id, type, termes, benefices };
    setAlliances(prev => [...prev, newAlliance]);
    return id;
  };
  
  const addFamille = (familleData) => {
    const id = `famille-${Date.now()}`;
    const newFamille = { ...familleData, id };
    setFamilles(prev => [...prev, newFamille]);
    return id;
  };
  
  const addMembreFamille = (membreData) => {
    const id = `membre-${Date.now()}`;
    const newMembre = { ...membreData, id };
    setMembres(prev => [...prev, newMembre]);
    return id;
  };
  
  const updateMembreFamille = (id, updates) => {
    setMembres(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };
  
  const deleteMembreFamille = (id) => {
    setMembres(prev => prev.filter(m => m.id !== id));
  };
  
  const updateAlliance = (id: string, updates: any) => {
    setAlliances(prev => 
      prev.map(alliance => 
        alliance.id === id ? { ...alliance, ...updates } : alliance
      )
    );
  };
  
  const updateProvince = (province: Province) => {
    setProvinces(prev =>
      prev.map(p =>
        p.id === province.id ? province : p
      )
    );
  };
  
  const resolveEvenement = (id: string, optionId: string) => {
    setEvenements(prev =>
      prev.map(e =>
        e.id === id ? { ...e, resolved: true, chosenOption: optionId } : e
      )
    );
  };
  
  const voteLoi = (id: string, vote: "pour" | "contre" | "abstention", count: number = 1) => {
    setLois(prev =>
      prev.map(loi => {
        if (loi.id === id) {
          return {
            ...loi,
            votesPositifs: vote === "pour" ? (loi.votesPositifs || 0) + count : loi.votesPositifs,
            votesNégatifs: vote === "contre" ? (loi.votesNégatifs || 0) + count : loi.votesNégatifs,
            votesAbstention: vote === "abstention" ? (loi.votesAbstention || 0) + count : loi.votesAbstention
          };
        }
        return loi;
      })
    );
  };
  
  // Direct access to counts
  const senatorsCount = senateurs.length;
  const clientsCount = clients.length;
  
  return (
    <MaitreJeuContext.Provider
      value={{
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
        updateEconomieRecord: (id, updates) => {
          setEconomieRecords(prev =>
            prev.map(record =>
              record.id === id ? { ...record, ...updates } : record
            )
          );
        },
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
        createAlliance,
        addFamille,
        addMembreFamille,
        updateMembreFamille,
        deleteMembreFamille,
        senatorsCount,
        clientsCount,
        removeClient: deleteClient,
        clientTypes: ['patron', 'client', 'ally', 'enemy', 'neutral', 'standard'],
        updateClientCompetences: (clientId: string, competences: string[]) => {
          setClients(prev =>
            prev.map(client =>
              client.id === clientId ? { ...client, competences } : client
            )
          );
        },
        resolveEvenement,
        voteLoi
      }}
    >
      {children}
    </MaitreJeuContext.Provider>
  );
};

// Hook to use the context
export const useMaitreJeu = () => {
  const context = useContext(MaitreJeuContext);
  if (!context) {
    throw new Error('useMaitreJeu must be used within a MaitreJeuProvider');
  }
  return context;
};
