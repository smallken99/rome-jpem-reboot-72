
import { Equilibre, normalizeEquilibre } from '../types/equilibre';

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

// Function used to update faction balance specifically
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
