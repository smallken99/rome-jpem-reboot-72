
import { Season, ImportanceType } from './common';

export interface PoliticalEvent {
  id: string;
  date: {
    year: number;
    season: Season;
  };
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
}

export interface Equilibre {
  morale?: number;
  loyauté?: number;
  populaires: number;
  optimates: number;
  moderates: number;
  armée: number;
  historique: PoliticalEvent[];
}

export interface EquilibreChartProps {
  equilibre: Equilibre;
}

export interface PartisGraphProps {
  factions: {
    name: string;
    value: number;
    color: string;
  }[];
}
