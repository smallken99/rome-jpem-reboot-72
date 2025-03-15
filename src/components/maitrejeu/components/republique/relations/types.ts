
export interface Nation {
  id: string;
  name: string;
  region: string;
  status: 'ally' | 'enemy' | 'neutral' | 'tributary';
  leader: string;
  leaderTitle: string; // Ajout de cette propriété manquante
  description: string;
  relationLevel: number;
  population: number;
  militaryStrength: number;
  diplomaticInfluence: number;
  tradeValue: number;
  lastContact: string;
  leaders: string[];
}

export interface Traite {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'draft' | 'expired' | 'revoked';
  dateCreation: string;
  dateExpiration: string;
  parties: string[];
  description: string;
  terms: string[] | string;
  benefits: string[] | string;
  obligations: string[] | string;
  signatories: string[] | string;
}

export interface Alliance {
  id: string;
  name: string;
  type: 'defensive' | 'offensive' | 'full';
  status: 'active' | 'expired' | 'dissolved';
  dateCreation: string;
  duration: number;
  members: string[] | string;
  description: string;
  militarySupport: number;
  economicBenefits: string[] | string;
  commitments: string[] | string;
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
  onClose: () => void;
  nations?: Nation[];
}

export interface AddTraiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  nations: Nation[];
}

export interface AddAllianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  nations: Nation[];
}
