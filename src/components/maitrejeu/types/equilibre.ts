
export interface Equilibre {
  politique: {
    populaires: number;
    optimates: number;
    moderates: number;
  };
  social: {
    patriciens: number;
    plebeiens: number;
    esclaves?: number;
    cohesion?: number;
  };
  economie: {
    stabilite: number;
    croissance: number;
    commerce: number;
    agriculture: number;
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
  stabilite?: number;
  populaires?: number;
  populares?: number;
  optimates?: number;
  moderates?: number;
  patriciens?: number;
  plébéiens?: number;
  armée?: number;
  loyauté?: number;
  morale?: number;
  facteurJuridique?: number;
  historique?: any[];
  risques?: Record<string, any>;
}
