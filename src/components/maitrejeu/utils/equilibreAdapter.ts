
import { Equilibre } from '../types/equilibre';

/**
 * Ensures that the economie property is always an object with the correct structure
 */
export function normalizeEconomie(equilibre: Equilibre): { stabilite: number; croissance: number; commerce: number; agriculture: number } {
  if (typeof equilibre.economie === 'number') {
    // Convert from number to object
    return {
      stabilite: equilibre.economie,
      croissance: equilibre.economie,
      commerce: equilibre.economie,
      agriculture: equilibre.economie
    };
  }
  
  return equilibre.economie;
}

/**
 * Ensures that the religion property is always an object with the correct structure
 */
export function normalizeReligion(equilibre: Equilibre): { piete: number; traditions: number; superstition: number } {
  if (typeof equilibre.religion === 'number') {
    // Convert from number to object
    return {
      piete: equilibre.religion,
      traditions: equilibre.religion,
      superstition: equilibre.religion
    };
  }
  
  return equilibre.religion as { piete: number; traditions: number; superstition: number };
}

/**
 * Ensure an equilibre object has all the expected properties
 */
export function normalizeEquilibre(equilibre: Partial<Equilibre>): Equilibre {
  const normalized: Partial<Equilibre> = { ...equilibre };
  
  // Ensure political properties
  if (!normalized.politique) {
    normalized.politique = {
      populaires: normalized.populaires || normalized.populares || 33,
      optimates: normalized.optimates || 33,
      moderates: normalized.moderates || 34
    };
  }
  
  // Ensure direct access political properties
  normalized.populaires = normalized.populaires || normalized.politique.populaires;
  normalized.populares = normalized.populares || normalized.populaires;
  normalized.optimates = normalized.optimates || normalized.politique.optimates;
  normalized.moderates = normalized.moderates || normalized.politique.moderates;
  
  // Ensure social properties
  if (!normalized.social) {
    normalized.social = {
      plebeiens: normalized.plébéiens || 50,
      patriciens: normalized.patriciens || 50,
      esclaves: 0,
      cohesion: 50
    };
  }
  
  // Ensure direct access social properties
  normalized.plébéiens = normalized.plébéiens || normalized.social.plebeiens;
  normalized.patriciens = normalized.patriciens || normalized.social.patriciens;
  
  // Ensure economie is set
  if (normalized.economie === undefined) {
    normalized.economie = {
      stabilite: 50,
      croissance: 50,
      commerce: 50,
      agriculture: 50
    };
  }
  
  // Ensure religion is set
  if (normalized.religion === undefined) {
    normalized.religion = {
      piete: 50,
      traditions: 50,
      superstition: 50
    };
  }
  
  // Ensure other stability factors
  normalized.stability = normalized.stability || 50;
  normalized.armée = normalized.armée || 50;
  normalized.loyauté = normalized.loyauté || 50;
  normalized.morale = normalized.morale || 50;
  normalized.facteurJuridique = normalized.facteurJuridique || 50;
  
  // Ensure collections
  normalized.historique = normalized.historique || [];
  normalized.risques = normalized.risques || {};
  
  return normalized as Equilibre;
}

/**
 * Creates a string representation of an equilibre value to display in UI
 */
export function getEquilibreValueString(value: unknown): string {
  if (typeof value === 'number') {
    return `${value}%`;
  }
  
  if (typeof value === 'object' && value !== null) {
    // For objects like economie or religion, calculate average
    const values = Object.values(value as Record<string, number>);
    if (values.length > 0) {
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      return `${Math.round(avg)}%`;
    }
  }
  
  return 'N/A';
}

/**
 * Safely gets an equilibre numerical value for comparison
 */
export function getEquilibreValue(value: unknown): number {
  if (typeof value === 'number') {
    return value;
  }
  
  if (typeof value === 'object' && value !== null) {
    // For objects like economie or religion, calculate average
    const values = Object.values(value as Record<string, number>);
    if (values.length > 0) {
      return values.reduce((sum, val) => sum + val, 0) / values.length;
    }
  }
  
  return 0;
}
