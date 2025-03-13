
import { Season } from '@/utils/timeSystem';

// Constants for birth system
export const BASE_BIRTH_CHANCE_PER_YEAR = 0.2; // Base chance par an (20%)
export const MIN_MATERNAL_AGE = 16;
export const MAX_MATERNAL_AGE = 40;
export const MIN_PATERNAL_AGE = 16;
export const MAX_PATERNAL_AGE = 60;

// Gender distribution (slightly more males due to Roman preference)
export const MALE_CHANCE = 0.55;

// Seasonal birth rate modifiers
export const SEASONAL_BIRTH_MODIFIERS: Record<Season, number> = {
  'Ver': 0.05,      // Printemps: +5% (saison de fertilité)
  'Aestas': 0.02,   // Été: +2%
  'Autumnus': -0.02, // Automne: -2%
  'Hiems': -0.05    // Hiver: -5% (conditions difficiles)
};
