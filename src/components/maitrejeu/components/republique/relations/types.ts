
export interface Nation {
  id: string;
  name: string;
  region: string;
  status: 'ally' | 'neutral' | 'enemy' | 'tributary';
  leader: string;
  leaderTitle: string;
  description: string;
  relationLevel: number;
  // Propriétés supplémentaires
  population: number;
  militaryStrength: number;
  diplomaticInfluence: number;
  tradeValue: number;
  lastContact: string;
  leaders?: string[];
}

export interface Traite {
  id: string;
  title: string;
  type: 'commercial' | 'peace' | 'military' | 'tribute';
  parties: string[];
  status: 'active' | 'draft' | 'expired' | 'revoked' | 'violated';
  description: string;
  // Propriétés supplémentaires
  dateSignature: string;
  dateExpiration: string;
  clauses: string[];
  benefits: string;
  obligations: string;
}

export interface Alliance {
  id: string;
  name: string;
  type: 'defensive' | 'offensive' | 'trade' | 'cultural';
  nations: string[];
  status: 'active' | 'inactive' | 'pending' | 'expired';
  description: string;
  // Propriétés supplémentaires
  dateCreation: string;
  duration: number;
  members: string[];
  militarySupport: string;
  economicBenefits: string;
  commitments: string;
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
