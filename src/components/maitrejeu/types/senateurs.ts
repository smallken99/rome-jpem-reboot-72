
import { GameDate } from './common';

export interface SenateurJouable {
  id: string;
  nom: string;
  prenom: string;
  gens: string;
  gender: 'male' | 'female';
  age: number;
  actif: boolean;
  faction: string;
  clientele: number;
  influence: number;
  prestige: number;
  richesse: number;
  fonction?: string;
  magistrature?: string;
  appartenance?: string;
  playerId?: string;
  allies: string[];
  ennemis: string[];
  competences?: Record<string, number>;
  attributes?: Record<string, number>;
  background?: string;
  famille?: string;
  dateNaissance?: GameDate;
  dateMort?: GameDate;
  portrait?: string;
  notes?: string;
}
