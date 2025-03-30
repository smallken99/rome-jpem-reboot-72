
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Equilibre } from '@/types/equilibre';
import { SenateurJouable } from '../types/senateurs';
import { Evenement } from '../types/evenement';
import { GameDate, Season } from '@/utils/types/gameDate';
import { Loi } from '../types/lois';
import { Province } from '../types/provinces';
import { HistoireEntry } from '../types/histoire';
import { Election } from '../types/elections';
import { MaitreJeuContextType } from '../types/context';
import { initialEquilibre, initialSenateurs, initialEvenements, initialDate } from './initialState';

const MaitreJeuContext = createContext<MaitreJeuContextType | undefined>(undefined);

type GamePhase = 'normal' | 'election' | 'war' | 'crisis';

export const MaitreJeuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // État du jeu
  const [year, setYear] = useState<number>(initialDate.year);
  const [season, setSeason] = useState<Season>(initialDate.season);
  const [phase, setPhase] = useState<GamePhase>('normal');
  const [day, setDay] = useState<number>(1);
  
  // États des entités
  const [equilibre, setEquilibre] = useState<Equilibre>(initialEquilibre);
  const [senateurs, setSenateurs] = useState<SenateurJouable[]>(initialSenateurs);
  const [evenements, setEvenements] = useState<Evenement[]>(initialEvenements);
  const [lois, setLois] = useState<Loi[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [histoireEntries, setHistoireEntries] = useState<HistoireEntry[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [factions, setFactions] = useState<any[]>([]);

  // Actions
  const advanceTime = () => {
    let newDay = day + 1;
    let newSeason = season;
    let newYear = year;
    
    if (newDay > 90) {
      newDay = 1;
      
      // Avancer la saison
      switch (season) {
        case 'spring':
          newSeason = 'summer';
          break;
        case 'summer':
          newSeason = 'fall';
          break;
        case 'fall':
          newSeason = 'winter';
          break;
        case 'winter':
          newSeason = 'spring';
          newYear += 1;
          break;
      }
    }
    
    setDay(newDay);
    setSeason(newSeason);
    setYear(newYear);
  };
  
  const changePhase = (newPhase: GamePhase) => {
    setPhase(newPhase);
  };
  
  const updateEquilibre = (updates: Partial<Equilibre>) => {
    setEquilibre(prev => ({ ...prev, ...updates }));
  };
  
  const updateFactionBalance = (populaires: number, optimates: number, moderates: number) => {
    setEquilibre(prev => ({
      ...prev,
      politique: {
        ...prev.politique,
        populaires,
        optimates,
        moderates,
        total: populaires + optimates + moderates
      }
    }));
  };

  // Gestion des lois
  const addLoi = (loiData: Omit<Loi, "id">) => {
    const newLoi = {
      id: `loi-${Date.now()}`,
      ...loiData
    };
    setLois(prev => [...prev, newLoi]);
  };
  
  const voteLoi = (id: string, vote: 'pour' | 'contre' | 'abstention', count: number = 1) => {
    setLois(prev => prev.map(loi => {
      if (loi.id === id) {
        if (vote === 'pour') {
          return { ...loi, votesPositifs: (loi.votesPositifs || 0) + count };
        } else if (vote === 'contre') {
          return { ...loi, votesNégatifs: (loi.votesNégatifs || 0) + count };
        } else {
          return { ...loi, votesAbstention: (loi.votesAbstention || 0) + count };
        }
      }
      return loi;
    }));
  };

  // Gestion des élections
  const scheduleElection = (magistrature: string, year: number, season: Season) => {
    const newElection: Election = {
      id: `election-${Date.now()}`,
      magistrature,
      date: { year, season },
      candidats: [],
      resultat: null,
      statut: 'scheduled'
    };
    
    setElections(prev => [...prev, newElection]);
    return newElection.id;
  };

  // Gestion des événements
  const addEvenement = (evenementData: Omit<Evenement, "id">) => {
    const newEvenement = {
      id: `event-${Date.now()}`,
      ...evenementData
    };
    setEvenements(prev => [...prev, newEvenement]);
  };
  
  const resolveEvenement = (id: string, optionId: string) => {
    setEvenements(prev => prev.map(event => {
      if (event.id === id) {
        return { ...event, resolved: true };
      }
      return event;
    }));
  };

  // Gestion de l'historique
  const addHistoireEntry = (entryData: Omit<HistoireEntry, "id">) => {
    const newEntry = {
      id: `history-${Date.now()}`,
      ...entryData
    };
    setHistoireEntries(prev => [...prev, newEntry]);
  };

  // Gestion des provinces
  const updateProvince = (id: string, updates: Partial<Province>) => {
    setProvinces(prev => prev.map(province => {
      if (province.id === id) {
        return { ...province, ...updates };
      }
      return province;
    }));
  };

  // Gestion des sénateurs
  const updateSenateur = (id: string, updates: Partial<SenateurJouable>) => {
    setSenateurs(prev => prev.map(senateur => {
      if (senateur.id === id) {
        return { ...senateur, ...updates };
      }
      return senateur;
    }));
  };
  
  const assignSenateurToPlayer = (senateurId: string, playerId: string) => {
    setSenateurs(prev => prev.map(senateur => {
      if (senateur.id === senateurId) {
        return { 
          ...senateur, 
          playerId, 
          joueur: Boolean(playerId) 
        };
      }
      return senateur;
    }));
  };

  // Valeur de contexte
  const value: MaitreJeuContextType = {
    gameState: { year, season, phase, day },
    currentYear: year,
    currentSeason: season,
    currentPhase: phase,
    year,
    season,
    
    equilibre,
    lois,
    provinces,
    senateurs,
    evenements,
    histoireEntries,
    elections,
    factions,
    
    advanceTime,
    changePhase,
    updateEquilibre,
    updateFactionBalance,
    
    addLoi,
    voteLoi,
    scheduleElection,
    
    addEvenement,
    resolveEvenement,
    
    addHistoireEntry,
    
    updateProvince,
    
    updateSenateur,
    assignSenateurToPlayer
  };

  return <MaitreJeuContext.Provider value={value}>{children}</MaitreJeuContext.Provider>;
};

export const useMaitreJeu = () => {
  const context = useContext(MaitreJeuContext);
  if (context === undefined) {
    throw new Error('useMaitreJeu doit être utilisé à l\'intérieur d\'un MaitreJeuProvider');
  }
  return context;
};
