
import { Character, CharacterStat } from '@/types/character';
import { romanNames } from '@/components/famille/education/data/romanNames';
import { Season } from '@/utils/timeSystem';
import { getStatValue } from '@/utils/characterUtils';

// Constants for birth system
const BASE_BIRTH_CHANCE_PER_YEAR = 0.2; // Base chance par an (20%)
const MIN_MATERNAL_AGE = 16;
const MAX_MATERNAL_AGE = 40;
const MIN_PATERNAL_AGE = 16;
const MAX_PATERNAL_AGE = 60;

// Gender distribution (slightly more males due to Roman preference)
const MALE_CHANCE = 0.55;

// Seasonal birth rate modifiers
const SEASONAL_BIRTH_MODIFIERS: Record<Season, number> = {
  'Ver': 0.05,      // Printemps: +5% (saison de fertilité)
  'Aestas': 0.02,   // Été: +2%
  'Autumnus': -0.02, // Automne: -2%
  'Hiems': -0.05    // Hiver: -5% (conditions difficiles)
};

// Facteurs de fécondité
interface FertilityFactors {
  maternalHealth: number;   // Santé de la mère (0-1)
  paternalHealth: number;   // Santé du père (0-1)
  previousBirths: number;   // Nombre de naissances précédentes
  miscarriageChance: number; // Risque de fausse couche (0-1)
  familyFertility: number;  // Fertilité familiale héréditaire (0.5-1.5)
}

// Cache pour stocker les facteurs de fertilité par famille
const familyFertilityCache: Record<string, number> = {};

const romanNamePrefixes = romanNames.map(name => name.split(' ')[0]);
const romanNameSuffixes = romanNames.map(name => name.split(' ')[1]);

/**
 * Génère des facteurs de fertilité pour un couple
 */
const generateFertilityFactors = (wife: Character, husband: Character): FertilityFactors => {
  // Extraire le nom de famille du mari pour la fertilitéa familiale
  const familyName = husband.name.split(' ')[1] || husband.name;
  
  // Créer ou récupérer la fertilité familiale héréditaire
  if (!familyFertilityCache[familyName]) {
    // Fertilité familiale entre 0.5 et 1.5 (certaines familles sont naturellement plus fertiles)
    familyFertilityCache[familyName] = 0.5 + Math.random();
  }
  
  // Santé maternelle basée sur l'âge et les statistiques
  const maternalHealthBase = wife.age >= 20 && wife.age <= 30 ? 0.9 : 0.7;
  const maternalHealthMod = Math.min(getStatValue(wife.stats.piety) / 200, 0.5); // La piété influence la santé
  const maternalHealth = Math.min(maternalHealthBase + maternalHealthMod, 1);
  
  // Santé paternelle
  const paternalHealthBase = husband.age >= 25 && husband.age <= 45 ? 0.9 : 0.7;
  const paternalHealthMod = Math.min(getStatValue(husband.stats.piety) / 200, 0.5);
  const paternalHealth = Math.min(paternalHealthBase + paternalHealthMod, 1);
  
  // Nombre de naissances précédentes (estimation)
  const previousBirths = Math.min(wife.age - MIN_MATERNAL_AGE, 0) / 3;
  
  // Risque de fausse couche augmente avec l'âge
  let miscarriageChance = 0.05; // 5% de base
  if (wife.age > 35) {
    miscarriageChance += (wife.age - 35) * 0.02; // +2% par an après 35 ans
  }
  
  return {
    maternalHealth,
    paternalHealth,
    previousBirths,
    miscarriageChance,
    familyFertility: familyFertilityCache[familyName]
  };
};

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
  const generateBaseStat = (fatherStat: number | CharacterStat, motherStat: number | CharacterStat) => {
    // 70% influence from parents, 30% random
    const baseValue = (getStatValue(fatherStat) + getStatValue(motherStat)) / 2;
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
