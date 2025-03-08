
import { GameDate } from './common';

// Types pour les provinces
export interface Province {
  id: string;
  nom: string;
  gouverneur: string;
  région: string;
  region?: string; // Pour compatibilité
  population: number;
  status: 'pacifiée' | 'instable' | 'rebelle' | 'conquise' | 'en révolte';
  statut?: string; // Pour compatibilité
  description: string;
  richesse: number;
  loyauté: number;
  loyautéVariation?: number;
  ressources: string[];
  armée: {
    légions: number;
    auxiliaires: number;
    navires: number;
  };
  impôts: number;
  dernierEvenement?: string;
  position?: {
    x: number;
    y: number;
  };
}

export interface ProvinceEvent {
  id: string;
  provinceId: string;
  date: GameDate;
  type: 'rébellion' | 'guerre' | 'crise' | 'célébration' | 'pacification';
  description: string;
  résolu: boolean;
  conséquences?: string;
}

export interface Gouverneur {
  id: string;
  nom: string;
  provinceId: string;
  senateurId: string;
  début: GameDate;
  fin?: GameDate;
  actions: string[];
  succès: boolean[];
}

export interface ProvinceData {
  id: string;
  nom: string;
  histoire: string;
  population: {
    historique: { date: GameDate; valeur: number }[];
    actuelle: number;
  };
  économie: {
    historique: { date: GameDate; valeur: number }[];
    actuelle: number;
  };
  loyauté: {
    historique: { date: GameDate; valeur: number }[];
    actuelle: number;
  };
}

// Armées stationnées dans une province
export interface ArméeProvinciale {
  id: string;
  provinceId: string;
  légions: number;
  auxiliaires: number;
  navires: number;
  moral: number;
  commandant?: string;
}

// Interfaces pour les composants de l'UI
export interface ProvinceListProps {
  provinces: Province[];
  onViewProvince: (id: string) => void;
}
