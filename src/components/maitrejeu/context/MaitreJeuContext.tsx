
import React, { createContext, useContext, useState } from 'react';
import { MaitreJeuContextType } from './types';
import {
  initialSenateurs,
  initialProvinces,
  initialEvenements,
  initialElections,
  initialHistoireEntries,
  initialLois,
  initialEquilibre,
  initialDate,
  initialPhase
} from './initialState';
import { createSenateurOperations } from './senateurOperations';
import { createProvinceOperations } from './provinceOperations';
import { createEvenementOperations } from './evenementOperations';
import { createElectionOperations } from './electionOperations';
import { createHistoireOperations } from './histoireOperations';
import { createLoiOperations } from './loiOperations';
import { createEquilibreOperations } from './equilibreOperations';
import { createTimeOperations } from './timeOperations';

// Création du contexte avec une valeur par défaut
const MaitreJeuContext = createContext<MaitreJeuContextType>({} as MaitreJeuContextType);

// Provider du contexte
export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // États
  const [senateurs, setSenateurs] = useState(initialSenateurs);
  const [provinces, setProvinces] = useState(initialProvinces);
  const [evenements, setEvenements] = useState(initialEvenements);
  const [elections, setElections] = useState(initialElections);
  const [histoireEntries, setHistoireEntries] = useState(initialHistoireEntries);
  const [lois, setLois] = useState(initialLois);
  const [equilibre, setEquilibre] = useState(initialEquilibre);
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentPhase, setCurrentPhase] = useState(initialPhase);

  // Calcul des valeurs dérivées
  const currentYear = currentDate.year;
  const currentSeason = currentDate.season;

  // Opérations
  const senateurOps = createSenateurOperations(setSenateurs);
  const provinceOps = createProvinceOperations(setProvinces);
  const evenementOps = createEvenementOperations(setEvenements);
  const electionOps = createElectionOperations(setElections);
  const histoireOps = createHistoireOperations(setHistoireEntries);
  const loiOps = createLoiOperations(setLois);
  const equilibreOps = createEquilibreOperations(setEquilibre);
  const timeOps = createTimeOperations(setCurrentDate, setCurrentPhase);

  const contextValue: MaitreJeuContextType = {
    // Sénateurs
    senateurs,
    setSenateurs,
    ...senateurOps,
    
    // Provinces
    provinces,
    setProvinces,
    ...provinceOps,
    
    // Événements
    evenements,
    setEvenements,
    ...evenementOps,
    
    // Élections
    elections,
    setElections,
    ...electionOps,
    
    // Histoire
    histoireEntries,
    setHistoireEntries,
    ...histoireOps,
    
    // Lois
    lois,
    setLois,
    ...loiOps,
    
    // Équilibre
    equilibre,
    setEquilibre,
    ...equilibreOps,
    
    // Date et phases
    currentDate,
    setCurrentDate,
    currentYear,
    currentSeason,
    currentPhase,
    ...timeOps
  };

  return (
    <MaitreJeuContext.Provider value={contextValue}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useMaitreJeu = () => useContext(MaitreJeuContext);

export default MaitreJeuContext;
