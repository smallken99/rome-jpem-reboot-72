
import { Character } from '@/types/character';

export interface SenateurJouable {
  id: string;
  name: string;
  nom: string;
  prenom: string;
  gens: string;
  gender: 'male' | 'female';
  age: number;
  faction: string;
  influence: number;
  prestige: number;
  richesse: number;
  fonction?: string;
  appartenance?: string;
  famille?: string;
  magistrature?: string;
  playerId?: string;
  joueur?: string | boolean;
  popularite?: number;
  militaire?: number;
  piete?: number;
  eloquence?: number;
  statut?: string;
  diplomatie?: Record<string, any>;
  actif?: boolean;
  clientele: number;
  allies: string[];
  ennemis: string[];
  stats?: any;
}
