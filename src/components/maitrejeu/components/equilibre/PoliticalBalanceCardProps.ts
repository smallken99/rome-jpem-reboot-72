
export interface Equilibre {
  populares: number;
  optimates: number;
  moderates: number;
  patriciens: number;
  plébéiens: number;
  economie: number;
}

export interface PoliticalBalanceCardProps {
  populares: number;
  optimates: number;
  moderates: number;
  onUpdate: (populares: number, optimates: number, moderates: number) => void;
}
