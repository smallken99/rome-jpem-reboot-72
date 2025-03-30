
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Character } from '@/types/character';
import { Equilibre, PoliticalEvent, HistoriqueEntry } from '@/types/equilibre';
import { GameDate, Season } from '@/utils/types/gameDate';
import { Evenement } from '../types/evenement';
import { SenateurJouable } from '../types/senateurs';

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
  deleteClient?: (id: string) => void;
  assignClientToSenateur?: (clientId: string, senateurId: string) => void;
  changeClientStatus?: (clientId: string, status: string) => void;
  updateClient?: (clientId: string, updates: any) => void;
  addClient?: (client: any) => string;
  clients?: any[];
  filterClients?: (search: string, filter: any) => any[];
  sortClients?: (clients: any[], sortBy: string, sortOrder: string) => any[];
  
  // Special abilities management
  updateSpecialAbilities?: (clientId: string, abilities: any) => void;
  adjustCompetencePoints?: (clientId: string, competence: string, amount: number) => void;
  
  // Commonly used year/season
  currentYear?: number;
  currentSeason?: Season;
}

// Create the context
const MaitreJeuContext = createContext<MaitreJeuContextType | undefined>(undefined);

// Create a provider component
export const MaitreJeuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [senateurs, setSenateurs] = useState<Character[]>([]);
  const [equilibre, setEquilibre] = useState<Equilibre>({
    politique: { populaires: 50, optimates: 50, moderates: 50 },
    economie: { stabilite: 50, croissance: 50, commerce: 50, agriculture: 50 },
    social: { plebeiens: 50, patriciens: 50, esclaves: 50, cohesion: 50 },
    militaire: { moral: 50, effectifs: 50, equipement: 50, discipline: 50 },
    religion: { piete: 50, traditions: 50, superstition: 50 }
  });
  const [currentDate, setCurrentDate] = useState<GameDate>({ year: 510, season: 'spring' });
  const [currentPhase, setCurrentPhase] = useState<string>('SETUP');
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [lois, setLois] = useState<any[]>([]);
  
  // Additional state
  const [provinces, setProvinces] = useState<any[]>([]);
  const [familles, setFamilles] = useState<any[]>([]);
  const [membres, setMembres] = useState<any[]>([]);
  const [alliances, setAlliances] = useState<any[]>([]);
  const [mariages, setMariages] = useState<any[]>([]);
  const [relations, setRelations] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [economieRecords, setEconomieRecords] = useState<any[]>([]);
  const [treasury, setTreasury] = useState<number>(1000000);
  const [economicFactors, setEconomicFactors] = useState<any>({});
  
  // Time management functions
  const advanceTime = () => {
    setCurrentDate(prev => {
      let newSeason: Season;
      let newYear = prev.year;
      
      switch (prev.season) {
        case 'winter':
          newSeason = 'spring';
          break;
        case 'spring':
          newSeason = 'summer';
          break;
        case 'summer':
          newSeason = 'fall';
          break;
        case 'fall':
          newSeason = 'winter';
          newYear += 1;
          break;
      }
      
      return { year: newYear, season: newSeason };
    });
  };
  
  const setDate = (date: GameDate) => {
    setCurrentDate(date);
  };
  
  // Calculate derived values
  const currentYear = currentDate.year;
  const currentSeason = currentDate.season;
  
  // Define context value
  const contextValue: MaitreJeuContextType = {
    senateurs,
    equilibre,
    currentDate,
    currentPhase,
    evenements,
    lois,
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
    advanceTime,
    setDate,
    setSenateurs,
    setEquilibre,
    setLois,
    setEvenements,
    currentYear,
    currentSeason
  };
  
  return (
    <MaitreJeuContext.Provider value={contextValue}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

// Create a hook to use the context
export const useMaitreJeu = (): MaitreJeuContextType => {
  const context = useContext(MaitreJeuContext);
  if (context === undefined) {
    throw new Error('useMaitreJeu must be used within a MaitreJeuProvider');
  }
  return context;
};
