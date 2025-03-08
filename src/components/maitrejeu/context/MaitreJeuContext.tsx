
import React, { createContext, useContext, useState } from 'react';
import { 
  SenateurJouable, 
  Province, 
  Evenement, 
  Election, 
  HistoireEntry,
  Loi,
  Equilibre
} from '../types';
import { GameDate, Season, GamePhase } from '../types/common';
import { MagistratureType } from '../types/magistratures';
import { v4 as uuidv4 } from 'uuid';

// Type du contexte
export interface MaitreJeuContextType {
  // Contexte des sénateurs
  senateurs: SenateurJouable[];
  setSenateurs: React.Dispatch<React.SetStateAction<SenateurJouable[]>>;
  updateSenateur: (id: string, updates: Partial<SenateurJouable>) => void;
  assignSenateurToPlayer: (senateurId: string, playerId: string) => void;
  addSenateur: (senateur: Omit<SenateurJouable, "id">) => void;
  deleteSenateur: (id: string) => void;
  
  // Contexte des provinces
  provinces: Province[];
  setProvinces: React.Dispatch<React.SetStateAction<Province[]>>;
  updateProvince: (province: Province) => void;
  
  // Contexte des événements
  evenements: Evenement[];
  setEvenements: React.Dispatch<React.SetStateAction<Evenement[]>>;
  addEvenement: (evenement: Omit<Evenement, "id">) => void;
  resolveEvenement: (id: string, optionId: string) => void;
  
  // Contexte des élections
  elections: Election[];
  setElections: React.Dispatch<React.SetStateAction<Election[]>>;
  scheduleElection: (magistrature: MagistratureType, year: number, season: Season) => string;
  
  // Contexte de l'histoire
  histoireEntries: HistoireEntry[];
  setHistoireEntries: React.Dispatch<React.SetStateAction<HistoireEntry[]>>;
  addHistoireEntry: (entry: Omit<HistoireEntry, "id">) => void;
  
  // Contexte des lois
  lois: Loi[];
  setLois: React.Dispatch<React.SetStateAction<Loi[]>>;
  addLoi: (loi: Loi) => void;
  
  // Contexte d'équilibrage
  equilibre: Equilibre | null;
  setEquilibre: React.Dispatch<React.SetStateAction<Equilibre | null>>;
  updateEquilibre: (updates: Partial<Equilibre>) => void;
  
  // Contexte de date
  currentDate: GameDate;
  setCurrentDate: React.Dispatch<React.SetStateAction<GameDate>>;
  currentYear: number;
  currentSeason: Season;
  currentPhase: GamePhase;
  
  // Méthodes utilitaires
  advanceTime: (newSeason?: Season) => void;
  changePhase: (phase: GamePhase) => void;
}

// Données initiales pour les sénateurs
const initialSenateurs: SenateurJouable[] = [
  {
    id: "1",
    nom: "Fabius",
    prenom: "Quintus",
    gens: "Fabii",
    statut: "Patricien",
    age: 45,
    joueur: true,
    roles: ["Consul"],
    richesse: 50000,
    influence: 75,
    competences: {
      diplomatie: 8,
      guerre: 9,
      administration: 7,
      eloquence: 6
    },
    famille: "Fabii",
    fonction: "Consul",
    popularite: 70,
    appartenance: "Optimates"
  },
  {
    id: "2",
    nom: "Porcius",
    prenom: "Marcus",
    gens: "Porcii",
    statut: "Plébéien",
    age: 39,
    joueur: true,
    roles: ["Censeur"],
    richesse: 30000,
    influence: 65,
    competences: {
      diplomatie: 5,
      guerre: 6,
      administration: 9,
      eloquence: 8
    },
    famille: "Porcii",
    fonction: "Censeur",
    popularite: 60,
    appartenance: "Populares"
  },
  {
    id: "3",
    nom: "Cornelius",
    prenom: "Publius",
    gens: "Cornelii",
    statut: "Patricien",
    age: 42,
    joueur: false,
    roles: ["Préteur"],
    richesse: 45000,
    influence: 70,
    competences: {
      diplomatie: 7,
      guerre: 8,
      administration: 6,
      eloquence: 7
    },
    famille: "Cornelii",
    fonction: "Préteur",
    popularite: 55,
    appartenance: "Optimates"
  }
];

// Données initiales
const initialProvinces: Province[] = [];
const initialEvenements: Evenement[] = [];
const initialElections: Election[] = [];
const initialHistoireEntries: HistoireEntry[] = [];
const initialLois: Loi[] = [];
const initialEquilibre: Equilibre | null = {
  populares: 35,
  optimates: 40,
  moderates: 25,
  historique: []
};
const initialDate: GameDate = { year: 632, season: "SPRING" };

// Création du contexte
const MaitreJeuContext = createContext<MaitreJeuContextType>({
  senateurs: initialSenateurs,
  setSenateurs: () => {},
  updateSenateur: () => {},
  assignSenateurToPlayer: () => {},
  addSenateur: () => {},
  deleteSenateur: () => {},
  provinces: initialProvinces,
  setProvinces: () => {},
  updateProvince: () => {},
  evenements: initialEvenements,
  setEvenements: () => {},
  addEvenement: () => {},
  resolveEvenement: () => {},
  elections: initialElections,
  setElections: () => {},
  scheduleElection: () => "",
  histoireEntries: initialHistoireEntries,
  setHistoireEntries: () => {},
  addHistoireEntry: () => {},
  lois: initialLois,
  setLois: () => {},
  addLoi: () => {},
  equilibre: initialEquilibre,
  setEquilibre: () => {},
  updateEquilibre: () => {},
  currentDate: initialDate,
  setCurrentDate: () => {},
  currentYear: initialDate.year,
  currentSeason: initialDate.season,
  currentPhase: "POLITIQUE",
  advanceTime: () => {},
  changePhase: () => {},
});

// Provider du contexte
export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [senateurs, setSenateurs] = useState<SenateurJouable[]>(initialSenateurs);
  const [provinces, setProvinces] = useState<Province[]>(initialProvinces);
  const [evenements, setEvenements] = useState<Evenement[]>(initialEvenements);
  const [elections, setElections] = useState<Election[]>(initialElections);
  const [histoireEntries, setHistoireEntries] = useState<HistoireEntry[]>(initialHistoireEntries);
  const [lois, setLois] = useState<Loi[]>(initialLois);
  const [equilibre, setEquilibre] = useState<Equilibre | null>(initialEquilibre);
  const [currentDate, setCurrentDate] = useState<GameDate>(initialDate);
  const [currentPhase, setCurrentPhase] = useState<GamePhase>("POLITIQUE");

  // Calcul des valeurs dérivées
  const currentYear = currentDate.year;
  const currentSeason = currentDate.season;

  // Méthodes pour les sénateurs
  const updateSenateur = (id: string, updates: Partial<SenateurJouable>) => {
    setSenateurs(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const assignSenateurToPlayer = (senateurId: string, playerId: string) => {
    updateSenateur(senateurId, { playerId });
  };

  const addSenateur = (senateur: Omit<SenateurJouable, "id">) => {
    const newSenateur = {
      ...senateur,
      id: uuidv4()
    };
    setSenateurs(prev => [...prev, newSenateur as SenateurJouable]);
  };

  const deleteSenateur = (id: string) => {
    setSenateurs(prev => prev.filter(s => s.id !== id));
  };

  // Méthodes pour les provinces
  const updateProvince = (province: Province) => {
    setProvinces(prev => prev.map(p => p.id === province.id ? province : p));
  };

  // Méthodes pour les événements
  const addEvenement = (evenement: Omit<Evenement, "id">) => {
    const newEvenement = {
      ...evenement,
      id: uuidv4()
    };
    setEvenements(prev => [...prev, newEvenement as Evenement]);
  };

  const resolveEvenement = (id: string, optionId: string) => {
    setEvenements(prev => prev.map(e => {
      if (e.id === id) {
        return { ...e, resolved: true, selectedOptionId: optionId };
      }
      return e;
    }));
  };

  // Méthodes pour les élections
  const scheduleElection = (magistrature: MagistratureType, year: number, season: Season): string => {
    const election: Election = {
      id: uuidv4(),
      magistrature,
      date: { year, season },
      candidates: [],
      votes: {},
      winner: null
    };
    setElections(prev => [...prev, election]);
    return election.id;
  };

  // Méthodes pour l'histoire
  const addHistoireEntry = (entry: Omit<HistoireEntry, "id">) => {
    const newEntry = {
      ...entry,
      id: uuidv4()
    };
    setHistoireEntries(prev => [...prev, newEntry as HistoireEntry]);
  };

  // Méthodes pour les lois
  const addLoi = (loi: Loi) => {
    setLois(prev => [...prev, loi]);
  };

  // Méthodes pour l'équilibre
  const updateEquilibre = (updates: Partial<Equilibre>) => {
    setEquilibre(prev => prev ? { ...prev, ...updates } : updates as Equilibre);
  };

  // Fonction pour avancer le temps
  const advanceTime = (newSeason?: Season) => {
    setCurrentDate(prevDate => {
      if (newSeason) {
        return { ...prevDate, season: newSeason };
      }
      
      // Avancer à la saison suivante
      const seasons: Season[] = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];
      const currentIndex = seasons.indexOf(prevDate.season);
      const nextIndex = (currentIndex + 1) % 4;
      
      // Si on revient à SPRING, on avance l'année
      if (nextIndex === 0) {
        return { year: prevDate.year + 1, season: "SPRING" };
      } else {
        return { ...prevDate, season: seasons[nextIndex] };
      }
    });
  };

  // Fonction pour changer la phase
  const changePhase = (phase: GamePhase) => {
    setCurrentPhase(phase);
  };

  return (
    <MaitreJeuContext.Provider
      value={{
        senateurs,
        setSenateurs,
        updateSenateur,
        assignSenateurToPlayer,
        addSenateur,
        deleteSenateur,
        provinces,
        setProvinces,
        updateProvince,
        evenements,
        setEvenements,
        addEvenement,
        resolveEvenement,
        elections,
        setElections,
        scheduleElection,
        histoireEntries,
        setHistoireEntries,
        addHistoireEntry,
        lois,
        setLois,
        addLoi,
        equilibre,
        setEquilibre,
        updateEquilibre,
        currentDate,
        setCurrentDate,
        currentYear,
        currentSeason,
        currentPhase,
        advanceTime,
        changePhase,
      }}
    >
      {children}
    </MaitreJeuContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useMaitreJeu = () => useContext(MaitreJeuContext);

export default MaitreJeuContext;
