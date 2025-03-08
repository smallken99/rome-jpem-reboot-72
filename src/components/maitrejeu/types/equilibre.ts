
import { GameDate, ImportanceType } from './common';
import { Season } from '@/utils/timeSystem';

export interface Equilibre {
  population: number;
  armée: number;
  économie: number;
  morale: number;
  loyauté: number;
  patriciens: number;
  plébéiens: number;
  populares: number;
  optimates: number;
  neutrales: number;
  moderates?: number;
  plebeiens?: number;
  historique?: PoliticalEvent[];
}

export interface PoliticalEvent {
  id: string;
  date: GameDate;
  title: string;
  description: string;
  type: string;
  importance: ImportanceType;
  resolved?: boolean;
  // Données historiques (compatibilité)
  année?: number;
  saison?: Season;
  populaires?: number;
  optimates?: number;
  moderates?: number;
  plebeiens?: number;
  patriciens?: number;
  armée?: number;
  économie?: number;
  religion?: number;
  diplomatie?: number;
  // Nouvelles données
  impact?: {
    politique?: number;
    sociale?: number;
    economique?: number;
    militaire?: number;
  };
}
