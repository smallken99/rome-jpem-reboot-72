
import { Character } from '@/types/character';

export interface FertilityFactors {
  maternalHealth: number;
  paternalHealth: number;
  familyFertility: number;
  previousBirths: number;
  miscarriageChance: number;
}

/**
 * Génère les facteurs de fertilité pour un couple
 */
export const generateFertilityFactors = (
  wife: Character,
  husband?: Character
): FertilityFactors => {
  // Facteur de santé maternelle (de 0.5 à 1.5)
  const maternalHealth = wife.healthStatus ? 
    calculateHealthFactor(wife.healthStatus) : 
    1.0;
  
  // Facteur de santé paternelle (de 0.8 à 1.2)
  const paternalHealth = husband && husband.healthStatus ? 
    calculateHealthFactor(husband.healthStatus, 0.8, 1.2) : 
    1.0;
  
  // Facteur de fertilité familiale (de 0.8 à 1.3)
  // Simuler une tendance familiale à avoir plus ou moins d'enfants
  const familyFertility = wife.familyFertility || husband?.familyFertility || 1.0;
  
  // Nombre d'enfants déjà nés
  const previousBirths = wife.children?.length || 0;
  
  // Risque de fausse couche (5-15% selon l'âge et la santé)
  const miscarriageChance = calculateMiscarriageChance(wife);
  
  return {
    maternalHealth,
    paternalHealth,
    familyFertility,
    previousBirths,
    miscarriageChance
  };
};

/**
 * Calcule un facteur basé sur la santé
 */
const calculateHealthFactor = (
  health: string, 
  min: number = 0.5, 
  max: number = 1.5
): number => {
  switch (health.toLowerCase()) {
    case 'excellent':
      return max;
    case 'good':
      return min + (max - min) * 0.75;
    case 'average':
      return min + (max - min) * 0.5;
    case 'poor':
      return min + (max - min) * 0.25;
    case 'bad':
      return min;
    default:
      return min + (max - min) * 0.5; // Valeur moyenne par défaut
  }
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
  
  // Facteur de santé
  if (character.healthStatus) {
    switch (character.healthStatus.toLowerCase()) {
      case 'bad':
        chance += 0.1; // +10%
        break;
      case 'poor':
        chance += 0.05; // +5%
        break;
      case 'excellent':
        chance -= 0.02; // -2%
        break;
    }
  }
  
  // S'assurer que la chance reste dans des limites raisonnables
  return Math.max(0.01, Math.min(0.3, chance));
};
