
// Types pour les nations
export interface Nation {
  id: string;
  name: string;
  region: string;
  status: 'ally' | 'neutral' | 'enemy' | 'tributary';
  power?: number;
  relation?: number;
  founded?: string;
  leaderTitle?: string;
  // Additional properties needed by the NationModal
  leader?: string;
  description?: string;
  population?: number;
  militaryStrength?: number;
  diplomaticInfluence?: number;
  tradeValue?: number;
  lastContact?: string;
  leaders?: string[];
  relationLevel?: number;
}

export interface NationsListProps {
  nations: Nation[];
  searchTerm: string;
  filters: {
    status?: string;
    region?: string;
    dateFrom?: string;
    dateTo?: string;
  };
  isEditable: boolean;
}

// Types for modal props
export interface AddNationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (nation: Nation) => void;
}

export interface AddTraiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (traite: Traite) => void;
  nations: Nation[];
}

export interface AddAllianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (alliance: Alliance) => void;
  nations: Nation[];
}

export interface DiplomaticFiltersProps {
  activeTab: string;
  onFilterChange: (filters: any) => void;
  onReset: () => void;
  onSearch?: (term: string) => void;
  onFilter?: (filters: any) => void;
}

// Types pour les traités
export interface Traite {
  id: string;
  name: string;
  title?: string;  // For backward compatibility
  type: 'commercial' | 'peace' | 'military' | 'tribute';
  parties: string[];
  status: 'active' | 'draft' | 'expired' | 'revoked';
  description: string;
  dateSignature: string;
  dateExpiration: string;
  dateCreation?: string;
  clauses: string[];
  benefits: string;
  obligations: string;
  date?: string;
  dateCreated?: string;
  terms?: string[];  // For backward compatibility
}

export interface TraitesListProps {
  traites: Traite[];
  searchTerm: string;
  filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  };
  isEditable: boolean;
}

// Types pour les alliances
export interface Alliance {
  id: string;
  name: string;
  type: 'defensive' | 'offensive' | 'commercial' | 'cultural' | 'trade' | 'military' | 'full';
  nations: string[];
  status: 'active' | 'inactive' | 'pending' | 'expired' | 'dissolved';
  description: string;
  dateCreation: string;
  duration: number;
  members: string[];
  militarySupport: string;
  economicBenefits: string;
  commitments: string;
  date?: string;
  dateCreated?: string;
}

export interface AlliancesMilitairesProps {
  alliances: Alliance[];
  searchTerm: string;
  filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  };
  isEditable: boolean;
}
