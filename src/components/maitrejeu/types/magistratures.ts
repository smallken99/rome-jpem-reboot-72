
// Types for magistratures in the Roman Republic

export type MagistratureType = 
  'consul' | 
  'praetor' | 
  'aedile' | 
  'quaestor' | 
  'tribunus' | 
  'censor' | 
  'dictator' | 
  'magister_equitum' | 
  'tribunus_militum' | 
  'pontifex_maximus' | 
  'augur';

export interface Magistrature {
  id: string;
  type: MagistratureType;
  title: string;
  description: string;
  termLength: number; // in months
  collegiality: number; // number of colleagues
  powers: string[];
  requirements: string[];
  responsibilities: string[];
  imperium: boolean;
  sacrosanctity: boolean;
  veto: boolean;
  currentHolders?: string[]; // IDs of current office holders
  creationYear?: number;
  rank: number; // Position in the cursus honorum
}

export interface MagistratureElection {
  id: string;
  magistratureType: MagistratureType;
  scheduledDate: {
    year: number;
    season: string;
  };
  candidates: string[]; // IDs of candidates
  status: 'scheduled' | 'in_progress' | 'completed' | 'canceled';
  result?: {
    winners: string[]; // IDs of winners
    votes: Record<string, number>; // Votes per candidate
  };
  description?: string;
  createdAt: Date;
}

export interface MagistratureAppointment {
  id: string;
  magistratureType: MagistratureType;
  appointeeId: string;
  appointerId?: string;
  startDate: {
    year: number;
    season: string;
  };
  endDate?: {
    year: number;
    season: string;
  };
  reason?: string;
  status: 'active' | 'ended' | 'revoked';
  accomplishments?: string[];
}
