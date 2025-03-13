
import { CharacterStat } from '@/types/character';
import { getStatValue } from '@/utils/characterUtils';

/**
 * Generates a base stat value for a child based on parents' stats
 */
export const generateBaseStat = (fatherStat: number | CharacterStat, motherStat: number | CharacterStat) => {
  // 70% influence from parents, 30% random
  const baseValue = (getStatValue(fatherStat) + getStatValue(motherStat)) / 2;
  const randomVariation = Math.floor(Math.random() * 40) - 20; // -20 to +20
  return Math.max(50, Math.min(100, Math.floor(baseValue * 0.7) + randomVariation));
};

/**
 * Applies economic factors to character stats during inheritance
 */
export const applyEconomicFactorsToStats = (
  stats: Record<string, number>,
  familyWealth: number,
  propertyCount: number
) => {
  // Wealth impacts education and social skills
  if (familyWealth > 5000000) { // Rich family
    stats.education = Math.min(100, stats.education + 10);
    stats.eloquence = Math.min(100, stats.eloquence + 5);
    stats.negotation = Math.min(100, stats.negotation + 5);
  } else if (familyWealth < 1000000) { // Struggling family
    stats.education = Math.max(40, stats.education - 10);
  }
  
  // Property ownership impacts status and connections
  if (propertyCount > 5) {
    stats.status = Math.min(100, stats.status + 10);
  }
  
  return stats;
};

/**
 * Calculates economic inheritance based on family assets and laws
 */
export const calculateEconomicInheritance = (
  totalAssets: number,
  numberOfSons: number,
  numberOfDaughters: number,
  isPatrician: boolean
) => {
  // Roman inheritance typically favored sons
  const maleShare = isPatrician ? 0.85 : 0.75; // Patricians were more traditional
  const femaleShare = 1 - maleShare;
  
  const totalMaleInheritance = totalAssets * maleShare;
  const totalFemaleInheritance = totalAssets * femaleShare;
  
  // Calculate individual shares
  const singleSonShare = numberOfSons > 0 ? totalMaleInheritance / numberOfSons : 0;
  const singleDaughterShare = numberOfDaughters > 0 ? totalFemaleInheritance / numberOfDaughters : 0;
  
  return {
    singleSonShare,
    singleDaughterShare,
    totalMaleInheritance,
    totalFemaleInheritance
  };
};
