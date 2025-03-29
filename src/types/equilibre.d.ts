
export interface Equilibre {
  id: string;
  political: {
    populaires: number;
    optimates: number;
    moderates: number;
  };
  social: {
    patriciens: number;
    plébéiens: number;
  };
  economie: number;
  economy?: number;
  stability: number;
  armée: number;
  loyauté: number;
  morale: number;
  religion: number;
  facteurJuridique: number;
  risques: RiskFactor[];
  historique: HistoriqueEntry[];
  population?: number;
}

export interface RiskFactor {
  id: string;
  name: string;
  level: string;
  type: string;
  description: string;
  threat: number;
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
  date: Date;
  description: string;
  impact: number;
  type: string;
}
