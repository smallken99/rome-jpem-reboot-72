
import { Character } from '@/types/character';
import { romanNamePrefixes, romanNameSuffixes } from '@/components/famille/education/EducationData';
import { cn } from '@/lib/utils';

// Constants for birth system
const BIRTH_CHANCE_PER_YEAR = 0.2; // 20% chance per year for a birth
const MIN_MATERNAL_AGE = 16;
const MAX_MATERNAL_AGE = 40;
const MIN_PATERNAL_AGE = 16;
const MAX_PATERNAL_AGE = 60;

// Gender distribution (slightly more males due to Roman preference)
const MALE_CHANCE = 0.55;

/**
 * Determines if a birth occurs for a married couple
 */
export const checkForBirth = (wife: Character): boolean => {
  if (wife.age < MIN_MATERNAL_AGE || wife.age > MAX_MATERNAL_AGE) {
    return false;
  }
  
  // Higher chance when the wife is in prime childbearing years (20-30)
  let adjustedChance = BIRTH_CHANCE_PER_YEAR;
  if (wife.age >= 20 && wife.age <= 30) {
    adjustedChance += 0.1;
  } else if (wife.age > 35) {
    adjustedChance -= 0.1;
  }
  
  return Math.random() < adjustedChance;
};

/**
 * Generate a random Roman name
 */
export const generateRomanName = (gender: 'male' | 'female', familyName: string): string => {
  // For males, use praenomen + family name
  if (gender === 'male') {
    const randomPrefix = romanNamePrefixes[Math.floor(Math.random() * romanNamePrefixes.length)];
    return `${randomPrefix} ${familyName}`;
  } 
  // For females, use feminized family name + possibly "Minor" for younger daughters
  else {
    // Roman women often took the feminine form of the family name
    const femaleName = familyName.endsWith('us') 
      ? familyName.replace(/us$/, 'a') 
      : familyName.endsWith('ius') 
        ? familyName.replace(/ius$/, 'ia')
        : familyName;
        
    // Add "Minor" for younger daughters sometimes
    const isMinor = Math.random() > 0.7;
    return isMinor ? `${femaleName} Minor` : femaleName;
  }
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
  
  // Generate base stats influenced by parents
  const generateBaseStat = (fatherStat: number, motherStat: number) => {
    // 70% influence from parents, 30% random
    const baseValue = (fatherStat + motherStat) / 2;
    const randomVariation = Math.floor(Math.random() * 40) - 20; // -20 to +20
    return Math.max(50, Math.min(100, Math.floor(baseValue * 0.7) + randomVariation));
  };

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
        value: generateBaseStat(father.stats.popularity.value, mother.stats.popularity.value),
        maxValue: 200,
        icon: 'popularity',
        description: 'Influence naissante dans les cercles sociaux',
        color: 'gold'
      },
      oratory: {
        name: 'Éloquence',
        value: generateBaseStat(father.stats.oratory.value, mother.stats.oratory.value),
        maxValue: 200,
        icon: 'oratory',
        description: 'Aptitude naturelle à la communication',
        color: 'terracotta'
      },
      piety: {
        name: 'Piété',
        value: generateBaseStat(father.stats.piety.value, mother.stats.piety.value),
        maxValue: 200,
        icon: 'piety',
        description: 'Connexion aux traditions religieuses familiales',
        color: 'navy'
      },
      martialEducation: {
        name: 'Éducation Martiale',
        value: gender === 'male' ? 
          generateBaseStat(father.stats.martialEducation.value, 0) : 0,
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
