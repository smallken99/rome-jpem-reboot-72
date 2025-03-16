
import { GameDate } from './common';

export interface EquilibreFactors {
  senat: number;
  plebs: number;
  patricians: number;
  military: number;
  religious: number;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: GameDate;
  year?: number; // Added for compatibility
  season?: string; // Added for compatibility
  faction?: string; // Added for compatibility
  importance?: 'majeure' | 'normale' | 'mineure'; // Added for compatibility
  impact: {
    populares?: number;
    optimates?: number;
    moderate?: number;
    senat?: number;
    plebs?: number;
    patricians?: number;
    military?: number;
    religious?: number;
    criminalityIndex?: number;
    economicStability?: number;
    population?: number;
  };
  type: 'political' | 'social' | 'military' | 'religious' | 'economic';
  resolved: boolean;
}

export interface Equilibre {
  // Basic factors
  facteurSenat: number;
  facteurPlebs: number;
  facteurPatriciens: number;
  facteurMilitaire: number;
  facteurReligieux: number;
  
  // Political alignment
  populaires: number;
  optimates: number;
  moderates: number;
  
  // Global city indicators
  population: number;
  criminalityIndex: number; // Main name
  indiceCrime: number; // Alternative name
  economicStability: number;
  foodSupply: number;
  publicOrder: number;
  
  // EquilibreBarChart properties
  armée?: number;
  économie?: number;
  morale?: number;
  loyauté?: number;
  patriciens?: number;
  plébéiens?: number;
  neutrales?: number;
  
  // Thresholds for unrest
  unrestThreshold: number;
  rebellionThreshold: number;
  
  // History of events
  historique: PoliticalEvent[];
  
  // Optional notes
  notes?: string;
}
