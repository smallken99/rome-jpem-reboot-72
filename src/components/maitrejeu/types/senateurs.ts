
export interface SenateurJouable {
  id: string;
  name: string;
  // Additional fields required by components
  nom?: string;
  prenom?: string;
  gens?: string;
  fonction?: string;
  appartenance?: string;
  magistrature?: string;
  playerId?: string;
  joueur?: string | boolean;
  popularite?: number;
  militaire?: number;
  piete?: number;
  eloquence?: number;
  // Original fields
  age: number;
  faction: string;
  influence: number;
  prestige: number;
  richesse: number;
  famille: string;
  statut: string;
  actif: boolean | string;
  roles?: string[];
}
