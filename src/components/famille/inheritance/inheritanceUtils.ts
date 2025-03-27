
import { Character } from '@/types/character';

/**
 * Calcule l'affinité entre deux caractères
 */
export const calculateAffinity = (character1: Character, character2: Character): number => {
  let affinity = 50; // Base affinity is neutral
  
  // Si même genre, légère affinité
  if (character1.gender === character2.gender) {
    affinity += 5;
  }
  
  // Si relation de parenté directe
  if (character2.parentIds?.includes(character1.id)) {
    affinity += 15; // Parent-enfant: forte affinité
  }
  
  // Si frères/soeurs (mêmes parents)
  const hasSameParents = 
    character1.parentIds && 
    character2.parentIds && 
    character1.parentIds.some(id => character2.parentIds?.includes(id));
  
  if (hasSameParents) {
    affinity += 10; // Fratrie: bonne affinité
  }
  
  // Si traits compatibles
  const commonTraits = character1.traits.filter(trait => 
    character2.traits.includes(trait)
  );
  
  affinity += commonTraits.length * 3; // Chaque trait commun augmente l'affinité
  
  // Influence de l'âge (les personnages aux âges proches ont plus d'affinité)
  const ageDifference = Math.abs(character1.age - character2.age);
  if (ageDifference < 5) {
    affinity += 5;
  } else if (ageDifference > 20) {
    affinity -= 5;
  }
  
  // Vérifier si la relation est explicitement mentionnée
  if (character1.relation.includes('Père') && character2.relation.includes('Fils')) {
    affinity += 10;
  }
  
  if (character1.relation.includes('Mère') && character2.relation.includes('Fille')) {
    affinity += 12;
  }
  
  return Math.min(100, Math.max(0, affinity)); // Ensure affinity is between 0 and 100
};

/**
 * Calculate heir score for inheritance
 */
export const calculateHeirScore = (character: Character, headOfFamily: Character): number => {
  if (!character || !headOfFamily) return 0;
  
  let score = 0;
  
  // Hommes favorisés dans la société romaine
  if (character.gender === 'male') {
    score += 50;
  }
  
  // Santé
  score += character.health / 5;
  
  // L'âge est important (ni trop jeune ni trop vieux)
  if (character.age >= 16 && character.age < 40) {
    score += 20;
  } else if (character.age >= 40 && character.age < 60) {
    score += 10;
  }
  
  // Héritier désigné
  if (character.isHeadOfFamily) {
    score += 100;
  }
  
  // Statut (vivant > exilé > décédé)
  if (character.status === 'alive') {
    score += 30;
  } else if (character.status === 'exiled') {
    score -= 50;
  } else if (character.status === 'deceased') {
    score -= 100; // Les morts ne peuvent hériter
  }
  
  // Lien de parenté (fils > frères > neveux)
  if (character.relation.includes('Fils')) {
    score += 30;
  } else if (character.relation.includes('Frère')) {
    score += 15;
  }
  
  return score;
};

/**
 * Get eligible heirs for inheritance
 */
export const getEligibleHeirs = (
  headOfFamily: Character, 
  allCharacters: Character[]
): Character[] => {
  if (!headOfFamily) return [];
  
  // Filtrer les personnages décédés
  const livingCharacters = allCharacters.filter(c => c.status === 'alive');
  
  // Calculer le score pour chaque personnage
  const scoredCharacters = livingCharacters.map(character => ({
    character,
    score: calculateHeirScore(character, headOfFamily)
  }));
  
  // Trier par score décroissant
  scoredCharacters.sort((a, b) => b.score - a.score);
  
  // Retourner uniquement les personnages
  return scoredCharacters.map(sc => sc.character);
};
