
export interface Equilibre {
  population: number;
  armée: number;
  économie: number;
  morale: number;
  loyauté: number;
  patriciens: number;
  plébéiens: number;
  populares: number;
  optimates: number;
  neutrales: number;
}

export interface EquilibreHistorique {
  année: number;
  saison: string;
  population: number;
  armée: number;
  économie: number;
  morale: number;
  loyauté: number;
  patriciens: number;
  plébéiens: number;
  populares: number;
  optimates: number;
  neutrales: number;
}

export interface EquilibreChartProps {
  equilibre: Equilibre;
}

export interface PartisGraphProps {
  populares: number;
  optimates: number;
  neutrales: number;
}

export interface EquilibreChangesProps {
  changes: {
    type: keyof Equilibre;
    before: number;
    after: number;
  }[];
}
