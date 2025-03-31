
export interface Equilibre {
  politique: {
    populaires: number;
    optimates: number;
    moderates: number;
  };
  social?: {
    patriciens: number;
    plebeiens: number;
  };
  economie: {
    stabilite: number;
    croissance: number;
    commerce: number;
    agriculture: number;
  };
  militaire: {
    moral: number;
    discipline: number;
    puissance: number;
    effectifs: number;
    equipement: number;
  };
  religion: {
    piete: number;
    traditions: number;
    superstition: number;
  };
  // Additional structures for other balance aspects
  paix?: number;
  stabilite?: number;
  risks?: Risk[];
}

export interface Risk {
  id: string;
  name: string;
  type: string;
  probability: number;
  impact: number;
  description: string;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  importance: "low" | "medium" | "high" | "critical";
  affectedValues: string[];
  resolved: boolean;
}
