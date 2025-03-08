
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTimeStore, Season } from '@/utils/timeSystem';
import { 
  MaitreJeuContextType, 
  GameState, 
  Equilibre, 
  Evenement, 
  HistoireEntry, 
  Province, 
  Senateur, 
  Faction, 
  Election, 
  Loi 
} from '../types/maitreJeuTypes';

const MaitreJeuContext = createContext<MaitreJeuContextType | undefined>(undefined);

export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { year, season, dayInSeason, advanceTime: advanceTimeSystem } = useTimeStore();
  
  // États
  const [gameState, setGameState] = useState<GameState>({
    year,
    season,
    dayInSeason,
    gamePhase: 'VOTE_DES_LOIS',
  });
  
  const [equilibre, setEquilibre] = useState<Equilibre>({
    plebeiens: 50,
    patriciens: 50,
    armée: 50,
    religion: 50,
    économie: 50,
    diplomatie: 50,
  });
  
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [histoireEntries, setHistoireEntries] = useState<HistoireEntry[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [senateurs, setSenateurs] = useState<Senateur[]>([]);
  const [factions, setFactions] = useState<Faction[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [lois, setLois] = useState<Loi[]>([]);
  
  // Effet pour mettre à jour l'état du jeu lorsque le temps change
  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      year,
      season,
      dayInSeason
    }));
  }, [year, season, dayInSeason]);
  
  // Fonction pour faire avancer le temps du jeu
  const advanceTime = () => {
    advanceTimeSystem();
    
    // Vérifier les événements persistants et appliquer leurs effets
    evenements
      .filter(e => e.sourcePersistante && !e.résolu)
      .forEach(e => {
        if (e.impact) {
          modifyEquilibre(e.impact);
        }
      });
  };
  
  // Modifier l'équilibre
  const modifyEquilibre = (changes: Partial<Equilibre>) => {
    setEquilibre(prev => {
      const newEquilibre = { ...prev };
      
      // Appliquer les changements et s'assurer que les valeurs restent entre 0 et 100
      Object.entries(changes).forEach(([key, value]) => {
        if (key in prev && typeof value === 'number') {
          // Récupérer la clé typée correctement pour TypeScript
          const equilibreKey = key as keyof Equilibre;
          newEquilibre[equilibreKey] = Math.max(0, Math.min(100, prev[equilibreKey] + value));
        }
      });
      
      return newEquilibre;
    });
  };
  
  // Ajouter un événement
  const addEvenement = (evenement: Evenement) => {
    const newEvenement = {
      ...evenement,
      id: evenement.id || uuidv4()
    };
    
    setEvenements(prev => [...prev, newEvenement]);
    
    // Si l'événement a un impact immédiat, l'appliquer
    if (newEvenement.impact && !newEvenement.sourcePersistante) {
      modifyEquilibre(newEvenement.impact);
    }
  };
  
  // Résoudre un événement
  const resolveEvenement = (id: string) => {
    setEvenements(prev => 
      prev.map(e => 
        e.id === id 
          ? { ...e, résolu: true } 
          : e
      )
    );
  };
  
  // Ajouter une entrée dans l'histoire
  const addHistoireEntry = (entry: HistoireEntry) => {
    const newEntry = {
      ...entry,
      id: entry.id || uuidv4()
    };
    
    setHistoireEntries(prev => [...prev, newEntry]);
  };
  
  // Mettre à jour une entrée de l'histoire
  const updateHistoireEntry = (id: string, entry: Partial<HistoireEntry>) => {
    setHistoireEntries(prev => 
      prev.map(e => 
        e.id === id 
          ? { ...e, ...entry } 
          : e
      )
    );
  };
  
  // Supprimer une entrée de l'histoire
  const deleteHistoireEntry = (id: string) => {
    setHistoireEntries(prev => prev.filter(e => e.id !== id));
  };
  
  // Ajouter une province
  const addProvince = (province: Province) => {
    const newProvince = {
      ...province,
      id: province.id || uuidv4()
    };
    
    setProvinces(prev => [...prev, newProvince]);
  };
  
  // Mettre à jour une province
  const updateProvince = (id: string, province: Partial<Province>) => {
    setProvinces(prev => 
      prev.map(p => 
        p.id === id 
          ? { ...p, ...province } 
          : p
      )
    );
  };
  
  // Assigner un gouverneur à une province
  const assignGouverneur = (provinceId: string, senateurId: string) => {
    setProvinces(prev => 
      prev.map(p => 
        p.id === provinceId 
          ? { ...p, gouverneur: senateurId } 
          : p
      )
    );
  };
  
  // Ajouter un sénateur
  const addSenateur = (senateur: Senateur) => {
    const newSenateur = {
      ...senateur,
      id: senateur.id || uuidv4()
    };
    
    setSenateurs(prev => [...prev, newSenateur]);
  };
  
  // Mettre à jour un sénateur
  const updateSenateur = (id: string, senateur: Partial<Senateur>) => {
    setSenateurs(prev => 
      prev.map(s => 
        s.id === id 
          ? { ...s, ...senateur } 
          : s
      )
    );
  };
  
  // Assigner un sénateur à un joueur
  const assignSenateurToPlayer = (senateurId: string, playerId: string) => {
    setSenateurs(prev => 
      prev.map(s => 
        s.id === senateurId 
          ? { ...s, assignéJoueur: playerId } 
          : s
      )
    );
  };
  
  // Ajouter une faction
  const addFaction = (faction: Faction) => {
    const newFaction = {
      ...faction,
      id: faction.id || uuidv4()
    };
    
    setFactions(prev => [...prev, newFaction]);
  };
  
  // Mettre à jour une faction
  const updateFaction = (id: string, faction: Partial<Faction>) => {
    setFactions(prev => 
      prev.map(f => 
        f.id === id 
          ? { ...f, ...faction } 
          : f
      )
    );
  };
  
  // Ajouter une élection
  const addElection = (election: Election) => {
    const newElection = {
      ...election,
      id: election.id || uuidv4()
    };
    
    setElections(prev => [...prev, newElection]);
  };
  
  // Résoudre une élection
  const resolveElection = (id: string, gagnant: string) => {
    setElections(prev => 
      prev.map(e => 
        e.id === id 
          ? { ...e, résultat: gagnant } 
          : e
      )
    );
  };
  
  // Ajouter une loi
  const addLoi = (loi: Loi) => {
    const newLoi = {
      ...loi,
      id: loi.id || uuidv4()
    };
    
    setLois(prev => [...prev, newLoi]);
  };
  
  // Mettre à jour une loi
  const updateLoi = (id: string, loi: Partial<Loi>) => {
    setLois(prev => 
      prev.map(l => 
        l.id === id 
          ? { ...l, ...loi } 
          : l
      )
    );
  };
  
  // Voter une loi
  const voteLoi = (id: string, vote: 'pour' | 'contre' | 'abstention', count: number) => {
    setLois(prev => 
      prev.map(l => {
        if (l.id === id) {
          const votes = { ...l.votes };
          votes[vote] += count;
          return { ...l, votes };
        }
        return l;
      })
    );
  };
  
  // Contexte à exposer
  const contextValue: MaitreJeuContextType = {
    gameState,
    equilibre,
    evenements,
    histoireEntries,
    provinces,
    senateurs,
    factions,
    elections,
    lois,
    
    setGameState,
    advanceTime,
    modifyEquilibre,
    addEvenement,
    resolveEvenement,
    addHistoireEntry,
    updateHistoireEntry,
    deleteHistoireEntry,
    addProvince,
    updateProvince,
    assignGouverneur,
    addSenateur,
    updateSenateur,
    assignSenateurToPlayer,
    addFaction,
    updateFaction,
    addElection,
    resolveElection,
    addLoi,
    updateLoi,
    voteLoi
  };
  
  return (
    <MaitreJeuContext.Provider value={contextValue}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

// Hook pour utiliser le contexte MaitreJeu
export const useMaitreJeu = (): MaitreJeuContextType => {
  const context = useContext(MaitreJeuContext);
  
  if (context === undefined) {
    throw new Error('useMaitreJeu doit être utilisé dans un MaitreJeuProvider');
  }
  
  return context;
};
