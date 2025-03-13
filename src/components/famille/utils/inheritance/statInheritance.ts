
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
