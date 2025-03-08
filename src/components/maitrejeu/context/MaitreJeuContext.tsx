<lov-codelov-code>
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTimeStore, getCurrentSeason, getCurrentYear, getCurrentDay } from '@/utils/timeSystem';
import { convertTimeSeasonToMaitreJeuSeason } from '@/components/maitrejeu/types/common';
import { 
  Faction, 
  FactionPolitique, 
  Equilibre, 
  Province, 
  Loi, 
  Evenement, 
  SenateurJouable, 
  HistoireEntry, 
  GamePhase,
  Season
} from '../types/index';

// Définition du type pour le contexte MaitreJeu
export interface MaitreJeuContextType {
  factions: Faction[];
  addFaction: (faction: Faction) => void;
  updateFaction: (id: string, updates: Partial<Faction>) => void;
  removeFaction: (id: string) => void;
  
  factionsPolitiques: FactionPolitique[];
  addFactionPolitique: (factionPolitique: FactionPolitique) => void;
  updateFactionPolitique: (id: string, updates: Partial<FactionPolitique>) => void;
  removeFactionPolitique: (id: string) => void;
  
  equilibre: Equilibre;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  
  provinces: Province[];
  addProvince: (province: Province) => void;
  updateProvince: (id: string, updates: Partial<Province>) => void;
  removeProvince: (id: string) => void;
  
  lois: Loi[];
  addLoi: (loi: Loi) => void;
  updateLoi: (id: string, updates: Partial<Loi>) => void;
  removeLoi: (id: string) => void;
  
  evenements: Evenement[];
  addEvenement: (evenement: Evenement) => void;
  updateEvenement: (id: string, updates: Partial<Evenement>) => void;
  removeEvenement: (id: string) => void;
  resolveEvenement: (id: string, optionId: string) => void;
  
  senateurs: SenateurJouable[];
  addSenateur: (senateur: SenateurJouable) => void;
  updateSenateur: (id: string, updates: Partial<SenateurJouable>) => void;
  removeSenateur: (id: string) => void;
  
  histoireEntries: HistoireEntry[];
  addHistoireEntry: (histoireEntry: HistoireEntry) => void;
  updateHistoireEntry: (id: string, updates: Partial<HistoireEntry>) => void;
  removeHistoireEntry: (id: string) => void;
  
  gameState: {
    year: number;
    season: Season;
    phase: GamePhase;
  };
  setGameState: (updates: Partial<{ year: number; season: Season; phase: GamePhase }>) => void;
  
  resetGameSeason: () => void;
  resetGameYear: () => void;
  resetGamePhase: () => void;
}

// Création du contexte MaitreJeu avec une valeur par défaut
const MaitreJeuContext = createContext<MaitreJeuContextType>({
  factions: [],
  addFaction: () => {},
  updateFaction: () => {},
  removeFaction: () => {},
  
  factionsPolitiques: [],
  addFactionPolitique: () => {},
  updateFactionPolitique: () => {},
  removeFactionPolitique: () => {},
  
  equilibre: {
    population: 1000000,
    armee: 10000,
    richesse: 1000000,
    moral: 50,
    loyalisme: 50
  },
  updateEquilibre: () => {},
  
  provinces: [],
  addProvince: () => {},
  updateProvince: () => {},
  removeProvince: () => {},
  
  lois: [],
  addLoi: () => {},
  updateLoi: () => {},
  removeLoi: () => {},
  
  evenements: [],
  addEvenement: () => {},
  updateEvenement: () => {},
  removeEvenement: () => {},
  resolveEvenement: () => {},
  
  senateurs: [],
  addSenateur: () => {},
  updateSenateur: () => {},
  removeSenateur: () => {},
  
  histoireEntries: [],
  addHistoireEntry: () => {},
  updateHistoireEntry: () => {},
  removeHistoireEntry: () => {},
  
  gameState: {
    year: 200,
    season: 'SPRING',
    phase: 'ADMINISTRATION'
  },
  setGameState: () => {},
  
  resetGameSeason: () => {},
  resetGameYear: () => {},
  resetGamePhase: () => {},
});

// Hook personnalisé pour utiliser le contexte MaitreJeu
export const useMaitreJeu = () => useContext(MaitreJeuContext);

// Définition du provider MaitreJeu
export const MaitreJeuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Récupérer la saison actuelle depuis timeSystem
  const currentSystemSeason = getCurrentSeason();
  // La convertir au format attendu par ce contexte
  const initialSeason = convertTimeSeasonToMaitreJeuSeason(currentSystemSeason);
  
  // Use initialSeason instead of a hardcoded value
  const [season, setSeason] = useState<Season>(initialSeason);
  const [year, setYear] = useState(getCurrentYear());
  const [phase, setPhase] = useState<GamePhase>('ADMINISTRATION');
  
  const [factions, setFactions] = useState<Faction[]>([]);
  const [factionsPolitiques, setFactionsPolitiques] = useState<FactionPolitique[]>([]);
  const [equilibre, setEquilibre] = useState<Equilibre>({
    population: 1000000,
    armee: 10000,
    richesse: 1000000,
    moral: 50,
    loyalisme: 50
  });
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [lois, setLois] = useState<Loi[]>([]);
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [senateurs, setSenateurs] = useState<SenateurJouable[]>([]);
  const [histoireEntries, setHistoireEntries] = useState<HistoireEntry[]>([]);
  
  // Fonctions de gestion des factions
  const addFaction = (faction: Faction) => {
    setFactions([...factions, faction]);
  };
  
  const updateFaction = (id: string, updates: Partial<Faction>) => {
    setFactions(factions.map(faction => faction.id === id ? { ...faction, ...updates } : faction));
  };
  
  const removeFaction = (id: string) => {
    setFactions(factions.filter(faction => faction.id !== id));
  };
  
  // Fonctions de gestion des factions politiques
  const addFactionPolitique = (factionPolitique: FactionPolitique) => {
    setFactionsPolitiques([...factionsPolitiques, factionPolitique]);
  };
  
  const updateFactionPolitique = (id: string, updates: Partial<FactionPolitique>) => {
    setFactionsPolitiques(factionsPolitiques.map(factionPolitique => factionPolitique.id === id ? { ...factionPolitique, ...updates } : factionPolitique));
  };
  
  const removeFactionPolitique = (id: string) => {
    setFactionsPolitiques(factionsPolitiques.filter(factionPolitique => factionPolitique.id !== id));
  };
  
  // Fonctions de gestion de l'équilibre
  const updateEquilibre = (updates: Partial<Equilibre>) => {
    setEquilibre({ ...equilibre, ...updates });
  };
  
  // Fonctions de gestion des provinces
  const addProvince = (province: Province) => {
    setProvinces([...provinces, province]);
  };
  
  const updateProvince = (id: string, updates: Partial<Province>) => {
    setProvinces(provinces.map(province => province.id === id ? { ...province, ...updates } : province));
  };
  
  const removeProvince = (id: string) => {
    setProvinces(provinces.filter(province => province.id !== id));
  };
  
  // Fonctions de gestion des lois
  const addLoi = (loi: Loi) => {
    setLois([...lois, loi]);
  };
  
  const updateLoi = (id: string, updates: Partial<Loi>) => {
    setLois(lois.map(loi => loi.id === id ? { ...loi, ...updates } : loi));
  };
  
  const removeLoi = (id: string) => {
    setLois(lois.filter(loi => loi.id !== id));
  };
  
  // Fonctions de gestion des événements
  const addEvenement = (evenement: Evenement) => {
    setEvenements([...evenements, evenement]);
  };
  
  const updateEvenement = (id: string, updates: Partial<Evenement>) => {
    setEvenements(evenements.map(evenement => evenement.id === id ? { ...evenement, ...updates } : evenement));
  };
  
  const removeEvenement = (id: string) => {
    setEvenements(evenements.filter(evenement => evenement.id !== id));
  };
  
  const resolveEvenement = (id: string, optionId: string) => {
    setEvenements(evenements.map(evenement => {
      if (evenement.id === id) {
        return { ...evenement, resolved: true, chosenOption: optionId };
      }
      return evenement;
    }));
  };
  
  // Fonctions de gestion des sénateurs
  const addSenateur = (senateur: SenateurJouable) => {
    setSenateurs([...senateurs, senateur]);
  };
  
  const updateSenateur = (id: string, updates: Partial<SenateurJouable>) => {
    setSenateurs(senateurs.map(senateur => senateur.id === id ? { ...senateur, ...updates } : senateur));
  };
  
  const removeSenateur = (id: string) => {
    setSenateurs(senateurs.filter(senateur => senateur.id !== id));
  };
  
  // Fonctions de gestion de l'histoire
  const addHistoireEntry = (histoireEntry: HistoireEntry) => {
    setHistoireEntries([...histoireEntries, { ...histoireEntry, id: Math.random().toString(36).substring(2, 15) }]);
  };
  
  const updateHistoireEntry = (id: string, updates: Partial<HistoireEntry>) => {
    setHistoireEntries(histoireEntries.map(histoireEntry => histoireEntry.id === id ? { ...histoireEntry, ...updates } : histoireEntry));
  };
  
  const removeHistoireEntry = (id: string) => {
    setHistoireEntries(histoireEntries.filter(histoireEntry => histoireEntry.id !== id));
  };
  
  // Fonction pour mettre à jour l'état du jeu (année, saison, phase)
  const setGameState = (updates: Partial<{ year: number; season: Season; phase: GamePhase }>) => {
    if (updates.year !== undefined) {
      setYear(updates.year);
    }
    if (updates.season !== undefined) {
      setSeason(updates.season);
    }
    if (updates.phase !== undefined) {
      setPhase(updates.phase);
    }
  };

  // Assurez-vous que les mises à jour de saison utilisent initialSeason ou le convertissent
  const resetGameSeason = () => {
    setSeason(initialSeason);
  };

  const resetGameYear = () => {
    setYear(200);
  };

  const resetGamePhase = () => {
    setPhase('ADMINISTRATION');
  };
  
  return (
    <MaitreJeuContext.Provider value={{
      factions,
      addFaction,
      updateFaction,
      removeFaction,
      factionsPolitiques,
      addFactionPolitique,
      updateFactionPolitique,
      removeFactionPolitique,
      equilibre,
      updateEquilibre,
      provinces,
      addProvince,
      updateProvince,
      removeProvince,
      lois,
      addLoi,
      updateLoi,
      removeLoi,
      evenements,
      addEvenement,
      updateEvenement,
      removeEvenement,
      resolveEvenement,
      senateurs,
      addSenateur,
      updateSenateur,
      removeSenateur,
      histoireEntries,
      addHistoireEntry,
      updateHistoireEntry,
      removeHistoireEntry,
      gameState: {
        year,
        season,
        phase
      },
      setGameState,
      resetGameSeason,
      resetGameYear,
      resetGamePhase
    }}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

// Export du contexte et du provider
export default MaitreJeuContext;
</lov-code>
