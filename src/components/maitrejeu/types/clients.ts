
export const CLIENT_TYPES = ['patron', 'client', 'ally', 'enemy', 'neutral', 'standard', 'merchant', 'slave', 'soldier', 'senator', 'priest'];
export const CLIENT_LOCATIONS = ['Forum', 'Senate', 'Villa', 'Province', 'Market', 'Temple', 'Theatre', 'Military Camp'];
export const CLIENT_LOYALTIES = ['haute', 'moyenne', 'basse', 'incertaine', 'strong', 'moderate', 'weak', 'questionable'];
export const CLIENT_STATUSES = ['active', 'inactive', 'probation', 'deleted'];

export interface ClientInfluences {
  political: number;
  popular: number;
  religious: number;
}

export interface Client {
  id: string;
  name: string;
  type: string;
  status: string;
  activeStatus?: string;
  description?: string;
  occupation?: string;
  location?: string;
  loyalty?: string | number;
  influence?: number;
  assignedTo?: string;
  assignedToSenateurId?: string;
  competences: string[];
  competencePoints?: number;
  // Extended client properties
  subType?: string;
  age?: number;
  income?: number;
  cost?: number;
  influences?: ClientInfluences;
  specialAbility?: string;
  specialAbilities?: string[];
  backstory?: string;
  relationshipLevel?: number;
  lastInteraction?: string;
}

export interface ClientCreationData {
  name: string;
  type: string;
  status: string;
  description?: string;
  occupation?: string;
  location?: string;
  loyalty?: string | number;
  influence?: number;
  assignedTo?: string;
  competences?: string[];
  competencePoints?: number;
  // Extended client creation properties
  subType?: string;
  age?: number;
  income?: number;
  cost?: number;
  influences?: ClientInfluences;
  specialAbility?: string;
  specialAbilities?: string[];
  backstory?: string;
  relationshipLevel?: number;
  lastInteraction?: string;
  assignedToSenateurId?: string;
  activeStatus?: string;
}

export interface ClientFilter {
  type?: string;
  status?: string;
  assignedTo?: string;
  search?: string;
  searchTerm?: string;
  location?: string;
  loyalty?: string;
  minInfluence?: number;
  minLoyalty?: number;
}

export interface ClientSort {
  field: string;
  direction: 'asc' | 'desc';
}
