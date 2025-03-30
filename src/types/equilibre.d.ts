
export interface Equilibre {
  id?: string;
  politique: {
    populaires: number;
    optimates: number;
    moderates: number;
    total?: number;
  };
  economie: {
    stabilite: number;
    croissance: number;
    commerce: number;
    agriculture: number;
  };
  social: {
    plebeiens: number;
    patriciens: number;
    esclaves: number;
    cohesion: number;
  };
  militaire: {
    moral: number;
    effectifs: number;
    equipement: number;
    discipline: number;
  };
  religion: {
    piete: number;
    traditions: number;
    superstition: number;
  };
  population?: number;
  date?: Date;
  
  // For compatibility with different spellings
  économie?: {
    stabilite: number;
    croissance: number;
    commerce: number;
    agriculture: number;
  };
  
  // Additional properties for other components
  economic?: any;
  political?: any;
  stability?: number;
  loyauté?: number;
  economicStability?: number;
  facteurMilitaire?: number;
  armée?: any;
  morale?: number;
  facteurPatriciens?: number;
  facteurPlebs?: number;
  plébéiens?: number;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: Date | GameDate;
  type: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  impact?: Record<string, number>;
  event?: string;
}

export interface HistoriqueEntry {
  id: string;
  event: string;
  title: string;
  description: string;
  date: Date | GameDate;
  impact: Record<string, number>;
  type: string;
  importance: string;
}

export interface EconomieRecord {
  date: Date | GameDate;
  treasury: number;
  income: number;
  expenses: number;
  surplus: number;
  balance: number;
}
