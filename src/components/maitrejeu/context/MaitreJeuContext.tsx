
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Equilibre } from '@/types/equilibre';
import { Loi } from '@/components/maitrejeu/types/lois';
import { Evenement } from '@/types/evenement';
import { SenateurJouable } from '../types/senateurs';
import { initialState } from './initialState';
import { GamePhase, Season } from '../types/common';

interface MaitreJeuContextType {
  // État du jeu
  currentYear: number;
  currentSeason: Season;
  currentPhase: GamePhase;
  currentDate: { year: number; season: Season; day?: number };
  
  // Entités
  equilibre: Equilibre;
  senateurs: SenateurJouable[];
  provinces: any[];
  evenements: Evenement[];
  lois: Loi[];
  histoireEntries: any[];
  economieRecords: any[];
  familles: any[];
  membres: any[];
  alliances: any[];
  mariages: any[];
  relations: any[];
  clients: any[];
  treasury: number;
  economicFactors: any;
  
  // Actions
  advanceTime: () => void;
  changePhase: (phase: GamePhase) => void;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  updateFactionBalance: (populaires: number, optimates: number, moderates: number) => void;
  addEvenement: (evenement: Omit<Evenement, "id">) => void;
  resolveEvenement: (id: string, optionId: string) => void;
  addLoi: (loi: Omit<Loi, "id">) => void;
  voteLoi: (id: string, vote: 'pour' | 'contre' | 'abstention', count?: number) => void;
  updateSenateur: (id: string, updates: Partial<SenateurJouable>) => void;
  assignSenateurToPlayer: (senateurId: string, playerId: string) => void;
  updateProvince: (id: string, updates: any) => void;
  addHistoireEntry: (entry: any) => void;
  scheduleElection: (magistrature: string, year: number, season: Season) => string;
}

export const MaitreJeuContext = createContext<MaitreJeuContextType | null>(null);

export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState(initialState);
  
  // Implémentation des méthodes
  const advanceTime = () => {
    setState((prev) => {
      const nextSeason = getNextSeason(prev.currentSeason);
      const nextYear = nextSeason === 'spring' ? prev.currentYear + 1 : prev.currentYear;
      
      return {
        ...prev,
        currentYear: nextYear,
        currentSeason: nextSeason,
        currentDate: { year: nextYear, season: nextSeason }
      };
    });
  };
  
  const changePhase = (phase: GamePhase) => {
    setState((prev) => ({ ...prev, currentPhase: phase }));
  };
  
  const updateEquilibre = (updates: Partial<Equilibre>) => {
    setState((prev) => ({
      ...prev,
      equilibre: { ...prev.equilibre, ...updates }
    }));
  };
  
  const updateFactionBalance = (populaires: number, optimates: number, moderates: number) => {
    setState((prev) => ({
      ...prev,
      equilibre: {
        ...prev.equilibre,
        politique: { populaires, optimates, moderates, total: populaires + optimates + moderates }
      }
    }));
  };
  
  const addEvenement = (evenement: Omit<Evenement, "id">) => {
    const newEvenement = { ...evenement, id: `evt-${Date.now()}` } as Evenement;
    setState((prev) => ({
      ...prev,
      evenements: [...prev.evenements, newEvenement]
    }));
  };
  
  const resolveEvenement = (id: string, optionId: string) => {
    // Implémentation simplifiée
    setState((prev) => ({
      ...prev,
      evenements: prev.evenements.map(evt => 
        evt.id === id ? { ...evt, resolved: true, selectedOption: optionId } : evt
      )
    }));
  };
  
  const addLoi = (loi: Omit<Loi, "id">) => {
    const newLoi = { ...loi, id: `loi-${Date.now()}` } as Loi;
    setState((prev) => ({
      ...prev,
      lois: [...prev.lois, newLoi]
    }));
  };
  
  const voteLoi = (id: string, vote: 'pour' | 'contre' | 'abstention', count: number = 1) => {
    setState((prev) => ({
      ...prev,
      lois: prev.lois.map(loi => {
        if (loi.id !== id) return loi;
        
        const votesUpdate = {
          votesPositifs: vote === 'pour' ? loi.votesPositifs + count : loi.votesPositifs,
          votesNégatifs: vote === 'contre' ? loi.votesNégatifs + count : loi.votesNégatifs,
          votesAbstention: vote === 'abstention' ? loi.votesAbstention + count : loi.votesAbstention
        };
        
        return { ...loi, ...votesUpdate };
      })
    }));
  };
  
  const updateSenateur = (id: string, updates: Partial<SenateurJouable>) => {
    setState((prev) => ({
      ...prev,
      senateurs: prev.senateurs.map(sen => 
        sen.id === id ? { ...sen, ...updates } : sen
      )
    }));
  };
  
  const assignSenateurToPlayer = (senateurId: string, playerId: string) => {
    updateSenateur(senateurId, { playerId, joueur: playerId });
  };
  
  const updateProvince = (id: string, updates: any) => {
    setState((prev) => ({
      ...prev,
      provinces: prev.provinces.map(prov => 
        prov.id === id ? { ...prov, ...updates } : prov
      )
    }));
  };
  
  const addHistoireEntry = (entry: any) => {
    const newEntry = { ...entry, id: `hist-${Date.now()}` };
    setState((prev) => ({
      ...prev,
      histoireEntries: [...prev.histoireEntries, newEntry]
    }));
  };
  
  const scheduleElection = (magistrature: string, year: number, season: Season) => {
    const id = `election-${Date.now()}`;
    setState((prev) => ({
      ...prev,
      elections: [...prev.elections, { id, magistrature, year, season, candidates: [] }]
    }));
    return id;
  };
  
  const value: MaitreJeuContextType = {
    currentYear: state.currentYear,
    currentSeason: state.currentSeason,
    currentPhase: state.currentPhase,
    currentDate: { year: state.currentYear, season: state.currentSeason },
    equilibre: state.equilibre,
    senateurs: state.senateurs,
    provinces: state.provinces,
    evenements: state.evenements,
    lois: state.lois,
    histoireEntries: state.histoireEntries,
    economieRecords: state.economieRecords,
    familles: state.familles,
    membres: state.membres,
    alliances: state.alliances,
    mariages: state.mariages,
    relations: state.relations,
    clients: state.clients,
    treasury: state.treasury,
    economicFactors: state.economicFactors,
    advanceTime,
    changePhase,
    updateEquilibre,
    updateFactionBalance,
    addEvenement,
    resolveEvenement,
    addLoi,
    voteLoi,
    updateSenateur,
    assignSenateurToPlayer,
    updateProvince,
    addHistoireEntry,
    scheduleElection
  };
  
  return (
    <MaitreJeuContext.Provider value={value}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

// Utilitaire pour obtenir la saison suivante
const getNextSeason = (season: Season): Season => {
  switch (season) {
    case 'spring': return 'summer';
    case 'summer': return 'autumn';
    case 'autumn': return 'winter';
    case 'winter': return 'spring';
    default: return 'spring';
  }
};

// Hook personnalisé pour utiliser le contexte
export const useMaitreJeu = () => {
  const context = useContext(MaitreJeuContext);
  if (!context) {
    throw new Error('useMaitreJeu doit être utilisé à l\'intérieur d\'un MaitreJeuProvider');
  }
  return context;
};
