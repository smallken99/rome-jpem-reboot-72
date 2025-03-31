
import { GameDate } from './common';

// Type pour une entrée historique d'équilibre
export interface HistoriqueEntry {
  date: string;
  event?: string;
  values: Record<string, number>;
  timestamp?: number;
}

// Type pour un facteur de risque
export type RiskType = 'political' | 'economic' | 'military' | 'social' | 'religious' | string;

export interface Risk {
  id: string;
  type: RiskType;
  name: string;
  description: string;
  severity: number;
  createdAt: string | Date;
  active: boolean;
  impact: Record<string, number>;
}

// Structure d'un événement politique
export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: string | Date;
  type: string;
  importance: ImportanceType;
  impact?: Record<string, number>;
}

export type ImportanceType = 'low' | 'medium' | 'high' | 'critical' | string;

// Structure principale de l'équilibre
export interface Equilibre {
  // Politique
  politique: {
    populaires: number;
    optimates: number;
    moderates: number;
  };
  // Alias pour la compatibilité
  populaires: number;
  populares: number;
  optimates: number;
  moderates: number;

  // Économie
  economie: number;
  economy: number;
  économie: number;
  economicStability: number;
  
  // Économie détaillée
  economieDetailed: {
    stabilite: number;
    croissance: number;
    commerce: number;
    agriculture: number;
  };

  // Social
  social: {
    plebeiens: number;
    patriciens: number;
    esclaves: number;
    cohesion: number;
    plébéiens?: number;
  };
  plebeiens: number;
  plébéiens: number;
  patriciens: number;

  // Militaire
  militaire: {
    moral: number;
    effectifs: number;
    equipement: number;
    discipline: number;
  };

  // Religion
  religion: number;
  religionDetailed: {
    piete: number;
    traditions: number;
    superstition: number;
  };

  // Divers facteurs de stabilité
  stability: number;
  armée: number;
  loyauté: number;
  morale: number;
  facteurJuridique: number;

  // Historique des changements
  historique: HistoriqueEntry[];
  risques: Risk[];

  // Pour la compatibilité avec le code existant
  political?: {
    populares: number;
    optimates: number;
    moderates: number;
  };
}

// Type d'interface pour l'adaptateur d'équilibre
export interface EquilibreAdapter {
  normalizeEquilibre: (data: any) => Equilibre;
  getEconomicStability: (data: any) => number;
  getReligionStability: (data: any) => number;
  getPoliticalEvents: (data: any) => PoliticalEvent[];
}
