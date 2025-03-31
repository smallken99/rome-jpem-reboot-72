
export interface SenateurJouable {
  id: string;
  name: string;
  // Required fields
  nom: string;
  prenom: string;
  gens: string;
  fonction?: string;
  appartenance?: string;
  magistrature?: string;
  playerId?: string;
  joueur?: string | boolean;
  popularite?: number;
  militaire?: number;
  piete?: number;
  eloquence?: number;
  // Original fields for GestionSenateurs
  age: number;
  faction: string;
  influence: number;
  prestige: number;
  richesse: number;
  clientele: number;
  famille: string;
  statut: string;
  actif: boolean | string;
  gender: 'male' | 'female';
  allies: string[];
  ennemis: string[];
  roles?: string[];
  competences?: string[] | Record<string, any>;
  diplomatie?: string[] | Record<string, any>;
  stats?: any;
}

// Extend this interface as needed for additional functionality
export interface SenateurDetail extends SenateurJouable {
  biography?: string;
  achievements?: string[];
  currentMission?: string;
  votes?: Record<string, string>;
  relationships?: Record<string, string>;
}
