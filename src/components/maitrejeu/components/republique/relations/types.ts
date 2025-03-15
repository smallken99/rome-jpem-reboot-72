
import { ReactNode } from 'react';

export interface Nation {
  id: string;
  name: string;
  region: string;
  founded?: string;
  status: 'ally' | 'neutral' | 'enemy' | 'tributary';
  description: string;
  leader?: string;
  capital?: string;
  flag?: string;
  relation?: string;
  power?: number;
}

export interface Traite {
  id: string;
  title: string;
  parties: string[];
  type: 'commercial' | 'peace' | 'military' | 'tribute';
  status: 'active' | 'draft' | 'expired' | 'revoked';
  description: string;
  dateCreated: string;
  dateExpires?: string;
  date?: string;
  terms?: string[];
}

export interface Alliance {
  id: string;
  name: string;
  nations: string[];
  type: 'defensive' | 'offensive' | 'commercial' | 'full';
  status: 'active' | 'inactive' | 'pending';
  description: string;
  date?: string;
  dateCreated: string;
  dateExpires?: string;
  terms?: string[];
}

export interface NationsListProps {
  nations: Nation[];
  searchTerm: string;
  filters: any;
  isEditable: boolean;
}

export interface TraitesListProps {
  traites: Traite[];
  searchTerm: string;
  filters: any;
  isEditable: boolean;
}

export interface AlliancesMilitairesProps {
  alliances: Alliance[];
  searchTerm: string;
  filters: any;
  isEditable: boolean;
}
