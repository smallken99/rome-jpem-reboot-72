
// TYPES DE CLIENTS

export interface Client {
  id: string;
  name: string;
  type: string;
  subType: string;
  location: string;
  loyalty: string;
  influences: {
    political: number;
    popular: number;
    religious: number;
  };
  specialAbilities: string[];
  competencePoints: number;
  backstory: string;
  activeStatus: 'active' | 'inactive' | 'probation';
  relationshipLevel: number;
  lastInteraction: string;
  senateurId?: string | null;
  assignedToSenateurId?: string | null; // Adding this to resolve build errors
}

export type ClientCreationData = Omit<Client, 'id'>;

// Types pour le filtrage des clients
export interface ClientFilter {
  type?: string;
  loyalty?: string;
  status?: string;
  location?: string;
  assignedTo?: string | null;
  assignedOnly?: boolean; // Adding this to resolve build errors
  searchTerm?: string; // Adding this to resolve build errors
}

// Types pour le tri des clients
export type ClientSort = {
  field: keyof Client | '';
  direction: 'asc' | 'desc';
};

// Export clientType to be used in components
export type ClientType = string;
