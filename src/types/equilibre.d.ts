
export interface Equilibre {
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
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  impact?: Record<string, number>;
}

export interface HistoriqueEntry {
  id: string;
  event: string;
  title: string;
  description: string;
  date: Date;
  impact: Record<string, number>;
  type: string;
  importance: string;
}
