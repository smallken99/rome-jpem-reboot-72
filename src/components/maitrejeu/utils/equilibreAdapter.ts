
import { Equilibre, Risk } from '../types/equilibre';

/**
 * Normalizes an Equilibre object to ensure all properties are properly set
 * This helps with compatibility across different parts of the application
 */
export function normalizeEquilibre(input: Partial<Equilibre>): Equilibre {
  // Define default values
  const defaultEquilibre: Equilibre = {
    politique: { populaires: 33, optimates: 33, moderates: 34 },
    populaires: 33,
    populares: 33,
    optimates: 33,
    moderates: 34,
    
    economie: { stabilite: 50, croissance: 50, commerce: 50, agriculture: 50 },
    
    social: { plebeiens: 50, patriciens: 50, esclaves: 0, cohesion: 50 },
    plébéiens: 50,
    patriciens: 50,
    
    militaire: { moral: 70, effectifs: 60, equipement: 65, discipline: 75 },
    
    religion: { piete: 80, traditions: 85, superstition: 70 },
    
    stability: 60,
    armée: 65,
    loyauté: 70,
    morale: 65,
    facteurJuridique: 55,
    
    historique: [],
    risques: {}
  };

  // Create a new object with default values
  const normalized: Equilibre = { ...defaultEquilibre };
  
  // Apply input values if they exist
  if (input) {
    // Copy all input properties
    Object.assign(normalized, input);
    
    // Ensure nested objects are properly set
    if (input.politique) {
      normalized.politique = { ...normalized.politique, ...input.politique };
      normalized.populaires = input.politique.populaires;
      normalized.populares = input.politique.populaires;
      normalized.optimates = input.politique.optimates;
      normalized.moderates = input.politique.moderates;
    }
    
    if (input.social) {
      normalized.social = { ...normalized.social, ...input.social };
      normalized.patriciens = input.social.patriciens;
      normalized.plébéiens = input.social.plebeiens;
      normalized.social.plébéiens = input.social.plebeiens;
    }
    
    if (input.economie) {
      if (typeof input.economie === 'number') {
        // Handle case where economie is just a number
        normalized.economie = {
          stabilite: input.economie,
          croissance: input.economie,
          commerce: input.economie,
          agriculture: input.economie
        };
      } else {
        normalized.economie = { ...normalized.economie, ...input.economie };
      }
    }
    
    if (input.militaire) {
      normalized.militaire = { ...normalized.militaire, ...input.militaire };
    }
    
    if (input.religion) {
      if (typeof input.religion === 'number') {
        // Handle case where religion is just a number
        normalized.religion = {
          piete: input.religion,
          traditions: input.religion,
          superstition: input.religion
        };
      } else {
        normalized.religion = { ...normalized.religion, ...input.religion };
      }
    }
    
    // Ensure risques is at least an empty object
    normalized.risques = input.risques || {};
    
    // Ensure historique is at least an empty array
    normalized.historique = input.historique || [];
  }
  
  return normalized;
}

/**
 * Gets an economic stability value from Equilibre
 */
export function getEconomicStability(equilibre: Equilibre): number {
  if (typeof equilibre.economie === 'number') {
    return equilibre.economie;
  }
  
  // Calculate the average of all economic factors
  return (
    equilibre.economie.stabilite +
    equilibre.economie.croissance +
    equilibre.economie.commerce +
    equilibre.economie.agriculture
  ) / 4;
}

/**
 * Gets a religion value from Equilibre
 */
export function getReligionValue(equilibre: Equilibre): number {
  if (typeof equilibre.religion === 'number') {
    return equilibre.religion;
  }
  
  // Calculate the average of all religion factors
  return (
    equilibre.religion.piete +
    equilibre.religion.traditions +
    equilibre.religion.superstition
  ) / 3;
}

/**
 * Adds a risk to the Equilibre
 */
export function addRisk(equilibre: Equilibre, risk: Risk): Equilibre {
  const updated = { ...equilibre };
  updated.risques = { ...updated.risques, [risk.id]: risk };
  return updated;
}

/**
 * Removes a risk from the Equilibre
 */
export function removeRisk(equilibre: Equilibre, riskId: string): Equilibre {
  const updated = { ...equilibre };
  const { [riskId]: _, ...remainingRisks } = updated.risques;
  updated.risques = remainingRisks;
  return updated;
}
