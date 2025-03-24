
import { Character } from '@/types/character';

export interface FertilityFactors {
  maternalAge: number;
  paternalAge: number;
  previousBirths: number;
  miscarriageChance: number;
  yearsSinceLastBirth: number;
}

/**
 * Génère les facteurs de fertilité pour un couple
 */
export const generateFertilityFactors = (
  wife: Character,
  husband?: Character,
  currentYear?: number
): FertilityFactors => {
  // Facteur d'âge maternel (de 0 à 1.0)
  const maternalAge = wife.age;
  
  // Facteur d'âge paternel
  const paternalAge = husband?.age || 0;
  
  // Nombre d'enfants déjà nés
  const previousBirths = wife.childrenIds?.length || 0;
  
  // Années depuis la dernière naissance
  const yearsSinceLastBirth = calculateYearsSinceLastBirth(wife, currentYear || 0);
  
  // Risque de fausse couche (5-15% selon l'âge)
  const miscarriageChance = calculateMiscarriageChance(wife);
  
  return {
    maternalAge,
    paternalAge,
    previousBirths,
    miscarriageChance,
    yearsSinceLastBirth
  };
};

/**
 * Calcule le nombre d'années depuis la dernière naissance
 */
const calculateYearsSinceLastBirth = (character: Character, currentYear: number): number => {
  if (!character.lastChildBirthYear || character.lastChildBirthYear <= 0) {
    return 999; // Aucun enfant précédent
  }
  
  return currentYear - character.lastChildBirthYear;
};

/**
 * Calcule la chance de fausse couche
 */
const calculateMiscarriageChance = (character: Character): number => {
  // Base: 5%
  let chance = 0.05;
  
  // Augmente avec l'âge
  if (character.age > 35) {
    chance += (character.age - 35) * 0.005; // +0.5% par année au-dessus de 35 ans
  } else if (character.age < 20) {
    chance += (20 - character.age) * 0.003; // +0.3% par année en-dessous de 20 ans
  }
  
  // S'assurer que la chance reste dans des limites raisonnables
  return Math.max(0.01, Math.min(0.3, chance));
};
