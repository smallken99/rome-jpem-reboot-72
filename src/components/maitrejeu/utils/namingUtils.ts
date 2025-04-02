
/**
 * Utility functions to handle naming conventions across the application
 */

// Convenience helper to convert between different naming schemes in different parts of the codebase
export const convertPoliticalTerms = {
  // Convert populares/populaires
  getPopulares: (obj: any) => {
    return obj.populares !== undefined ? obj.populares : (obj.populaires !== undefined ? obj.populaires : 0);
  },
  
  // Convert optimates/optimes
  getOptimates: (obj: any) => {
    return obj.optimates !== undefined ? obj.optimates : (obj.optimes !== undefined ? obj.optimes : 0);
  },
  
  // Convert moral/morale
  getMorale: (obj: any) => {
    return obj.morale !== undefined ? obj.morale : (obj.moral !== undefined ? obj.moral : 0);
  },
  
  // Convert piety/piete
  getPiety: (obj: any) => {
    return obj.piete !== undefined ? obj.piete : (obj.piety !== undefined ? obj.piety : 0);
  }
};

// Adapts property names from one format to another
export const adaptPropertyNames = <T extends Record<string, any>>(obj: T, mappings: Record<string, string>): T => {
  const result = { ...obj };
  
  for (const [oldName, newName] of Object.entries(mappings)) {
    if (oldName in result) {
      result[newName] = result[oldName];
      delete result[oldName];
    }
  }
  
  return result;
};
