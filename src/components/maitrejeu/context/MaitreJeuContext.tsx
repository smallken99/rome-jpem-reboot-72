
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
import { GameDate, Season } from '../types/common';

// Type du contexte
export interface MaitreJeuContextType {
  // Contexte des sénateurs
  senateurs: SenateurJouable[];
  setSenateurs: React.Dispatch<React.SetStateAction<SenateurJouable[]>>;
  
  // Contexte des provinces
  provinces: Province[];
  setProvinces: React.Dispatch<React.SetStateAction<Province[]>>;
  
  // Contexte des événements
  evenements: Evenement[];
  setEvenements: React.Dispatch<React.SetStateAction<Evenement[]>>;
  
  // Contexte des élections
  elections: Election[];
  setElections: React.Dispatch<React.SetStateAction<Election[]>>;
  
  // Contexte de l'histoire
  histoireEntries: HistoireEntry[];
  setHistoireEntries: React.Dispatch<React.SetStateAction<HistoireEntry[]>>;
  
  // Contexte des lois
  lois: Loi[];
  setLois: React.Dispatch<React.SetStateAction<Loi[]>>;
  
  // Contexte d'équilibrage
  equilibre: Equilibre | null;
  setEquilibre: React.Dispatch<React.SetStateAction<Equilibre | null>>;
  
  // Contexte de date
  currentDate: GameDate;
  setCurrentDate: React.Dispatch<React.SetStateAction<GameDate>>;
  
  // Méthodes utilitaires
  advanceTime: (newSeason?: Season) => void;
}

// Données initiales pour les sénateurs
const initialSenateurs: SenateurJouable[] = [
  {
    id: "1",
    nom: "Quintus Fabius",
    prenom: "Maximus",
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
    }
  },
  {
    id: "2",
    nom: "Marcus Porcius",
    prenom: "Cato",
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
    }
  },
  {
    id: "3",
    nom: "Publius Cornelius",
    prenom: "Scipio",
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
    }
  }
];

// Données initiales
const initialProvinces: Province[] = [];
const initialEvenements: Evenement[] = [];
const initialElections: Election[] = [];
const initialHistoireEntries: HistoireEntry[] = [];
const initialLois: Loi[] = [];
const initialEquilibre: Equilibre | null = null;
const initialDate: GameDate = { year: 632, season: "SPRING" };

// Création du contexte
const MaitreJeuContext = createContext<MaitreJeuContextType>({
  senateurs: initialSenateurs,
  setSenateurs: () => {},
  provinces: initialProvinces,
  setProvinces: () => {},
  evenements: initialEvenements,
  setEvenements: () => {},
  elections: initialElections,
  setElections: () => {},
  histoireEntries: initialHistoireEntries,
  setHistoireEntries: () => {},
  lois: initialLois,
  setLois: () => {},
  equilibre: initialEquilibre,
  setEquilibre: () => {},
  currentDate: initialDate,
  setCurrentDate: () => {},
  advanceTime: () => {},
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

  return (
    <MaitreJeuContext.Provider
      value={{
        senateurs,
        setSenateurs,
        provinces,
        setProvinces,
        evenements,
        setEvenements,
        elections,
        setElections,
        histoireEntries,
        setHistoireEntries,
        lois,
        setLois,
        equilibre,
        setEquilibre,
        currentDate,
        setCurrentDate,
        advanceTime,
      }}
    >
      {children}
    </MaitreJeuContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useMaitreJeu = () => useContext(MaitreJeuContext);

export default MaitreJeuContext;
