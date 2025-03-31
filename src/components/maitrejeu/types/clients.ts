
export interface Client {
  id: string;
  name: string;
  profession: string;
  loyalty: number;
  influence: number;
  wealth: number;
  status: 'active' | 'inactive' | string;
  senateurId?: string;
  competences: Record<string, number>;
  competencePoints?: number;
  background?: string;
  notes?: string;
  portrait?: string;
  age?: number;
  skills?: string[];
  connections?: string[];
  
  // Additional fields used in codebase
  type?: string;
  subType?: string;
  location?: string;
  income?: number;
  cost?: number;
  assignedTo?: string;
  influences?: Record<string, number>;
  specialAbilities?: string[];
  backstory?: string;
  activeStatus?: 'active' | 'inactive' | 'probation' | string;
  relationshipLevel?: number;
  lastInteraction?: string;
  assignedToSenateurId?: string;
  origin?: string;
  occupation?: string;
}

export interface ClientCreationData {
  name: string;
  profession?: string;
  loyalty?: number;
  influence?: number;
  wealth?: number;
  status?: string;
  competences?: Record<string, number>;
  type?: string;
  subType?: string;
  location?: string;
  relationshipLevel?: number;
  activeStatus?: string;
  lastInteraction?: string;
  [key: string]: any;
}

export interface ClientFilter {
  type?: string;
  location?: string;
  loyalty?: number;
  assignedOnly?: boolean;
  searchTerm?: string;
  [key: string]: any;
}

export interface ClientSort {
  field: keyof Client;
  direction: 'asc' | 'desc';
}

export const CLIENT_TYPES = [
  'artisan',
  'commerçant',
  'lettré',
  'militaire',
  'fonctionnaire',
  'notable',
  'politicien',
  'religieux',
  'autre'
];

export const CLIENT_LOCATIONS = [
  'Rome',
  'Italie',
  'Provinces',
  'Étranger'
];

export const CLIENT_LOYALTIES = [
  'Faible',
  'Modérée',
  'Forte',
  'Indéfectible'
];

export const CLIENT_STATUSES = [
  'active',
  'inactive',
  'probation'
];

export interface ClientFormProps {
  onSubmit: (client: Client) => void;
  initialValues?: Partial<Client>;
  isEditMode?: boolean;
}
