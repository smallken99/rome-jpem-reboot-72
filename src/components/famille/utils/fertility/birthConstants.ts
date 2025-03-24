
import { Season } from '@/utils/timeSystem';

// Taux de natalité de base (annuel, en pourcentage)
export const BASE_BIRTH_RATE = 15;
export const BASE_BIRTH_CHANCE_PER_YEAR = 0.15; // 15% de chance par an

// Âges limites pour la reproduction
export const MIN_MATERNAL_AGE = 16;
export const MAX_MATERNAL_AGE = 45;
export const MIN_PATERNAL_AGE = 16;
export const MAX_PATERNAL_AGE = 70;

// Chance d'avoir un garçon vs une fille
export const MALE_CHANCE = 0.52; // 52% de chance d'avoir un garçon

// Modificateurs saisonniers
export const SEASON_MODIFIERS: Partial<Record<Season, number>> = {
  'Ver': 3, // Printemps: +3%
  'Aestas': 1, // Été: +1%
  'Autumnus': -1, // Automne: -1%
  'Hiems': -3 // Hiver: -3%
};

// Version exportée avec un nom différent pour la compatibilité
export const SEASONAL_BIRTH_MODIFIERS = SEASON_MODIFIERS;

// Chance de naissance gémellaire
export const TWIN_CHANCE = 3; // 3%

// Chance de complication à la naissance (pouvant entraîner la mort)
export const BIRTH_COMPLICATION_CHANCE = {
  base: 5, // 5% chance de base
  ageModifiers: {
    20: 2, // +2% si moins de 20 ans
    35: 0, // Normal entre 20 et 35 ans
    100: 8 // +8% si plus de 35 ans
  }
};

// Temps minimum entre deux naissances (en années)
export const MIN_YEARS_BETWEEN_BIRTHS = 1; // Au moins 1 an entre les naissances

// Temps de gestation (en saisons)
export const GESTATION_PERIOD = 3; // Environ 9 mois
