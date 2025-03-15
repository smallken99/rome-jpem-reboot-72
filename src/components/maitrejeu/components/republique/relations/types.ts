
// Types pour les relations diplomatiques

export interface Nation {
  id: string;
  name: string;
  region: string;
  status: "ally" | "neutral" | "hostile" | "vassal" | "tributary" | "enemy";
  relationScore: number;
  flag?: string;
  color?: string;
  leader?: string;
  leaders?: string[];
  population?: number;
  description?: string;
  militaryStrength?: number;
  diplomaticInfluence?: number;
  tradeValue?: number;
  lastContact?: string;
  power?: number;
  relation?: number;
  relationLevel?: number;
  founded?: string;
  leaderTitle?: string;
}

export interface Traite {
  id: string;
  name: string;
  type: "commercial" | "peace" | "military" | "territorial";
  parties: string[];
  status: "active" | "draft" | "expired" | "revoked";
  description: string;
  dateSignature: string;
  dateExpiration: string;
  clauses: string[];
  benefits: string | string[];
  obligations: string | string[];
  dateCreation?: string;
  terms?: string[];
  title?: string;
}

export interface Alliance {
  id: string;
  name: string;
  type: "military" | "economic" | "cultural" | "political" | "defensive" | "trade";
  parties: string[];
  status: "active" | "pending" | "expired" | "broken" | "inactive";
  description: string;
  dateCreated: string;
  dateEnds: string;
  terms: string[];
  benefits: string[] | string;
  requirements: string[] | string;
  date?: string;
  dateCreation?: string;
  duration?: number;
  nations?: string[];
  members?: string[];
  militarySupport?: string | number;
  economicBenefits?: string | string[];
  commitments?: string | string[];
}

export interface DiplomaticFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: {
    status?: string;
    region?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
  };
  setFilters: (filters: any) => void;
  activeTab: string;
}

export interface AddNationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (nation: Nation) => void;
}

export interface AddTraiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  nations: Nation[];
  onSave: (traite: Traite) => void;
}

export interface AddAllianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  nations: Nation[];
  onSave: (alliance: Alliance) => void;
}

export interface TraiteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  traite: Traite;
  isEditable: boolean;
  onSave: (updatedTraite: any) => void;
}

export interface NationsListProps {
  nations: Nation[];
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
