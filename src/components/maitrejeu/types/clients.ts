
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
}

export type ClientCreationData = Omit<Client, 'id'>;

export interface ClientFilter {
  searchTerm?: string;
  type?: string;
  status?: string;
  assignedTo?: string;
}

export interface ClientSort {
  field: keyof Client;
  direction: 'asc' | 'desc';
}
