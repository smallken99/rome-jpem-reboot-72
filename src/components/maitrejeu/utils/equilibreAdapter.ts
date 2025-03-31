
import { Equilibre } from '../types/equilibre';

/**
 * Gets a specific economic stability value from an equilibre object
 */
export function getEconomicStability(equilibre: Equilibre): number {
  if (!equilibre || !equilibre.economie) return 50;
  
  // If economie is already a number, return it
  if (typeof equilibre.economie === 'number') {
    return equilibre.economie;
  }
  
  // Otherwise calculate average from economie object properties
  const { stabilite, croissance, commerce, agriculture } = equilibre.economie;
  return Math.round((stabilite + croissance + commerce + agriculture) / 4);
}

/**
 * Normalize an equilibre object to ensure it has all required properties
 */
export function normalizeEquilibre(data: Partial<Equilibre>): Equilibre {
  // Default values
  const defaultEquilibre: Equilibre = {
    politique: { populaires: 33, optimates: 33, moderates: 34 },
    populaires: 33,
    populares: 33, 
    optimates: 33,
    moderates: 34,
    economie: { stabilite: 50, croissance: 50, commerce: 50, agriculture: 50 },
    social: { plebeiens: 85, patriciens: 15, esclaves: 30, cohesion: 50, plébéiens: 85 },
    plébéiens: 85,
    patriciens: 15,
    militaire: { moral: 50, effectifs: 50, equipement: 50, discipline: 50 },
    religion: { piete: 50, traditions: 50, superstition: 50 },
    stability: 50,
    armée: 50,
    loyauté: 50,
    morale: 50,
    facteurJuridique: 50,
    historique: [],
    risques: {}
  };
  
  // Create a new object with both data and default values
  const result = { ...defaultEquilibre, ...data };
  
  // Handle special cases for nested objects with potential different property names
  if (data.politique) {
    result.politique = { ...defaultEquilibre.politique, ...data.politique };
    // Sync between nested and direct properties
    result.populaires = result.politique.populaires;
    result.populares = result.politique.populaires;
    result.optimates = result.politique.optimates;
    result.moderates = result.politique.moderates;
  } else {
    // If politique object is not provided, build it from direct properties
    if (data.populaires) {
      result.politique.populaires = data.populaires;
      result.populares = data.populaires;
    } else if (data.populares) {
      result.politique.populaires = data.populares;
      result.populaires = data.populares;
    }
    
    if (data.optimates) result.politique.optimates = data.optimates;
    if (data.moderates) result.politique.moderates = data.moderates;
  }
  
  // Handle social data sync
  if (data.social) {
    result.social = { ...defaultEquilibre.social, ...data.social };
    // Check for alternate spelling and sync both ways
    if (data.social.plébéiens !== undefined) {
      result.social.plebeiens = data.social.plébéiens;
    } else if (data.social.plebeiens !== undefined) {
      result.social.plébéiens = data.social.plebeiens;
    }
    // Sync between nested and direct properties
    result.plébéiens = result.social.plebeiens;
    result.patriciens = result.social.patriciens;
  } else {
    // If social object is not provided, build it from direct properties
    if (data.plébéiens !== undefined) {
      result.social.plebeiens = data.plébéiens;
      result.social.plébéiens = data.plébéiens;
    }
    if (data.patriciens !== undefined) result.social.patriciens = data.patriciens;
  }
  
  // Handle economie data
  if (data.economie) {
    result.economie = { ...defaultEquilibre.economie, ...data.economie };
  } else if (data.économie) {
    result.economie = { ...defaultEquilibre.economie, ...data.économie };
    result.économie = result.economie;
  }
  
  return result;
}

/**
 * Get a specific value from the equilibre object by path
 */
export function getEquilibreValue(equilibre: Equilibre, path: string, defaultValue: number = 0): number {
  const parts = path.split('.');
  let current: any = equilibre;
  
  for (const part of parts) {
    if (current == null) return defaultValue;
    current = current[part];
  }
  
  if (typeof current === 'object' && current !== null) {
    // If we end up with an object but want a number, try to average its values
    if (Object.keys(current).length === 0) return defaultValue;
    
    const sum = Object.values(current).reduce((acc: number, val: any) => {
      return acc + (typeof val === 'number' ? val : 0);
    }, 0);
    
    return sum / Object.keys(current).length;
  }
  
  return typeof current === 'number' ? current : defaultValue;
}

/**
 * Update an equilibre object with new values
 */
export function updateEquilibre(
  currentEquilibre: Equilibre,
  updates: Partial<Equilibre>
): Equilibre {
  // First normalize both objects
  const normalizedCurrent = normalizeEquilibre(currentEquilibre);
  const result = { ...normalizedCurrent };
  
  // Apply direct updates to the result
  Object.entries(updates).forEach(([key, value]) => {
    if (key in result) {
      (result as any)[key] = value;
    }
  });
  
  // Specific handling for nested objects
  if (updates.politique) {
    result.politique = { ...result.politique, ...updates.politique };
    // Sync direct access properties
    result.populaires = result.politique.populaires;
    result.populares = result.politique.populaires;
    result.optimates = result.politique.optimates;
    result.moderates = result.politique.moderates;
  }
  
  if (updates.social) {
    result.social = { ...result.social, ...updates.social };
    // Handle alternate spelling
    if ('plébéiens' in updates.social) {
      result.social.plebeiens = updates.social.plébéiens as number;
    }
    // Sync direct access properties
    result.plébéiens = result.social.plebeiens;
    result.patriciens = result.social.patriciens;
  }
  
  if (updates.economie) {
    result.economie = { ...result.economie, ...updates.economie };
    // If économie is used anywhere, sync it
    result.économie = result.economie;
  }
  
  return result;
}

/**
 * Function used to update faction balance specifically
 */
export function updateFactionBalance(
  currentEquilibre: Equilibre,
  populares: number,
  optimates: number,
  moderates: number
): Equilibre {
  const normalizedCurrent = normalizeEquilibre(currentEquilibre);
  
  return {
    ...normalizedCurrent,
    populares,
    populaires: populares,
    optimates,
    moderates,
    politique: {
      ...normalizedCurrent.politique,
      populaires: populares,
      optimates,
      moderates
    }
  };
}

/**
 * Utility functions for formatting dates
 */
export function formatAnyDate(date: string | Date | { year: number; season: string }): string {
  if (typeof date === 'string') {
    return date;
  } else if (date instanceof Date) {
    return date.toLocaleDateString();
  } else {
    return `${date.season} ${date.year}`;
  }
}

/**
 * Check if a value is a GameDate object
 */
export function isGameDate(date: any): boolean {
  return date && 
         typeof date === 'object' && 
         !Array.isArray(date) && 
         'year' in date && 
         'season' in date;
}
