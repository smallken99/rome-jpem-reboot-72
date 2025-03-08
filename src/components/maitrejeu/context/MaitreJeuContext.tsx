import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTimeStore } from '@/utils/timeSystem';
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
  Season,
  MagistratureType
} from '../types/index';
import { v4 as uuidv4 } from 'uuid';

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
  updateFactionBalance: (populaires: number, optimates: number, moderates: number) => void;
  
  provinces: Province[];
  addProvince: (province: Province) => void;
  updateProvince: (id: string, updates: Partial<Province>) => void;
  removeProvince: (id: string) => void;
  
  lois: Loi[];
  addLoi: (loi: Loi) => void;
  updateLoi: (id: string, updates: Partial<Loi>) => void;
  removeLoi: (id: string) => void;
  voteLoi: (id: string, vote: 'pour' | 'contre' | 'abstention') => void;
  
  evenements: Evenement[];
  addEvenement: (evenement: Evenement) => void;
  updateEvenement: (id: string, updates: Partial<Evenement>) => void;
  removeEvenement: (id: string) => void;
  resolveEvenement: (id: string, optionId: string) => void;
  
  senateurs: SenateurJouable[];
  addSenateur: (senateur: SenateurJouable) => void;
  updateSenateur: (id: string, updates: Partial<SenateurJouable>) => void;
  removeSenateur: (id: string) => void;
  assignSenateurToPlayer: (id: string, playerId: string) => void;
  
  histoireEntries: HistoireEntry[];
  addHistoireEntry: (histoireEntry: Omit<HistoireEntry, "id">) => void;
  updateHistoireEntry: (id: string, updates: Partial<HistoireEntry>) => void;
  removeHistoireEntry: (id: string) => void;
  
  gameState: {
    year: number;
    season: Season;
    phase: GamePhase;
  };
  setGameState: (updates: Partial<{ year: number; season: Season; phase: GamePhase }>) => void;
  
  // Pour compatibilité avec le code précédent
  currentYear: number;
  currentSeason: Season;
  currentPhase: GamePhase;
  advanceTime: () => void;
  changePhase: (phase: GamePhase) => void;
  
  // Elections
  elections: any[];
  scheduleElection: (magistrature: MagistratureType, year: number, season: Season) => void;
  
  // Méthodes de réinitialisation
  resetGameS0eason: () => void;
  resetGameYear: () => void;
  resetGamePhase: () => void;
}

// Création du contexte MaitreJeu avec une valeur par défaut
export const MaitreJeuContext = createContext<MaitreJeuContextType>({
  factions: [],
  addFaction: () => {},
  updateFaction: () => {},
  removeFaction: () => {},
  
  factionsPolitiques: [],
  addFactionPolitique: () => {},
  updateFactionPolitique: () => {},
  removeFactionPolitique: () => {},
  
  equilibre: {
    morale: 50,
    loyauté: 50,
    populaires: 35,
    optimates: 40,
    moderates: 25,
    armée: 10000,
    historique: []
  },
  updateEquilibre: () => {},
  updateFactionBalance: () => {},
  
  provinces: [],
  addProvince: () => {},
  updateProvince: () => {},
  removeProvince: () => {},
  
  lois: [],
  addLoi: () => {},
  updateLoi: () => {},
  removeLoi: () => {},
  voteLoi: () => {},
  
  evenements: [],
  addEvenement: () => {},
  updateEvenement: () => {},
  removeEvenement: () => {},
  resolveEvenement: () => {},
  
  senateurs: [],
  addSenateur: () => {},
  updateSenateur: () => {},
  removeSenateur: () => {},
  assignSenateurToPlayer: () => {},
  
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
  
  currentYear: 200,
  currentSeason: 'SPRING',
  currentPhase: 'ADMINISTRATION',
  advanceTime: () => {},
  changePhase: () => {},
  
  elections: [],
  scheduleElection: () => {},
  
  resetGameS0eason: () => {},
  resetGameYear: () => {},
  resetGamePhase: () => {},
});

// Hook personnalisé pour utiliser le contexte MaitreJeu
export const useMaitreJeu = () => useContext(MaitreJeuContext);

// Définition du provider MaitreJeu
export const MaitreJeuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Récupérer les données actuelles depuis timeSystem
  const timeSystem = useTimeStore();
  const currentSystemSeason = timeSystem.season;
  
  // Conversion du format de saison attendu par ce contexte
  const initialSeason = convertTimeSeasonToMaitreJeuSeason(currentSystemSeason);
  
  // Utilisez initialSeason au lieu d'une valeur codée en dur
  const [season, setSeason] = useState<Season>(initialSeason);
  const [year, setYear] = useState(timeSystem.year);
  const [phase, setPhase] = useState<GamePhase>('ADMINISTRATION');
  
  const [factions, setFactions] = useState<Faction[]>([]);
  const [factionsPolitiques, setFactionsPolitiques] = useState<FactionPolitique[]>([]);
  const [equilibre, setEquilibre] = useState<Equilibre>({
    morale: 50,
    loyauté: 50,
    populaires: 35,
    optimates: 40,
    moderates: 25,
    armée: 10000,
    historique: []
  });
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [lois, setLois] = useState<Loi[]>([]);
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [senateurs, setSenateurs] = useState<SenateurJouable[]>([]);
  const [histoireEntries, setHistoireEntries] = useState<HistoireEntry[]>([]);
  const [elections, setElections] = useState<any[]>([]);
  
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
    setFactionsPolitiques(factionsPolitiques.map(factionPolitique => 
      factionPolitique.id === id ? { ...factionPolitique, ...updates } : factionPolitique
    ));
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
  
  const voteLoi = (id: string, vote: 'pour' | 'contre' | 'abstention') => {
    setLois(lois.map(loi => {
      if (loi.id === id) {
        const updatedLoi = { ...loi };
        if (vote === 'pour') updatedLoi.votesPositifs++;
        else if (vote === 'contre') updatedLoi.votesNégatifs++;
        else updatedLoi.votesAbstention++;
        return updatedLoi;
      }
      return loi;
    }));
  };
  
  // Fonctions de gestion des événements
  const addEvenement = (evenement: Evenement) => {
    const eventWithId = evenement.id ? evenement : {
      ...evenement,
      id: uuidv4()
    };
    setEvenements([...evenements, eventWithId]);
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
  
  const assignSenateurToPlayer = (id: string, playerId: string) => {
    setSenateurs(senateurs.map(senateur => 
      senateur.id === id ? { ...senateur, playerId } : senateur
    ));
  };
  
  // Fonctions de gestion de l'histoire
  const addHistoireEntry = (histoireEntry: Omit<HistoireEntry, "id">) => {
    const newEntry = {
      ...histoireEntry,
      id: uuidv4()
    };
    setHistoireEntries([...histoireEntries, newEntry]);
  };
  
  const updateHistoireEntry = (id: string, updates: Partial<HistoireEntry>) => {
    setHistoireEntries(histoireEntries.map(histoireEntry => 
      histoireEntry.id === id ? { ...histoireEntry, ...updates } : histoireEntry
    ));
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

  // Synchronisation avec le système de temps global
  useEffect(() => {
    const systemSeason = timeSystem.season;
    const convertedSeason = convertTimeSeasonToMaitreJeuSeason(systemSeason);
    setSeason(convertedSeason);
    setYear(timeSystem.year);
  }, [timeSystem.season, timeSystem.year]);

  // Fonctions de réinitialisation
  const resetGameS0eason = () => {
    setSeason(initialSeason);
  };

  const resetGameYear = () => {
    setYear(200);
  };

  const resetGamePhase = () => {
    setPhase('ADMINISTRATION');
  };
  
  const updateFactionBalance = (populaires: number, optimates: number, moderates: number) => {
    updateEquilibre({ 
      morale: equilibre.morale,
      loyauté: equilibre.loyauté,
      armée: equilibre.armée,
      populaires, 
      optimates, 
      moderates 
    });
  };

  const advanceTime = () => {
    // Implémentez la logique d'avancement du temps ici
    const seasons: Season[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
    const currentSeasonIndex = seasons.indexOf(season);
    if (currentSeasonIndex === seasons.length - 1) {
      // C'est l'hiver, on passe à l'année suivante et au printemps
      setYear(year + 1);
      setSeason('SPRING');
    } else {
      // On passe à la saison suivante
      setSeason(seasons[currentSeasonIndex + 1] as Season);
    }
  };

  const changePhase = (newPhase: GamePhase) => setPhase(newPhase);

  const scheduleElection = (magistrature: MagistratureType, year: number, season: Season) => {
    const newElection = {
      id: uuidv4(),
      magistrature,
      date: { year, season },
      candidates: [],
      status: 'scheduled'
    };
    setElections([...elections, newElection]);
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
      voteLoi,
      evenements,
      addEvenement,
      updateEvenement,
      removeEvenement,
      resolveEvenement,
      senateurs,
      addSenateur,
      updateSenateur,
      removeSenateur,
      assignSenateurToPlayer,
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
      resetGameS0eason,
      resetGameYear,
      resetGamePhase,
      currentYear: year,
      currentSeason: season,
      currentPhase: phase,
      advanceTime,
      changePhase,
      elections,
      scheduleElection,
      updateFactionBalance,
    }}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

export default MaitreJeuContext;
