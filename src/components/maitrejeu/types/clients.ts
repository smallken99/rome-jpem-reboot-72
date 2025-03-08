
import { ClientType, ClientInfluence } from '@/components/clientele/ClientCard';

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  subType: string;
  location: string;
  loyalty: string;
  influences: ClientInfluence;
  assignedToSenateurId?: string | null;
  competencePoints?: number;
  specialAbilities?: string[];
  backstory?: string;
  activeStatus?: 'active' | 'inactive' | 'probation';
  relationshipLevel?: number;
  lastInteraction?: string;
}

export type ClientCreationData = Omit<Client, 'id'>;

// Types utilitaires pour la gestion des clients
export interface ClientFilter {
  type?: ClientType;
  location?: string;
  loyalty?: string;
  assignedOnly?: boolean;
  searchTerm?: string;
}

export interface ClientSort {
  field: keyof Client;
  direction: 'asc' | 'desc';
}
