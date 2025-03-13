
import { Character } from './character';
import { getStatValue } from '@/utils/characterUtils';

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

// Fonction de conversion d'un Character en VestaleCandidate
export const characterToVestaleCandidate = (character: Character): VestaleCandidate => {
  const [firstName, lastName] = character.name.split(' ');
  
  return {
    id: character.id,
    firstName: firstName || character.name,
    lastName: lastName || "",
    stats: {
      piety: getStatValue(character.stats.piety),
      discipline: getStatValue(character.stats.martialEducation),
      intelligence: getStatValue(character.stats.oratory),
      charisma: getStatValue(character.stats.popularity)
    },
    avatar: character.portrait,
    traits: []
  };
};
