
import { GameDate } from './common';

export interface Client {
  id: string;
  nom: string;
  type: string;
  senateurId: string | null;
  location: string;
  loyalty: string;
  competences: string[];
  specialites: string[];
  influences: number;
  statut: string;
  dateAcquisition: GameDate;
  
  // Optional fields
  description?: string;
  origine?: string;
  capaciteSpeciale?: string;
  coût?: number;
  revenuAnnuel?: number;
  
  // English aliases
  name?: string;
  senator?: string;
  skills?: string[];
  specialties?: string[];
  status?: string;
  acquisitionDate?: GameDate;
  origin?: string;
  specialAbility?: string;
  cost?: number;
  annualIncome?: number;
}

export interface ClientCreationData {
  nom: string;
  type: string;
  senateurId: string | null;
  location: string;
  loyalty: string;
  competences: string[];
  specialites: string[];
  influences: number;
  statut: string;
  dateAcquisition: GameDate;
  description?: string;
  origine?: string;
  capaciteSpeciale?: string;
}

export interface ClientFilter {
  searchTerm: string;
  type?: string;
  senateurId?: string | null;
  assignedTo?: string | null;
  location?: string;
  loyalty?: string;
  minInfluence?: number;
  minLoyalty?: number;
  showUnassigned?: boolean;
}

export type ClientSort = {
  field: keyof Client;
  direction: 'asc' | 'desc';
};

// Constants for client properties
export const CLIENT_TYPES = ['standard', 'influent', 'élite', 'étranger', 'militaire'];
export const CLIENT_LOCATIONS = ['Rome', 'Italie', 'Provinces', 'Étranger'];
export const CLIENT_LOYALTIES = ['faible', 'moyenne', 'forte', 'indéfectible'];
export const CLIENT_STATUSES = ['active', 'inactive', 'probation'];
