
// Types liés aux factions politiques
export type FactionPolitique = string;

export interface Faction {
  id: string;
  nom: string;
  description: string;
  leader: any;
  membres: any[];
  influence: number;
  couleur: string;
  objectifs: string[];
}
