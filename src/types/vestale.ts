
import { Character } from './character';

export interface VestaleCandidate extends Character {
  firstName: string;
  lastName: string;
  spouse?: string;
  traits?: string[];
  stats: {
    piety: number;
    discipline: number;
    intelligence: number;
    charisma: number;
  };
}
