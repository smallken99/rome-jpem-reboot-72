
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
  // Propriétés supplémentaires
  population?: number;
  militaryStrength?: number;
  diplomaticInfluence?: number;
  tradeValue?: number;
  lastContact?: string;
  leaders?: string[];
}

export interface Traite {
  id: string;
  title: string;
  parties: string[];
  type: 'commercial' | 'peace' | 'military' | 'tribute' | 'trade';
  status: 'active' | 'draft' | 'expired' | 'revoked' | 'violated';
  description: string;
  dateCreated: string;
  dateExpires?: string;
  date?: string;
  terms?: string[];
  // Propriétés supplémentaires
  dateSignature?: string;
  dateExpiration?: string;
  clauses?: string[];
  benefits?: string[];
  obligations?: string[];
}

export interface Alliance {
  id: string;
  name: string;
  nations: string[];
  type: 'defensive' | 'offensive' | 'commercial' | 'full';
  status: 'active' | 'inactive' | 'pending' | 'expired' | 'dissolved';
  description: string;
  date?: string;
  dateCreated: string;
  dateExpires?: string;
  terms?: string[];
  // Propriétés supplémentaires
  members?: string[];
  dateCreation?: string;
  duration?: number;
  militarySupport?: number;
  economicBenefits?: string[];
  commitments?: string[];
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

export interface DiplomaticFiltersProps {
  activeTab: string;
  onFilterChange: (filters: any) => void;
  onReset: () => void;
  onSearch?: (term: string) => void;
  onFilter?: (filters: any) => void;
}
