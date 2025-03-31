
import { GameDate } from './common';

export interface Client {
  id: string;
  name: string;
  age?: number;
  status?: 'active' | 'inactive' | 'probation';
  type: 'standard' | 'premium' | 'exclusive';
  subType?: string;
  location?: string;
  loyalty?: string | number;
  influence?: number;
  income?: number;
  cost?: number;
  assignedTo?: string | null;
  assignedToName?: string;
  description?: string;
  skills?: string[];
  origin?: string;
  occupation?: string;
  createdAt: string;
  notes?: string;
  lastInteraction?: GameDate | string;
  competences?: Record<string, number>;
  
  // Additional properties
  activeStatus?: 'active' | 'inactive' | 'probation';
  influences?: {
    political: number;
    popular: number;
    religious: number;
  };
  specialAbilities?: string[];
  backstory?: string;
  relationshipLevel?: number;
  assignedToSenateurId?: string | null;
}

export interface ClientCreationData {
  name: string;
  age?: number;
  status?: 'active' | 'inactive' | 'probation';
  type: 'standard' | 'premium' | 'exclusive';
  subType?: string;
  location?: string;
  loyalty?: string | number;
  influence?: number;
  income?: number;
  cost?: number;
  assignedTo?: string | null;
  assignedToName?: string;
  description?: string;
  skills?: string[];
  origin?: string;
  occupation?: string;
  notes?: string;
  competences?: Record<string, number>;
  
  // Additional properties
  influences?: {
    political: number;
    popular: number;
    religious: number;
  };
  specialAbilities?: string[];
  competencePoints?: number;
  backstory?: string;
  activeStatus?: 'active' | 'inactive' | 'probation';
  relationshipLevel?: number;
  lastInteraction?: string | GameDate;
  assignedToSenateurId?: string | null;
  recurring?: boolean;
  createdAt?: string;
}

export interface ClientFilter {
  searchTerm?: string;
  type?: 'all' | 'standard' | 'premium' | 'exclusive';
  status?: 'all' | 'active' | 'inactive' | 'probation';
  assignedTo?: 'all' | 'assigned' | 'unassigned' | string;
  minInfluence?: number;
  minLoyalty?: number;
  location?: string;
  loyalty?: string;
  assignedOnly?: boolean;
}

export interface ClientSort {
  field: keyof Client;
  direction: 'asc' | 'desc';
}

// Client related constants
export const CLIENT_TYPES = ['standard', 'premium', 'exclusive'];

export const CLIENT_LOCATIONS = [
  'Forum', 
  'Subura', 
  'Palatin', 
  'Aventin', 
  'Quirinal', 
  'Viminal', 
  'Esquilin', 
  'Caelius', 
  'Capitole', 
  'Champ de Mars'
];

export const CLIENT_LOYALTIES = ['faible', 'moyenne', 'forte', 'totale'];

export const CLIENT_STATUSES = ['active', 'inactive', 'probation'];

// This interface is used by some components
export interface ClientInfluence {
  political: number;
  popular: number;
  religious: number;
}

// Create a type for client types
export type ClientType = 'standard' | 'premium' | 'exclusive';
