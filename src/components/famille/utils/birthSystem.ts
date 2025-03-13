
import { Character } from '@/types/character';
import { Season } from '@/utils/timeSystem';
import { generateRomanName } from './naming/romanNameGenerator';
import { generateBaseStat } from './inheritance/statInheritance';
import { 
  BASE_BIRTH_CHANCE_PER_YEAR, 
  MIN_MATERNAL_AGE, 
  MAX_MATERNAL_AGE,
  MIN_PATERNAL_AGE,
  MAX_PATERNAL_AGE,
  MALE_CHANCE,
  SEASONAL_BIRTH_MODIFIERS 
} from './fertility/birthConstants';
import { generateFertilityFactors } from './fertility/fertilityFactors';

/**
 * Determines if a birth occurs for a married couple
 */
export const checkForBirth = (wife: Character, husband?: Character, season: Season = 'Ver'): boolean => {
  if (wife.age < MIN_MATERNAL_AGE || wife.age > MAX_MATERNAL_AGE) {
    return false;
  }
  
  if (!husband) {
    return false; // Pas de mari, pas d'enfant
  }
  
  if (husband.age < MIN_PATERNAL_AGE || husband.age > MAX_PATERNAL_AGE) {
    return false;
  }
  
  // Obtenir les facteurs de fertilité
  const fertilityFactors = generateFertilityFactors(wife, husband);
  
  // Calcul de la chance de base ajustée
  let adjustedChance = BASE_BIRTH_CHANCE_PER_YEAR;
  
  // Ajustement par âge maternel
  if (wife.age >= 20 && wife.age <= 30) {
    adjustedChance += 0.1;
  } else if (wife.age > 35) {
    adjustedChance -= (wife.age - 35) * 0.025; // Diminution plus rapide après 35 ans
  }
  
  // Appliquer les facteurs de fertilité
  adjustedChance *= fertilityFactors.maternalHealth;
  adjustedChance *= fertilityFactors.paternalHealth;
  adjustedChance *= fertilityFactors.familyFertility;
  
  // Réduire la chance après plusieurs naissances
  if (fertilityFactors.previousBirths > 0) {
    adjustedChance *= Math.max(0.6, 1 - (fertilityFactors.previousBirths * 0.1));
  }
  
  // Appliquer le modificateur saisonnier
  adjustedChance += SEASONAL_BIRTH_MODIFIERS[season];
  
  // Assurer que la chance est dans des limites raisonnables
  adjustedChance = Math.max(0.02, Math.min(0.4, adjustedChance));
  
  // Vérifier si une naissance se produit
  const birthOccurs = Math.random() < adjustedChance;
  
  // Si une naissance se produit, vérifier s'il y a une fausse couche
  if (birthOccurs && Math.random() < fertilityFactors.miscarriageChance) {
    // Une fausse couche s'est produite, pas de naissance
    return false;
  }
  
  return birthOccurs;
};

/**
 * Generate a new child character
 */
export const generateChild = (
  father: Character, 
  mother: Character
): Character => {
  // Determine gender
  const gender: 'male' | 'female' = Math.random() < MALE_CHANCE ? 'male' : 'female';
  
  // Get family name from father's name (usually the nomen, like "Aurelius" in "Marcus Aurelius")
  const nameParts = father.name.split(' ');
  const familyName = nameParts.length > 1 ? nameParts[1] : nameParts[0];
  
  // Generate name
  const name = generateRomanName(gender, familyName);
  
  // Create the child character
  return {
    id: `child-${Date.now()}`,
    name,
    age: 0,
    gender,
    role: gender === 'male' ? 'Fils' : 'Fille',
    isPlayer: false,
    stats: {
      popularity: {
        name: 'Popularité',
        value: generateBaseStat(father.stats.popularity, mother.stats.popularity),
        maxValue: 200,
        icon: 'popularity',
        description: 'Influence naissante dans les cercles sociaux',
        color: 'gold'
      },
      oratory: {
        name: 'Éloquence',
        value: generateBaseStat(father.stats.oratory, mother.stats.oratory),
        maxValue: 200,
        icon: 'oratory',
        description: 'Aptitude naturelle à la communication',
        color: 'terracotta'
      },
      piety: {
        name: 'Piété',
        value: generateBaseStat(father.stats.piety, mother.stats.piety),
        maxValue: 200,
        icon: 'piety',
        description: 'Connexion aux traditions religieuses familiales',
        color: 'navy'
      },
      martialEducation: {
        name: 'Éducation Martiale',
        value: gender === 'male' ? 
          generateBaseStat(father.stats.martialEducation, mother.stats.martialEducation) : 0,
        maxValue: 200,
        icon: 'martialEducation',
        description: gender === 'male' ? 
          'Potentiel pour l\'entraînement martial futur' : 
          'Connaissance des stratégies militaires (non disponible)',
        color: 'red'
      }
    }
  };
};
