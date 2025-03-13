
import { Character } from '@/types/character';
import { getStatValue } from '@/utils/characterUtils';

// Facteurs de fécondité
export interface FertilityFactors {
  maternalHealth: number;   // Santé de la mère (0-1)
  paternalHealth: number;   // Santé du père (0-1)
  previousBirths: number;   // Nombre de naissances précédentes
  miscarriageChance: number; // Risque de fausse couche (0-1)
  familyFertility: number;  // Fertilité familiale héréditaire (0.5-1.5)
}

// Cache pour stocker les facteurs de fertilité par famille
const familyFertilityCache: Record<string, number> = {};

/**
 * Génère des facteurs de fertilité pour un couple
 */
export const generateFertilityFactors = (wife: Character, husband: Character): FertilityFactors => {
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
  const previousBirths = Math.min(wife.age - 16, 0) / 3;
  
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
