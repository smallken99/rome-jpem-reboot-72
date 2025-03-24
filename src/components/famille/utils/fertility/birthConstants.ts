
import { Season } from '@/utils/timeSystem';

// Taux de natalité de base (annuel, en pourcentage)
export const BASE_BIRTH_RATE = 15;

// Modificateurs d'âge pour la fertilité
export const AGE_MODIFIERS = {
  // Tranche d'âge: modificateur (en points de pourcentage)
  16: 0, // 16 ans et moins: impossible
  20: 5, // 17-20 ans: +5% 
  25: 8, // 21-25 ans: +8%
  30: 5, // 26-30 ans: +5%
  35: 0, // 31-35 ans: normal
  40: -5, // 36-40 ans: -5%
  45: -10, // 41-45 ans: -10%
  50: -15, // 46-50 ans: -15%
  100: -100 // 51 ans et plus: impossible
};

// Modificateurs saisonniers
export const SEASON_MODIFIERS: Partial<Record<Season, number>> = {
  'Ver': 3, // Printemps: +3%
  'Aestas': 1, // Été: +1%
  'Autumnus': -1, // Automne: -1%
  'Hiems': -3 // Hiver: -3%
};

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

// Modificateurs basés sur la santé et d'autres caractéristiques
export const HEALTH_FERTILITY_MODIFIERS = {
  // Santé: modificateur
  excellent: 5, // +5% si santé excellente
  good: 2, // +2% si bonne santé
  average: 0, // pas de modificateur si santé moyenne
  poor: -5, // -5% si santé fragile
  bad: -10 // -10% si mauvaise santé
};

// Modificateurs liés au statut marital et à d'autres facteurs sociaux
export const SOCIAL_FERTILITY_MODIFIERS = {
  married: 5, // +5% si marié
  unmarried: -10, // -10% si non marié (unions hors mariage moins fréquentes)
  highStatus: 2, // +2% pour statut social élevé (meilleure alimentation, soins)
  lowStatus: -2 // -2% pour statut social bas
};

// Temps minimum entre deux naissances (en saisons)
export const MIN_SEASONS_BETWEEN_BIRTHS = 4; // Environ 1 an

// Temps de gestation (en saisons)
export const GESTATION_PERIOD = 3; // Environ 9 mois
