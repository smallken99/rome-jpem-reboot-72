
export type Season = 'winter' | 'spring' | 'summer' | 'fall';

export interface GameDate {
  year: number;
  season: Season;
}

export interface Evenement {
  id: string;
  title: string;
  description: string;
  date: GameDate;
  endDate?: GameDate;
  type: string;
  importance: string;
  nom?: string;
  tags?: string[];
  actions?: any[];
}

export interface Equilibre {
  id?: string;
  economie: number;
  militaire: number;
  religion: number;
  politique: {
    populaires: number;
    optimates: number;
    moderates: number;
  };
  social: {
    patriciens: number;
    plébéiens: number;
  };
  population?: number;
  economy?: number;
  stability?: number;
  armée?: number;
  loyauté?: number;
  morale?: number;
  facteurJuridique?: number;
  risques?: any[];
  historique?: HistoriqueEntry[];
}

export interface HistoriqueEntry {
  id: string;
  date: Date;
  event: string;
  impact: number;
  type: string;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: GameDate | Date;
  impact: {
    economie?: number;
    militaire?: number;
    religion?: number;
    politique?: {
      populaires?: number;
      optimates?: number;
      moderates?: number;
    };
    social?: {
      patriciens?: number;
      plébéiens?: number;
    };
  };
  type: string;
  importance: string;
}
