
export interface Client {
  id: string;
  name: string;
  type: 'standard' | 'influent' | 'élite' | 'étranger' | 'militaire';
  subType?: string;
  location: string;
  loyalty: 'faible' | 'moyenne' | 'forte' | 'indéfectible';
  status?: 'active' | 'inactive' | 'probation';
  activeStatus?: 'active' | 'inactive' | 'probation';
  assignedToSenateurId?: string;
  patronId?: string;
  occupation?: string;
  description?: string;
  influences?: {
    political: number;
    popular: number;
    religious: number;
  };
  competences?: Record<string, number>;
  specialAbilities?: string[];
  backstory?: string;
  relationshipLevel?: number;
  lastInteraction?: string;
  age: number;
  assignedTo?: string;
  competencePoints?: number;
  notes?: string;
  origin?: string;
  income?: number;
  cost?: number;
}

export type ClientCreationData = Omit<Client, 'id'>;

export interface ClientFilter {
  searchTerm?: string;
  type?: string;
  status?: string;
  assignedTo?: string;
  location?: string;
  loyalty?: string;
  assignedOnly?: boolean;
  minInfluence?: number;
  minLoyalty?: number;
}

export interface ClientSort {
  field: keyof Client;
  direction: 'asc' | 'desc';
}

// Constants for client dropdowns
export const CLIENT_TYPES = ['standard', 'influent', 'élite', 'étranger', 'militaire'];
export const CLIENT_LOCATIONS = ['Rome', 'Italie', 'Provinces', 'Étranger'];
export const CLIENT_LOYALTIES = ['faible', 'moyenne', 'forte', 'indéfectible'];
export const CLIENT_STATUSES = ['active', 'inactive', 'probation'];
