
import { GameDate } from './common';

export interface Province {
  id: string;
  nom: string;
  name?: string; // English alias for compatibility
  région: string;
  region?: string; // English alias for compatibility
  gouverneur?: string;
  governor?: string; // English alias for compatibility
  population: number;
  richesse: number;
  ressources: string[];
  resources?: string[]; // English alias for compatibility
  dateConquete?: GameDate;
  conqueredDate?: GameDate; // English alias for compatibility
  stabilité: number;
  revenuAnnuel: number;
  garnison?: number;
  garrison?: number; // English alias for compatibility
  tauxImposition?: number;
  taxRate?: number; // English alias for compatibility
  mécontentement?: number;
  unrest?: number; // English alias for compatibility
  romanisation?: number;
  romanization?: number; // English alias for compatibility
  prospérité?: number;
  prosperity?: number; // English alias for compatibility
  description?: string;
  statut: 'pacifiée' | 'instable' | 'rebelle';
  status?: 'pacifiée' | 'instable' | 'rebelle'; // English alias
}
