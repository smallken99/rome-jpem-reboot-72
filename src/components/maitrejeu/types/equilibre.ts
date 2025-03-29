
import { GameDate } from './common';

export interface HistoriqueEntry {
  id: string;
  date: GameDate | Date;
  event: string;
  impact: number | Record<string, number>;
  type: string;
  description?: string;
}

export interface Equilibre {
  id: string;
  
  // Factions politiques
  political: {
    populaires: number;
    optimates: number; 
    moderates: number;
  };
  
  // Classes sociales
  social: {
    patriciens: number;
    plébéiens: number;
  };
  
  // Facteurs économiques et militaires
  economie: number;
  economy?: number; // Alias for economie
  économie?: number; // Alternative spelling
  stability: number;
  armée: number;
  loyauté: number;
  morale: number;
  
  // Facteurs structurels
  facteurSenat?: number;
  facteurMilitaire?: number;
  facteurPatriciens?: number;
  facteurPlebs?: number;
  facteurReligieux?: number;
  facteurJuridique: number;
  
  // Alias pour la rétrocompatibilité
  patriciens?: number;
  plébéiens?: number;
  populaires?: number;
  populares?: number; // Alias for populaires
  optimates?: number;
  moderates?: number;
  economicStability?: number; // Alias pour économie/economie
  
  // Facteurs religieux et autres
  religion: number;
  risques: RiskFactor[];
  historique: HistoriqueEntry[];
}

export interface RiskFactor {
  id: string;
  name: string;
  level: 'low' | 'medium' | 'high' | 'critical' | string;
  type: string;
  description: string;
  threat: number;
  active?: boolean;
  createdAt?: string | Date;
  resolvedAt?: string | Date;
}

export interface PoliticalEvent {
  id: string;
  date: GameDate;
  title: string;
  description: string;
  impact: number;
  type: string;
  resolved?: boolean;
}

export interface SocialStabilityCardProps {
  patriciens: number;
  plebeiens: number;
  onUpdate: (patriciens: number, plebeiens: number) => void;
  equilibre: Equilibre;
}

export interface PoliticalBalanceCardProps {
  populaires: number;
  optimates: number;
  moderates: number;
  onUpdate: (populaires: number, optimates: number, moderates: number) => void;
  equilibre: Equilibre;
}

export interface EconomicStabilityCardProps {
  economy: number;
  onUpdate: (economy: number) => void;
  equilibre: Equilibre;
}

export interface RecentEventsTableProps {
  events: PoliticalEvent[];
}
