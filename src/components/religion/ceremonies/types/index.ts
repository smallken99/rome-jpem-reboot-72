
export interface Ceremony {
  id: string;
  name: string;
  type: 'festival' | 'sacrifice' | 'procession' | 'jeux' | 'rituel';
  date: string;
  deity: string;
  prestige: number;
  attendance: number;
  cost: number;
  description: string;
  pieteBonus: number;
  populariteBonus: number;
  nextCelebration: number; // jours avant prochaine célébration
}
