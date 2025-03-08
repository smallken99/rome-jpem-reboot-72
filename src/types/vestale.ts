
import { Character } from './character';

export type VestaleCandidate = {
  id: string;
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
  avatar?: string;
};
