
import { MagistratureType } from './magistratures';

export interface Competences {
  diplomatie: number;
  guerre: number;
  administration: number;
  eloquence: number;
}

export interface SenateurJouable {
  id: string;
  nom: string;
  prenom: string;
  gens: string;
  statut: "Patricien" | "Plébéien";
  age: number;
  joueur: boolean;
  roles: string[];
  richesse: number;
  influence: number;
  competences: Competences;
  magistrature?: MagistratureType;
}
