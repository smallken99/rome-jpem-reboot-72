
import { GameDate } from './common';

export interface Province {
  id: string;
  nom: string;
  région: string;
  gouverneur?: string;
  population: number;
  richesse: number;
  ressources: string[];
  dateConquete?: GameDate;
  stabilité: number;
  revenuAnnuel: number;
  garnison?: number;
  tauxImposition?: number;
  mécontentement?: number;
  romanisation?: number;
  prospérité?: number;
  description?: string;
  statut: 'pacifiée' | 'instable' | 'rebelle';
  
  // English alias fields for compatibility
  name?: string;
  region?: string;
  governor?: string;
  resources?: string[];
  conqueredDate?: GameDate;
  stability?: number;
  annualRevenue?: number;
  garrison?: number;
  taxRate?: number;
  unrest?: number;
  romanization?: number;
  prosperity?: number;
  status?: 'pacifiée' | 'instable' | 'rebelle';
}
