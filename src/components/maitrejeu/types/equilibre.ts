
import { Season } from './common';

// Structure de l'équilibre
export interface Equilibre {
  plebeiens: number;
  patriciens: number;
  armée: number;
  économie: number;
  religion: number;
  diplomatie: number;
  populaires?: number;
  optimates?: number;
  moderates?: number;
  historique: {
    année: number;
    saison: Season;
    plebeiens: number;
    patriciens: number;
    armée: number;
    économie: number;
    religion: number;
    diplomatie: number;
    populaires?: number;
    optimates?: number;
    moderates?: number;
  }[];
}

// Props pour les composants liés à l'équilibre
export interface EquilibreChartProps {
  equilibre: Equilibre;
}

export interface PartisGraphProps {
  populaires?: number;
  optimates?: number;
  moderates?: number;
  factions?: { name: string; value: number; color: string; }[];
}
