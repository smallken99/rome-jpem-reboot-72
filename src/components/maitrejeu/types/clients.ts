
export type ClientType = 'standard' | 'influence' | 'military' | 'commerce' | 'religion' | 'politics' | 'arts';

export const CLIENT_TYPES: ClientType[] = ['standard', 'influence', 'military', 'commerce', 'religion', 'politics', 'arts'];

export const CLIENT_LOCATIONS = ['Forum', 'Palatin', 'Capitole', 'Aventin', 'Quirinal', 'Esquilin', 'Caelius', 'Via Sacra', 'Transtiberine', 'Port'];

export const CLIENT_LOYALTIES = ['basse', 'moyenne', 'haute', 'très haute', 'fanatique'];

export const CLIENT_STATUSES = ['active', 'inactive', 'probation'];

export interface ClientInfluences {
  political: number;
  popular: number;
  religious: number;
}

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  senateurId?: string;
  location?: string;
  loyalty?: string;
  competences: string[];
  specialAbility?: string;
  status?: string;
  influence?: number;
  influences?: ClientInfluences;
  subType?: string;
  age?: number;
  income?: number;
  cost?: number;
  assignedTo?: string;
  assignedToSenateurId?: string;
  activeStatus?: string;
  relationshipLevel?: number;
  lastInteraction?: string;
  backstory?: string;
  occupation?: string;
  annualIncome?: number;
  description?: string;
  competencePoints?: number;
}

export interface ClientCreationData {
  name: string;
  type: ClientType;
  senateurId?: string;
  location: string;
  loyalty: string;
  competences?: string[];
  status: string;
  age: number;
  influence: number;
  income: number;
  cost: number;
  assignedTo: string | null;
  influences: ClientInfluences;
  specialAbility?: string;
  specialAbilities?: string[];
  competencePoints: number;
  backstory?: string;
  activeStatus: string;
  relationshipLevel: number;
  lastInteraction: string;
  assignedToSenateurId?: string;
  subType?: string;
  description?: string;
}

export interface ClientFilter {
  type?: string;
  location?: string;
  loyalty?: string;
  assignedTo?: string;
  searchTerm?: string;
  minInfluence?: number;
  maxInfluence?: number;
  status?: string;
  assignedOnly?: boolean;
  minLoyalty?: string;
}

export interface ClientSort {
  field: keyof Client;
  direction: 'asc' | 'desc';
}
