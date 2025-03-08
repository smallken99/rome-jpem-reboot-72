
import { Season, GameDate, ImportanceType } from './common';

// Base types for political balance
export interface Equilibre {
  populaires: number;
  optimates: number;
  moderates: number;
  morale: number;      // Renamed from moral to morale for consistency
  loyauté: number;     // Using proper accented character
  armée: number;
  historique?: PoliticalEvent[];
  // Legacy properties for backward compatibility
  plebeiens?: number;
  patriciens?: number;
  économie?: number;
  religion?: number;
  diplomatie?: number;
}

export interface PoliticalEvent {
  id: string;
  date: GameDate;
  title: string;
  description: string;
  type: string;
  populaires?: number;
  optimates?: number;
  moderates?: number;
  plebeiens?: number;
  patriciens?: number;
  armée?: number;
  économie?: number;
  religion?: number;
  diplomatie?: number;
  // Legacy properties
  année?: number;
  saison?: Season;
}

// Props interfaces for components
export interface EquilibreChartProps {
  equilibre: Equilibre;
}

export interface PartisGraphProps {
  factions: { name: string; value: number; color: string }[];
  // Optional props for backward compatibility
  populaires?: number;
  optimates?: number;
  moderates?: number;
}

export interface PoliticalEventsTimelineProps {
  events: PoliticalEvent[];
}
