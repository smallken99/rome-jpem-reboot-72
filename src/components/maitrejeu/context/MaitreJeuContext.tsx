
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Equilibre } from '@/types/equilibre';
import { Evenement } from '../types/evenement';
import { GameDate } from '@/utils/types/gameDate';
import { FamilleInfo, MembreFamille, FamilleAlliance, MariageInfo, FamilleRelation } from '../types/familles';
import { SenateurJouable } from '@/types/character';

// Define game phase type
export type GamePhase = 'normal' | 'election' | 'crisis' | 'war' | 'POLITIQUE' | 'ECONOMIE' | 'SOCIAL' | 'MILITAIRE' | 'RELIGION';

// Define MaitreJeuContextType
export interface MaitreJeuContextType {
  senateurs: SenateurJouable[];
  setSenateurs: (senateurs: SenateurJouable[]) => void;
  
  provinces: any[];
  lois: any[];
  equilibre: Equilibre;
  currentPhase: GamePhase;
  
  // Date management
  currentDate: GameDate;
  updateDate: (date: GameDate) => void;
  advanceDate: () => void;
  
  // Events
  evenements: Evenement[];
  addEvenement: (evenement: Omit<Evenement, "id">) => void;
  updateEvenement: (id: string, evenement: Partial<Evenement>) => void;
  deleteEvenement: (id: string) => void;
  
  // Phase management
  setPhase: (phase: GamePhase) => void;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  
  // Family management
  familles: FamilleInfo[];
  membres: MembreFamille[];
  alliances: FamilleAlliance[];
  mariages: MariageInfo[];
  relations: FamilleRelation[];
  
  // Functions for family management
  addFamille: (famille: Omit<FamilleInfo, "id">) => string;
  updateFamille: (id: string, updates: Partial<FamilleInfo>) => void;
  deleteFamille: (id: string) => boolean;
  getFamille: (id: string) => FamilleInfo | undefined;
  
  // Member management
  addMembreFamille: (membre: Omit<MembreFamille, "id">) => string;
  updateMembreFamille: (id: string, updates: Partial<MembreFamille>) => void;
  deleteMembreFamille: (id: string) => boolean;
  getMembre: (id: string) => MembreFamille | undefined;
  getMembresByFamille: (familleId: string) => MembreFamille[];
  
  // Alliance management
  createAlliance: (alliance: Omit<FamilleAlliance, "id">) => string;
  updateAlliance: (id: string, updates: Partial<FamilleAlliance>) => void;
  deleteAlliance: (id: string) => boolean;
  getAlliances: (familleId?: string) => FamilleAlliance[];
  
  // Client management
  clients: any[];
  addClient: (client: any) => string;
  updateClient: (id: string, updates: any) => void;
  deleteClient: (id: string) => boolean;
  assignClientToSenateur: (clientId: string, senateurId: string) => void;
  changeClientStatus: (clientId: string, status: string) => void;
  filterClients: (filters: any) => any[];
  sortClients: (criteria: string) => any[];
  updateSpecialAbilities: (clientId: string, abilities: string[]) => void;
  adjustCompetencePoints: (clientId: string, competence: string, value: number) => void;
  
  // Economy management
  economieRecords: any[];
  treasury: number;
  economicFactors: any;
  setEconomieRecords: (records: any[]) => void;
  setTreasury: (amount: number) => void;
  setEconomicFactors: (factors: any) => void;
  addEconomieRecord: (record: any) => void;
  updateEconomieRecord: (id: string, updates: any) => void;
  deleteEconomieRecord: (id: string) => void;
  
  // Laws management
  setLois: (lois: any[]) => void;
}

// Create the context with default values
const MaitreJeuContext = createContext<MaitreJeuContextType>({
  senateurs: [],
  setSenateurs: () => {},
  provinces: [],
  lois: [],
  equilibre: {
    politique: { populaires: 0, optimates: 0, moderates: 0 },
    economie: { stabilite: 0, croissance: 0, commerce: 0, agriculture: 0 },
    social: { plebeiens: 0, patriciens: 0, esclaves: 0, cohesion: 0 },
    militaire: { moral: 0, effectifs: 0, equipement: 0, discipline: 0 },
    religion: { piete: 0, traditions: 0, superstition: 0 }
  },
  currentPhase: 'normal',
  currentDate: { year: 510, season: 'spring' },
  updateDate: () => {},
  advanceDate: () => {},
  evenements: [],
  addEvenement: () => {},
  updateEvenement: () => {},
  deleteEvenement: () => {},
  setPhase: () => {},
  updateEquilibre: () => {},
  familles: [],
  membres: [],
  alliances: [],
  mariages: [],
  relations: [],
  addFamille: () => "",
  updateFamille: () => {},
  deleteFamille: () => false,
  getFamille: () => undefined,
  addMembreFamille: () => "",
  updateMembreFamille: () => {},
  deleteMembreFamille: () => false,
  getMembre: () => undefined,
  getMembresByFamille: () => [],
  createAlliance: () => "",
  updateAlliance: () => {},
  deleteAlliance: () => false,
  getAlliances: () => [],
  clients: [],
  addClient: () => "",
  updateClient: () => {},
  deleteClient: () => false,
  assignClientToSenateur: () => {},
  changeClientStatus: () => {},
  filterClients: () => [],
  sortClients: () => [],
  updateSpecialAbilities: () => {},
  adjustCompetencePoints: () => {},
  economieRecords: [],
  treasury: 0,
  economicFactors: {},
  setEconomieRecords: () => {},
  setTreasury: () => {},
  setEconomicFactors: () => {},
  addEconomieRecord: () => {},
  updateEconomieRecord: () => {},
  deleteEconomieRecord: () => {},
  setLois: () => {}
});

// Provider component
export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State declarations
  const [senateurs, setSenateurs] = useState<SenateurJouable[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [lois, setLois] = useState<any[]>([]);
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('normal');
  const [currentDate, setCurrentDate] = useState<GameDate>({ year: 510, season: 'spring' });
  const [equilibre, setEquilibre] = useState<Equilibre>({
    politique: { populaires: 33, optimates: 33, moderates: 34 },
    economie: { stabilite: 50, croissance: 50, commerce: 50, agriculture: 50 },
    social: { plebeiens: 40, patriciens: 40, esclaves: 20, cohesion: 60 },
    militaire: { moral: 70, effectifs: 60, equipement: 65, discipline: 75 },
    religion: { piete: 80, traditions: 85, superstition: 70 }
  });
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  
  // Family state
  const [familles, setFamilles] = useState<FamilleInfo[]>([]);
  const [membres, setMembres] = useState<MembreFamille[]>([]);
  const [alliances, setAlliances] = useState<FamilleAlliance[]>([]);
  const [mariages, setMariages] = useState<MariageInfo[]>([]);
  const [relations, setRelations] = useState<FamilleRelation[]>([]);
  
  // Client state
  const [clients, setClients] = useState<any[]>([]);
  
  // Economy state
  const [economieRecords, setEconomieRecords] = useState<any[]>([]);
  const [treasury, setTreasury] = useState<number>(1000000);
  const [economicFactors, setEconomicFactors] = useState<any>({});

  // Function implementations
  const updateDate = (date: GameDate) => {
    setCurrentDate(date);
  };

  const advanceDate = () => {
    setCurrentDate(prevDate => {
      let newSeason: 'spring' | 'summer' | 'fall' | 'winter';
      let newYear = prevDate.year;
      
      switch (prevDate.season) {
        case 'winter':
          newSeason = 'spring';
          newYear += 1;
          break;
        case 'spring':
          newSeason = 'summer';
          break;
        case 'summer':
          newSeason = 'fall';
          break;
        case 'fall':
          newSeason = 'winter';
          break;
        default:
          newSeason = 'spring';
      }
      
      return { year: newYear, season: newSeason };
    });
  };

  const addEvenement = (evenementData: Omit<Evenement, "id">) => {
    const newEvenement: Evenement = {
      id: `evt-${Date.now()}`,
      ...evenementData
    };
    setEvenements(prev => [...prev, newEvenement]);
  };

  const updateEvenement = (id: string, updates: Partial<Evenement>) => {
    setEvenements(prev =>
      prev.map(evt => (evt.id === id ? { ...evt, ...updates } : evt))
    );
  };

  const deleteEvenement = (id: string) => {
    setEvenements(prev => prev.filter(evt => evt.id !== id));
  };

  const setPhase = (newPhase: GamePhase) => {
    setCurrentPhase(newPhase);
  };

  const updateEquilibre = (updates: Partial<Equilibre>) => {
    setEquilibre(prev => ({ ...prev, ...updates }));
  };

  // Family management functions
  const addFamille = (famille: Omit<FamilleInfo, "id">): string => {
    const id = `fam-${Date.now()}`;
    const newFamille = { id, ...famille };
    setFamilles(prev => [...prev, newFamille]);
    return id;
  };

  const updateFamille = (id: string, updates: Partial<FamilleInfo>) => {
    setFamilles(prev =>
      prev.map(fam => (fam.id === id ? { ...fam, ...updates } : fam))
    );
  };

  const deleteFamille = (id: string): boolean => {
    const familleExists = familles.some(fam => fam.id === id);
    if (familleExists) {
      setFamilles(prev => prev.filter(fam => fam.id !== id));
      return true;
    }
    return false;
  };

  const getFamille = (id: string): FamilleInfo | undefined => {
    return familles.find(fam => fam.id === id);
  };

  // Member management functions
  const addMembreFamille = (membre: Omit<MembreFamille, "id">): string => {
    const id = `mem-${Date.now()}`;
    const newMembre = { id, ...membre };
    setMembres(prev => [...prev, newMembre]);
    return id;
  };

  const updateMembreFamille = (id: string, updates: Partial<MembreFamille>) => {
    setMembres(prev =>
      prev.map(mem => (mem.id === id ? { ...mem, ...updates } : mem))
    );
  };

  const deleteMembreFamille = (id: string): boolean => {
    const membreExists = membres.some(mem => mem.id === id);
    if (membreExists) {
      setMembres(prev => prev.filter(mem => mem.id !== id));
      return true;
    }
    return false;
  };

  const getMembre = (id: string): MembreFamille | undefined => {
    return membres.find(mem => mem.id === id);
  };

  const getMembresByFamille = (familleId: string): MembreFamille[] => {
    return membres.filter(mem => mem.familleId === familleId);
  };

  // Alliance management functions
  const createAlliance = (alliance: Omit<FamilleAlliance, "id">): string => {
    const id = `all-${Date.now()}`;
    const newAlliance = { id, ...alliance };
    setAlliances(prev => [...prev, newAlliance]);
    return id;
  };

  const updateAlliance = (id: string, updates: Partial<FamilleAlliance>) => {
    setAlliances(prev =>
      prev.map(all => (all.id === id ? { ...all, ...updates } : all))
    );
  };

  const deleteAlliance = (id: string): boolean => {
    const allianceExists = alliances.some(all => all.id === id);
    if (allianceExists) {
      setAlliances(prev => prev.filter(all => all.id !== id));
      return true;
    }
    return false;
  };

  const getAlliances = (familleId?: string): FamilleAlliance[] => {
    if (!familleId) return alliances;
    return alliances.filter(
      all => all.famille1Id === familleId || all.famille2Id === familleId
    );
  };

  // Client management functions
  const addClient = (client: any): string => {
    const id = `cli-${Date.now()}`;
    const newClient = { id, ...client };
    setClients(prev => [...prev, newClient]);
    return id;
  };

  const updateClient = (id: string, updates: any) => {
    setClients(prev =>
      prev.map(cli => (cli.id === id ? { ...cli, ...updates } : cli))
    );
  };

  const deleteClient = (id: string): boolean => {
    const clientExists = clients.some(cli => cli.id === id);
    if (clientExists) {
      setClients(prev => prev.filter(cli => cli.id !== id));
      return true;
    }
    return false;
  };

  const assignClientToSenateur = (clientId: string, senateurId: string) => {
    updateClient(clientId, { senateurId });
  };

  const changeClientStatus = (clientId: string, status: string) => {
    updateClient(clientId, { status });
  };

  const filterClients = (filters: any): any[] => {
    return clients.filter(cli => {
      let match = true;
      for (const key in filters) {
        if (filters[key] && cli[key] !== filters[key]) {
          match = false;
          break;
        }
      }
      return match;
    });
  };

  const sortClients = (criteria: string): any[] => {
    return [...clients].sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
  };

  const updateSpecialAbilities = (clientId: string, abilities: string[]) => {
    updateClient(clientId, { abilities });
  };

  const adjustCompetencePoints = (clientId: string, competence: string, value: number) => {
    updateClient(clientId, { [competence]: value });
  };

  // Economy management functions
  const addEconomieRecord = (record: any) => {
    const newRecord = { id: `eco-${Date.now()}`, ...record };
    setEconomieRecords(prev => [...prev, newRecord]);
  };

  const updateEconomieRecord = (id: string, updates: any) => {
    setEconomieRecords(prev =>
      prev.map(rec => (rec.id === id ? { ...rec, ...updates } : rec))
    );
  };

  const deleteEconomieRecord = (id: string) => {
    setEconomieRecords(prev => prev.filter(rec => rec.id !== id));
  };

  const value = {
    senateurs,
    setSenateurs,
    provinces,
    lois,
    setLois,
    equilibre,
    currentPhase,
    currentDate,
    updateDate,
    advanceDate,
    evenements,
    addEvenement,
    updateEvenement,
    deleteEvenement,
    setPhase,
    updateEquilibre,
    familles,
    membres,
    alliances,
    mariages,
    relations,
    addFamille,
    updateFamille,
    deleteFamille,
    getFamille,
    addMembreFamille,
    updateMembreFamille,
    deleteMembreFamille,
    getMembre,
    getMembresByFamille,
    createAlliance,
    updateAlliance,
    deleteAlliance,
    getAlliances,
    clients,
    addClient,
    updateClient,
    deleteClient,
    assignClientToSenateur,
    changeClientStatus,
    filterClients,
    sortClients,
    updateSpecialAbilities,
    adjustCompetencePoints,
    economieRecords,
    treasury,
    economicFactors,
    setEconomieRecords,
    setTreasury,
    setEconomicFactors,
    addEconomieRecord,
    updateEconomieRecord,
    deleteEconomieRecord
  };

  return (
    <MaitreJeuContext.Provider value={value}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

// Custom hook for using the context
export const useMaitreJeu = () => useContext(MaitreJeuContext);
