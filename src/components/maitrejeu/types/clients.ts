
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
  assignedToSenateurId?: string | null;
}

export type ClientCreationData = Omit<Client, 'id'>;

// Types pour le filtrage des clients
export interface ClientFilter {
  type?: string;
  loyalty?: string;
  status?: string;
  location?: string;
  assignedTo?: string | null;
  assignedOnly?: boolean;
  searchTerm?: string;
}

// Types pour le tri des clients
export type ClientSort = {
  field: keyof Client | '';
  direction: 'asc' | 'desc';
};

// Export types constants
export const CLIENT_TYPES = [
  'artisan_commercant',
  'religieux',
  'politicien',
  'proprietaire',
  'pegre',
  'militaire',
  'etranger'
] as const;

export type ClientType = typeof CLIENT_TYPES[number];

export const CLIENT_LOCATIONS = [
  'Forum',
  'Capitole',
  'Palatin',
  'Subure',
  'Champs de Mars',
  'Velia',
  'Quirinal',
  'Aventin',
  'Port d\'Ostie'
] as const;

export type ClientLocation = typeof CLIENT_LOCATIONS[number];

export const CLIENT_LOYALTIES = [
  'faible',
  'moyenne',
  'forte',
  'totale'
] as const;

export type ClientLoyalty = typeof CLIENT_LOYALTIES[number];

export const CLIENT_STATUSES = [
  'active',
  'inactive',
  'probation'
] as const;

export type ClientStatus = typeof CLIENT_STATUSES[number];
