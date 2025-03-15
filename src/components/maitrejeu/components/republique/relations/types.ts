
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

// Types pour les traités
export interface Traite {
  id: string;
  name: string;
  type: 'commercial' | 'peace' | 'military' | 'tribute';
  parties: string[];
  status: 'active' | 'draft' | 'expired' | 'revoked';
  description: string;
  dateSignature: string;
  dateExpiration: string;
  clauses: string[];
  benefits: string;
  obligations: string;
  date?: string;
  dateCreated?: string;
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
