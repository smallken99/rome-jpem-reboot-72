
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

// Economic factors for fertility
export const ECONOMY_FERTILITY_FACTORS = {
  WEALTH_THRESHOLD_LOW: 1000000,   // Seuil de richesse bas (1M As)
  WEALTH_THRESHOLD_HIGH: 5000000,  // Seuil de richesse élevé (5M As)
  WEALTH_MODIFIER_LOW: -0.05,      // Modificateur pour richesse basse (-5%)
  WEALTH_MODIFIER_HIGH: 0.05,      // Modificateur pour richesse élevée (+5%)
  INCOME_STABILITY_MODIFIER: 0.03, // Modificateur pour stabilité des revenus (+3%)
};

// Statut social et fertilité
export const SOCIAL_FERTILITY_FACTORS = {
  PATRICIAN_MODIFIER: 0.02,     // Bonus de fertilité pour les patriciens (+2%)
  HIGH_PRESTIGE_THRESHOLD: 70,  // Seuil de prestige élevé
  PRESTIGE_MODIFIER: 0.04,      // Bonus pour prestige élevé (+4%)
  CLIENT_NETWORK_FACTOR: 0.001, // Bonus par client dans le réseau (0.1% par client)
};

// Facteurs liés à la santé
export const HEALTH_FERTILITY_FACTORS = {
  BASE_HEALTH_THRESHOLD: 60,   // Santé minimale pour fertilité normale
  LOW_HEALTH_PENALTY: -0.1,    // Pénalité pour santé basse (-10%)
  HIGH_HEALTH_BONUS: 0.05,     // Bonus pour santé excellente (+5%)
  HEALTH_EXCELLENT_THRESHOLD: 85, // Seuil pour santé excellente
};
