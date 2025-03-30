
import { createContext, useContext } from 'react';
import { Equilibre } from '@/types/equilibre';
import { SenateurJouable } from '../types/senateurs';

interface PoliticalContextType {
  equilibre: Equilibre;
  senateurs: SenateurJouable[];
  updateEquilibre: (newEquilibre: Partial<Equilibre>) => void;
  addSenateur: (senateur: SenateurJouable) => void;
  updateSenateur: (id: string, updates: Partial<SenateurJouable>) => void;
  removeSenateur: (id: string) => void;
}

export const PoliticalContext = createContext<PoliticalContextType>({
  equilibre: {
    politique: { populaires: 0, optimates: 0, moderates: 0 },
    economie: { stabilite: 0, croissance: 0, commerce: 0, agriculture: 0 },
    social: { plebeiens: 0, patriciens: 0, esclaves: 0, cohesion: 0 },
    militaire: { moral: 0, effectifs: 0, equipement: 0, discipline: 0 },
    religion: { piete: 0, traditions: 0, superstition: 0 }
  },
  senateurs: [],
  updateEquilibre: () => {},
  addSenateur: () => {},
  updateSenateur: () => {},
  removeSenateur: () => {}
});

export const usePolitical = () => useContext(PoliticalContext);
