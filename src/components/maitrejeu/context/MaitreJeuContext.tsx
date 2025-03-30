
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Character, SenateurJouable } from '@/types/character';
import { Equilibre, PoliticalEvent, HistoriqueEntry, EconomieRecord } from '@/types/equilibre';
import { GameDate, Season } from '@/utils/types/gameDate';
import { Evenement } from '../types/evenement';
import { initialState } from './initialState';

// Define the context type
export interface MaitreJeuContextType {
  // Base state properties
  senateurs: Character[];
  equilibre: Equilibre;
  currentDate: GameDate;
  currentPhase: string;
  evenements: Evenement[];
  lois: any[];
  
  // Additional properties used across components
  provinces: any[];
  familles: any[];
  membres: any[];
  alliances: any[];
  mariages: any[];
  relations: any[];
  clients: any[];
  economieRecords: any[];
  treasury: number;
  economicFactors: any;
  
  // Time management functions
  advanceTime: () => void;
  setDate: (date: GameDate) => void;
  
  // State update functions
  setSenateurs: (senateurs: Character[]) => void;
  setEquilibre: (equilibre: Equilibre) => void;
  setLois: (lois: any[]) => void;
  setEvenements: (evenements: Evenement[]) => void;
  
  // Client management functions
  deleteClient: (id: string) => void;
  assignClientToSenateur: (clientId: string, senateurId: string) => void;
  changeClientStatus: (clientId: string, status: string) => void;
  updateClient: (clientId: string, updates: any) => void;
  addClient: (client: any) => string;
  filterClients: (search: string, filter: any) => any[];
  sortClients: (clients: any[], sortBy: string, sortOrder: string) => any[];
  
  // Special abilities management
  updateSpecialAbilities: (clientId: string, abilities: any) => void;
  adjustCompetencePoints: (clientId: string, competence: string, amount: number) => void;
  
  // Commonly used year/season
  currentYear: number;
  currentSeason: Season;
  
  // Treasury management
  setTreasury: (amount: number) => void;
  updateTreasury: (amount: number) => void;
  setEconomieRecords: (records: EconomieRecord[]) => void;
}

// Create the context
const MaitreJeuContext = createContext<MaitreJeuContextType | undefined>(undefined);

// Create a provider component
export const MaitreJeuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [senateurs, setSenateurs] = useState<Character[]>(initialState.senateurs || []);
  const [equilibre, setEquilibre] = useState<Equilibre>(initialState.equilibre || {
    politique: { populaires: 50, optimates: 50, moderates: 50 },
    economie: { stabilite: 50, croissance: 50, commerce: 50, agriculture: 50 },
    social: { plebeiens: 50, patriciens: 50, esclaves: 50, cohesion: 50 },
    militaire: { moral: 50, effectifs: 50, equipement: 50, discipline: 50 },
    religion: { piete: 50, traditions: 50, superstition: 50 }
  });
  const [currentDate, setCurrentDate] = useState<GameDate>(initialState.currentDate || { year: 510, season: 'spring' });
  const [currentPhase, setCurrentPhase] = useState<string>(initialState.currentPhase || 'SETUP');
  const [evenements, setEvenements] = useState<Evenement[]>(initialState.evenements || []);
  const [lois, setLois] = useState<any[]>(initialState.lois || []);
  
  // Additional state
  const [provinces, setProvinces] = useState<any[]>(initialState.provinces || []);
  const [familles, setFamilles] = useState<any[]>(initialState.familles || []);
  const [membres, setMembres] = useState<any[]>(initialState.membres || []);
  const [alliances, setAlliances] = useState<any[]>(initialState.alliances || []);
  const [mariages, setMariages] = useState<any[]>(initialState.mariages || []);
  const [relations, setRelations] = useState<any[]>(initialState.relations || []);
  const [clients, setClients] = useState<any[]>(initialState.clients || []);
  const [economieRecords, setEconomieRecords] = useState<EconomieRecord[]>(initialState.economieRecords || []);
  const [treasury, setTreasury] = useState<number>(initialState.treasury || 0);
  const [economicFactors, setEconomicFactors] = useState<any>(initialState.economicFactors || {});

  // Alias pour faciliter l'accès aux valeurs courantes
  const currentYear = currentDate.year;
  const currentSeason = currentDate.season;
  
  // Time management functions
  const advanceTime = () => {
    setCurrentDate(prev => {
      let newSeason: Season;
      let newYear = prev.year;
      
      switch (prev.season) {
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
      }
      
      return { year: newYear, season: newSeason };
    });
  };
  
  const setDate = (date: GameDate) => {
    setCurrentDate(date);
  };
  
  // Client management functions
  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };
  
  const assignClientToSenateur = (clientId: string, senateurId: string) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, senateurId } : client
    ));
  };
  
  const changeClientStatus = (clientId: string, status: string) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, status } : client
    ));
  };
  
  const updateClient = (clientId: string, updates: any) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, ...updates } : client
    ));
  };
  
  const addClient = (client: any) => {
    const id = `client-${Date.now()}`;
    const newClient = { ...client, id };
    setClients(prev => [...prev, newClient]);
    return id;
  };
  
  const filterClients = (search: string, filters: any) => {
    let filtered = [...clients];
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchLower) ||
        client.description?.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters?.status) {
      filtered = filtered.filter(client => client.status === filters.status);
    }
    
    if (filters?.senateurId) {
      filtered = filtered.filter(client => client.senateurId === filters.senateurId);
    }
    
    return filtered;
  };
  
  const sortClients = (clientsList: any[], sortBy: string, sortOrder: string) => {
    return [...clientsList].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  // Compétences management
  const updateSpecialAbilities = (clientId: string, abilities: any) => {
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, specialAbilities: { ...(client.specialAbilities || {}), ...abilities } } 
        : client
    ));
  };
  
  const adjustCompetencePoints = (clientId: string, competence: string, amount: number) => {
    setClients(prev => prev.map(client => {
      if (client.id !== clientId) return client;
      
      const competences = { ...(client.competences || {}) };
      competences[competence] = (competences[competence] || 0) + amount;
      
      return { ...client, competences };
    }));
  };
  
  // Treasury management
  const updateTreasury = (amount: number) => {
    setTreasury(prev => prev + amount);
  };
  
  // Ajouter un événement
  const addEvenement = (evenement: Evenement) => {
    setEvenements(prev => [...prev, { ...evenement }]);
  };

  const value: MaitreJeuContextType = {
    // Base state
    senateurs,
    equilibre,
    currentDate,
    currentPhase,
    evenements,
    lois,
    
    // Additional state
    provinces,
    familles,
    membres,
    alliances,
    mariages,
    relations,
    clients,
    economieRecords,
    treasury,
    economicFactors,
    
    // Functions
    advanceTime,
    setDate,
    setSenateurs,
    setEquilibre,
    setLois,
    setEvenements,
    deleteClient,
    assignClientToSenateur,
    changeClientStatus,
    updateClient,
    addClient,
    filterClients,
    sortClients,
    updateSpecialAbilities,
    adjustCompetencePoints,
    
    // Commonly used values
    currentYear,
    currentSeason,
    
    // Treasury management
    setTreasury,
    updateTreasury,
    setEconomieRecords
  };

  return (
    <MaitreJeuContext.Provider value={value}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

// Custom hook for using the context
export const useMaitreJeu = () => {
  const context = useContext(MaitreJeuContext);
  if (context === undefined) {
    throw new Error('useMaitreJeu must be used within a MaitreJeuProvider');
  }
  return context;
};
