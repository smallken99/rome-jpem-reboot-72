
import { Character } from '@/types/character';

interface InheritanceRules {
  male: { [key: string]: number };
  female: { [key: string]: number };
  default: number;
}

// Simplified Roman inheritance rules
const inheritanceRules: InheritanceRules = {
  male: {
    'Fils': 0.8, // Sons get most of the inheritance
    'Frère': 0.1,
    'Neveu': 0.05,
    'Cousin': 0.02,
  },
  female: {
    'Fille': 0.4, // Daughters get less than sons (historical accuracy)
    'Épouse': 0.3,
    'Sœur': 0.05,
    'Nièce': 0.02,
    'Cousine': 0.01,
  },
  default: 0.001 // Very small share for others
};

/**
 * Calculate inheritance shares for the heirs
 * @param heirs Array of characters who are heirs
 * @returns Array of normalized inheritance shares
 */
export const calculateInheritance = (heirs: Character[]): number[] => {
  if (!heirs.length) return [];
  
  // Calculate raw shares based on relation and gender
  const rawShares = heirs.map(heir => {
    const relationRules = inheritanceRules[heir.gender as 'male' | 'female'] || {};
    return relationRules[heir.relation] || inheritanceRules.default;
  });
  
  // If all heirs have 0 shares, give them equal shares
  const totalRawShares = rawShares.reduce((sum, share) => sum + share, 0);
  if (totalRawShares === 0) {
    return heirs.map(() => 1 / heirs.length);
  }
  
  // Normalize shares so they sum to 1
  return rawShares.map(share => share / totalRawShares);
};

/**
 * Calculate the total value of an inheritance
 * @param character Character whose inheritance is being calculated
 * @returns Total value of the inheritance
 */
export const calculateTotalInheritance = (character: Character): number => {
  // For now, we'll use a fictional formula
  const baseValue = 1000000; // Base value for a patrician
  const ageMultiplier = Math.min(2, character.age / 35); // Peak at age 70
  const healthPenalty = character.health < 50 ? 0.7 : 1; // Penalty for poor health
  
  // For fictional purposes only, a Senator's inheritance is worth more
  const statusMultiplier = character.isHeadOfFamily ? 3 : 1;
  
  return Math.round(baseValue * ageMultiplier * healthPenalty * statusMultiplier);
};

/**
 * Get eligible heirs for a character
 * @param character Main character
 * @param allCharacters All available characters
 * @returns Array of eligible heirs
 */
export const getEligibleHeirs = (character: Character, allCharacters: Character[]): Character[] => {
  // Filter out dead characters and the character themselves
  const eligibleCharacters = allCharacters.filter(c => 
    c.id !== character.id && c.status !== 'deceased'
  );
  
  // Sort by inheritance priority (males first in Roman tradition)
  return eligibleCharacters.sort((a, b) => {
    // Male heirs before female heirs
    if (a.gender !== b.gender) {
      return a.gender === 'male' ? -1 : 1;
    }
    
    // Direct descendants before siblings
    const aPriority = getPriorityByRelation(a.relation);
    const bPriority = getPriorityByRelation(b.relation);
    
    return aPriority - bPriority;
  });
};

// Helper function to determine priority by relation
const getPriorityByRelation = (relation: string): number => {
  const priorities: { [key: string]: number } = {
    'Fils': 1,
    'Fille': 2,
    'Épouse': 3,
    'Frère': 4,
    'Sœur': 5,
    'Neveu': 6,
    'Nièce': 7,
    'Cousin': 8,
    'Cousine': 9
  };
  
  return priorities[relation] || 100; // Default low priority
};
