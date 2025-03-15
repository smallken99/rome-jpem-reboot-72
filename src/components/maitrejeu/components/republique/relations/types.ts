
export interface Nation {
  id: string;
  name: string;
  region: string;
  status: 'ally' | 'enemy' | 'neutral' | 'tributary';
  population: number;
  militaryStrength: number;
  diplomaticInfluence: number;
  tradeValue: number;
  lastContact: string;
  description: string;
  leaders: string[];
}

export interface Traite {
  id: string;
  title: string;
  parties: string[];
  type: 'peace' | 'trade' | 'military' | 'tribute' | 'other';
  dateSignature: string;
  dateExpiration?: string;
  status: 'active' | 'expired' | 'violated' | 'canceled';
  clauses: string[];
  description: string;
  benefits: string[];
  obligations: string[];
}

export interface Alliance {
  id: string;
  name: string;
  members: string[];
  type: 'defensive' | 'offensive' | 'full';
  dateCreation: string;
  duration: number;
  status: 'active' | 'expired' | 'dissolved';
  militarySupport: number;
  economicBenefits: string[];
  commitments: string[];
  description: string;
}
