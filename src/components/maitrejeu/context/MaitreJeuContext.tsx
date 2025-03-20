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
  initialPhase,
  initialClients,
  initialEconomieRecords,
  initialTreasury,
  initialEconomicFactors,
  initialFamilles,
  initialMembres,
  initialAlliances,
  initialMariages,
  initialRelations
} from './initialState';
import { createSenateurOperations } from './senateurOperations';
import { createProvinceOperations } from './provinceOperations';
import { createEvenementOperations } from './evenementOperations';
import { createElectionOperations } from './electionOperations';
import { createHistoireOperations } from './histoireOperations';
import { createLoiOperations } from './loiOperations';
import { createEquilibreOperations } from './equilibreOperations';
import { createTimeOperations } from './timeOperations';
import { createClientOperations } from './clientOperations';
import { createEconomieOperations } from './economieOperations';
import { createFamilleOperations } from './familleOperations';
import { Season } from '@/utils/timeSystem';

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
  const [equilibre, setEquilibre] = useState(initialEquilibre as any); // Utiliser any temporairement pour éviter l'erreur
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentPhase, setCurrentPhase] = useState(initialPhase);
  const [clients, setClients] = useState(initialClients);
  const [economieRecords, setEconomieRecords] = useState(initialEconomieRecords);
  const [treasury, setTreasury] = useState(initialTreasury);
  const [economicFactors, setEconomicFactors] = useState(initialEconomicFactors);
  
  // États pour les familles
  const [familles, setFamilles] = useState(initialFamilles);
  const [membres, setMembres] = useState(initialMembres);
  const [alliances, setAlliances] = useState(initialAlliances);
  const [mariages, setMariages] = useState(initialMariages);
  const [relations, setRelations] = useState(initialRelations);

  // Calcul des valeurs dérivées
  const currentYear = currentDate.year;
  const currentSeason = currentDate.season as Season;

  // Opérations
  const senateurOps = createSenateurOperations(setSenateurs);
  const provinceOps = createProvinceOperations(setProvinces);
  const evenementOps = createEvenementOperations(setEvenements);
  const electionOps = createElectionOperations(setElections);
  const histoireOps = createHistoireOperations(setHistoireEntries);
  const loiOps = createLoiOperations(setLois);
  const equilibreOps = createEquilibreOperations(setEquilibre);
  const timeOps = createTimeOperations(setCurrentDate, setCurrentPhase);
  const clientOps = createClientOperations(setClients);
  const economieOps = createEconomieOperations(setEconomieRecords);
  const familleOps = createFamilleOperations(
    setFamilles,
    setMembres,
    setAlliances,
    setMariages,
    setRelations
  );

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
    
    // Clients
    clients,
    setClients,
    ...clientOps,
    
    // Économie
    economieRecords,
    setEconomieRecords,
    treasury,
    setTreasury,
    economicFactors,
    setEconomicFactors,
    ...economieOps,
    
    // Familles
    familles,
    setFamilles,
    membres,
    setMembres,
    alliances,
    setAlliances,
    mariages,
    setMariages,
    relations,
    setRelations,
    ...familleOps,
    
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
