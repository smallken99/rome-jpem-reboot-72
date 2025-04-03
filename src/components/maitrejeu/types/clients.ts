
import { GameDate } from './common';

export enum CLIENT_TYPES {
  PATRON = 'patron',
  CLIENT = 'client',
  ALLY = 'ally',
  ENEMY = 'enemy',
  NEUTRAL = 'neutral',
  STANDARD = 'standard'
}

export enum CLIENT_LOCATIONS {
  ROME = 'rome',
  ITALY = 'italy',
  PROVINCE = 'province',
  FOREIGN = 'foreign'
}

export enum CLIENT_LOYALTIES {
  VERY_LOW = 'very_low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export enum CLIENT_STATUSES {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PROBATION = 'probation'
}

export type ClientInfluences = {
  political: number;
  military: number;
  economic: number;
};

export interface ClientCreationData {
  name: string;
  type: string;
  subType?: string;
  loyalty: number | string;
  status: string;
  location: string;
  influence: number;
  competences: string[];
  assignedTo?: string;
  backstory?: string;
  specialAbility?: string;
  relationshipLevel?: number;
  lastInteraction?: Date | string;
  age?: number;
  income?: number;
  cost?: number;
  influences?: ClientInfluences;
}

export interface Client extends ClientCreationData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientFilter {
  types?: string[];
  status?: string[];
  location?: string;
  minInfluence?: number;
  minLoyalty?: number | string;
  assignedTo?: string;
  searchTerm?: string;
  assignedOnly?: boolean;
}

export type ClientSortField = 'name' | 'loyalty' | 'influence' | 'type' | 'status' | 'location';

export interface ClientSort {
  field: ClientSortField;
  direction: 'asc' | 'desc';
}

export interface ClientRelationship {
  clientId: string;
  senateurId: string;
  relationLevel: number;
  lastInteraction: Date | string | GameDate;
  notes?: string;
}
