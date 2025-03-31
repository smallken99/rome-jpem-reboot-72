
import { GameDate } from './common';

export interface Province {
  id: string;
  nom: string;
  name?: string; // Alias anglais pour compatibilité
  région: string;
  region?: string; // Alias anglais pour compatibilité
  gouverneur?: string;
  governor?: string; // Alias anglais pour compatibilité
  population: number;
  richesse: number;
  ressources: string[];
  resources?: string[]; // Alias anglais pour compatibilité
  dateConquete?: GameDate;
  conqueredDate?: GameDate; // Alias anglais pour compatibilité
  stabilité: number;
  revenuAnnuel: number;
  garnison?: number;
  garrison?: number; // Alias anglais pour compatibilité
  tauxImposition?: number;
  taxRate?: number; // Alias anglais pour compatibilité
  mécontentement?: number;
  unrest?: number; // Alias anglais pour compatibilité
  romanisation?: number;
  romanization?: number; // Alias anglais pour compatibilité
  prospérité?: number;
  prosperity?: number; // Alias anglais pour compatibilité
  description?: string;
  statut: 'pacifiée' | 'instable' | 'rebelle';
}
