
export interface Nation {
  id: string;
  name: string;
  region: string;
  status: 'ally' | 'neutral' | 'enemy' | 'tributary';
  description?: string;
  founded?: string;
  power?: number;
  relation?: string;
  leader?: string;
  // Propriétés supplémentaires pour les modals
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
  description?: string;
  date?: string;
  dateCreated?: string;
  dateSignature?: string;
  dateExpiration?: string;
  clauses?: string | string[];
  benefits?: string | string[];
  obligations?: string | string[];
}

export interface Alliance {
  id: string;
  name: string;
  type: 'defensive' | 'offensive' | 'trade' | 'cultural' | 'military';
  nations: string[];
  status: 'active' | 'inactive' | 'pending' | 'expired';
  description?: string;
  date?: string;
  dateCreation?: string;
  dateCreated?: string;
  duration?: number;
  members?: string | string[];
  militarySupport?: string | string[];
  economicBenefits?: string | string[];
  commitments?: string | string[];
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
  onSearch?: (searchTerm: string) => void;
  onFilter?: (filters: any) => void;
}

export interface AddNationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface AddTraiteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  nations: Nation[];
}

export interface AddAllianceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  nations: Nation[];
}
