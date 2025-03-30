
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Character } from '@/types/character';
import { Equilibre, PoliticalEvent, HistoriqueEntry } from '@/types/equilibre';
import { Evenement } from '@/types/evenement';
import { GameDate, Season } from '@/utils/types/gameDate';

export interface MaitreJeuContextType {
  currentDate: GameDate;
  gameTime: GameTime;
  characters: Character[];
  equilibre: Equilibre;
  evenements: Evenement[];
  historiqueEntries: HistoriqueEntry[];
  economieRecords: any[];
  treasury: {
    balance: number;
    income: number;
    expenses: number;
    surplus: number;
  };
  
  // Setters and updaters
  setCharacters: (characters: Character[]) => void;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  setEvenements: (evenements: Evenement[]) => void;
  addEvenement: (evenement: Evenement) => void;
  removeEvenement: (id: string) => void;
  setEquilibre: (equilibre: Equilibre) => void;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  addHistoriqueEntry: (entry: HistoriqueEntry) => void;
  setHistoriqueEntries: (entries: HistoriqueEntry[]) => void;
  setEconomieRecords: (records: any[]) => void;
  setTreasury: (treasury: any) => void;
  
  // Specialized handlers
  updateSocialValues: (values: { plebeiens: number; patriciens: number; esclaves: number; cohesion: number; }) => void;
  updateEconomieValues: (values: { stabilite: number; croissance: number; commerce: number; agriculture: number; }) => void;
  updatePolitiqueValues: (values: { populaires: number; optimates: number; moderates: number; }) => void;
  updateMilitaireValues: (values: { moral: number; effectifs: number; equipement: number; discipline: number; }) => void;
  updateReligionValues: (values: { piete: number; traditions: number; superstition: number; }) => void;
  
  // Senateurs
  senateurs: Character[];
  setSenateurs: (senateurs: Character[]) => void;
  
  // Lois
  lois: any[];
  setLois: (lois: any[]) => void;
}

export interface GameTime {
  year: number;
  season: Season;
  advanceSeason: () => void;
  setYear: (year: number) => void;
  setSeason: (season: Season) => void;
}

const initialDate: GameDate = {
  year: 705,
  season: 'spring'
};

const initialEquilibre: Equilibre = {
  politique: {
    populaires: 50,
    optimates: 50,
    moderates: 50
  },
  economie: {
    stabilite: 50,
    croissance: 50,
    commerce: 50,
    agriculture: 50
  },
  social: {
    plebeiens: 50,
    patriciens: 50,
    esclaves: 50,
    cohesion: 50
  },
  militaire: {
    moral: 50,
    effectifs: 50,
    equipement: 50,
    discipline: 50
  },
  religion: {
    piete: 50,
    traditions: 50,
    superstition: 50
  }
};

export const MaitreJeuContext = createContext<MaitreJeuContextType | null>(null);

export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState<GameDate>(initialDate);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [senateurs, setSenateurs] = useState<Character[]>([]);
  const [equilibre, setEquilibre] = useState<Equilibre>(initialEquilibre);
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [historiqueEntries, setHistoriqueEntries] = useState<HistoriqueEntry[]>([]);
  const [economieRecords, setEconomieRecords] = useState<any[]>([]);
  const [lois, setLois] = useState<any[]>([]);
  const [treasury, setTreasury] = useState({
    balance: 1000000,
    income: 150000,
    expenses: 120000,
    surplus: 30000
  });
  
  const gameTime: GameTime = {
    year: currentDate.year,
    season: currentDate.season,
    advanceSeason: () => {
      const seasons: Season[] = ['winter', 'spring', 'summer', 'fall'];
      const currentIndex = seasons.indexOf(currentDate.season);
      const nextIndex = (currentIndex + 1) % 4;
      
      if (nextIndex === 0) {
        // If moving from fall to winter, increment the year
        setCurrentDate({
          year: currentDate.year + 1,
          season: seasons[nextIndex]
        });
      } else {
        setCurrentDate({
          ...currentDate,
          season: seasons[nextIndex]
        });
      }
    },
    setYear: (year: number) => {
      setCurrentDate({
        ...currentDate,
        year
      });
    },
    setSeason: (season: Season) => {
      setCurrentDate({
        ...currentDate,
        season
      });
    }
  };
  
  const updateCharacter = (id: string, updates: Partial<Character>) => {
    setCharacters(prev => 
      prev.map(character => 
        character.id === id ? { ...character, ...updates } : character
      )
    );
  };
  
  const addEvenement = (evenement: Evenement) => {
    setEvenements(prev => [...prev, evenement]);
  };
  
  const removeEvenement = (id: string) => {
    setEvenements(prev => prev.filter(evenement => evenement.id !== id));
  };
  
  const updateEquilibre = (updates: Partial<Equilibre>) => {
    setEquilibre(prev => ({ ...prev, ...updates }));
  };
  
  const addHistoriqueEntry = (entry: HistoriqueEntry) => {
    setHistoriqueEntries(prev => [...prev, entry]);
  };
  
  const updateSocialValues = (values: { plebeiens: number; patriciens: number; esclaves: number; cohesion: number; }) => {
    setEquilibre(prev => ({
      ...prev,
      social: {
        ...prev.social,
        ...values
      }
    }));
  };
  
  const updateEconomieValues = (values: { stabilite: number; croissance: number; commerce: number; agriculture: number; }) => {
    setEquilibre(prev => ({
      ...prev,
      economie: {
        ...prev.economie,
        ...values
      }
    }));
  };
  
  const updatePolitiqueValues = (values: { populaires: number; optimates: number; moderates: number; }) => {
    setEquilibre(prev => ({
      ...prev,
      politique: {
        ...prev.politique,
        ...values
      }
    }));
  };
  
  const updateMilitaireValues = (values: { moral: number; effectifs: number; equipement: number; discipline: number; }) => {
    setEquilibre(prev => ({
      ...prev,
      militaire: {
        ...prev.militaire,
        ...values
      }
    }));
  };
  
  const updateReligionValues = (values: { piete: number; traditions: number; superstition: number; }) => {
    setEquilibre(prev => ({
      ...prev,
      religion: {
        ...prev.religion,
        ...values
      }
    }));
  };
  
  const value: MaitreJeuContextType = {
    currentDate,
    gameTime,
    characters,
    setCharacters,
    updateCharacter,
    equilibre,
    setEquilibre,
    updateEquilibre,
    evenements,
    setEvenements,
    addEvenement,
    removeEvenement,
    historiqueEntries,
    setHistoriqueEntries,
    addHistoriqueEntry,
    economieRecords,
    setEconomieRecords,
    treasury,
    setTreasury,
    updateSocialValues,
    updateEconomieValues,
    updatePolitiqueValues,
    updateMilitaireValues,
    updateReligionValues,
    senateurs,
    setSenateurs,
    lois,
    setLois
  };
  
  return (
    <MaitreJeuContext.Provider value={value}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

export const useMaitreJeu = () => {
  const context = useContext(MaitreJeuContext);
  if (!context) {
    throw new Error('useMaitreJeu must be used within a MaitreJeuProvider');
  }
  return context;
};
