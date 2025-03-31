
import { GameDate } from './common';

export interface Client {
  id: string;
  name: string;
  age: number;
  status: 'active' | 'inactive' | 'probation';
  type: 'standard' | 'premium' | 'exclusive';
  loyalty: number;
  influence: number;
  income: number;
  cost: number;
  assignedTo: string | null;
  assignedToName?: string;
  description?: string;
  skills?: string[];
  origin?: string;
  occupation?: string;
  createdAt: string;
  notes?: string;
  lastInteraction?: GameDate | string;
  competences?: Record<string, number>;
}

export interface ClientCreationData {
  name: string;
  age: number;
  status: 'active' | 'inactive' | 'probation';
  type: 'standard' | 'premium' | 'exclusive';
  loyalty: number;
  influence: number;
  income: number;
  cost: number;
  assignedTo: string | null;
  assignedToName?: string;
  description?: string;
  skills?: string[];
  origin?: string;
  occupation?: string;
  notes?: string;
  competences?: Record<string, number>;
}

export interface ClientFilter {
  searchTerm: string;
  type: 'all' | 'standard' | 'premium' | 'exclusive';
  status: 'all' | 'active' | 'inactive' | 'probation';
  assignedTo: 'all' | 'assigned' | 'unassigned' | string;
  minInfluence?: number;
  minLoyalty?: number;
}

export interface ClientSort {
  field: keyof Client;
  direction: 'asc' | 'desc';
}
