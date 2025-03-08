
import { GameDate, Season } from './common';

export type ProvinceStatus = 'pacifiée' | 'instable' | 'rebelle' | 'conquise' | 'en révolte';

export interface Province {
  id: string;
  nom: string;
  région: string;
  region?: string; // Pour compatibilité
  gouverneur: string;
  population: number;
  status: ProvinceStatus;
  statut?: string; // Pour compatibilité
  description: string;
  resources: string[];
  richesse?: number;
  loyauté?: number;
  variationLoyauté?: number; // Remplace loyauteVariation
  territoire?: number;
  armée?: number;
  impôts?: number;
  dernierEvénement?: string; // Remplace lastEvent et dernierEvenement
  historiqueEvenements?: string[];
  dateConquete?: GameDate;
  position?: any; // Pour la carte
}

export interface ProvinceData {
  id: string;
  name: string;
  governor: string;
  region: string;
  population: number;
  status: ProvinceStatus;
  description: string;
  wealth?: number;
  loyalty?: number;
  territory?: number;
  army?: number;
  taxes?: number;
}
