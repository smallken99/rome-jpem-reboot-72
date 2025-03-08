
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

// Fonction de conversion d'un Character en VestaleCandidate
export const characterToVestaleCandidate = (character: Character): VestaleCandidate => {
  const [firstName, lastName] = character.name.split(' ');
  
  return {
    id: character.id,
    firstName: firstName || character.name,
    lastName: lastName || "",
    stats: {
      piety: character.stats.piety?.value || 0,
      discipline: character.stats.martialEducation?.value || 0,
      intelligence: character.stats.oratory?.value || 0,
      charisma: character.stats.popularity?.value || 0
    },
    avatar: character.portrait,
    traits: []
  };
};
