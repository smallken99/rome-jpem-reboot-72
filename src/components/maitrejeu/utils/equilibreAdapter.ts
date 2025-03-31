
import { Equilibre } from '../types/equilibre';

/**
 * Adapts different equilibre formats to ensure compatibility
 */
export function adaptEquilibre(equilibre: any): Equilibre {
  if (!equilibre) {
    // Return default equilibre if none provided
    return {
      politique: { populaires: 33, optimates: 33, moderates: 34 },
      populaires: 33,
      populares: 33,
      optimates: 33,
      moderates: 34,
      economie: { stabilite: 50, croissance: 50, commerce: 50, agriculture: 50 },
      social: { plebeiens: 40, patriciens: 40, esclaves: 20, cohesion: 60 },
      militaire: { moral: 70, effectifs: 60, equipement: 65, discipline: 75 },
      religion: { piete: 80, traditions: 85, superstition: 70 }
    };
  }

  // Ensure all required fields are present
  const adapted: Equilibre = {
    politique: { 
      populaires: 0, 
      optimates: 0, 
      moderates: 0 
    },
    populaires: 0,
    populares: 0,
    optimates: 0,
    moderates: 0,
    economie: { 
      stabilite: 0, 
      croissance: 0, 
      commerce: 0, 
      agriculture: 0 
    },
    social: { 
      plebeiens: 0, 
      patriciens: 0, 
      esclaves: 0, 
      cohesion: 0 
    },
    militaire: { 
      moral: 0, 
      effectifs: 0, 
      equipement: 0, 
      discipline: 0 
    },
    religion: { 
      piete: 0, 
      traditions: 0, 
      superstition: 0 
    },
    ...equilibre
  };

  // Handle political equilibrium
  if (equilibre.political) {
    adapted.politique.populaires = equilibre.political.populares || equilibre.political.populaires || 33;
    adapted.politique.optimates = equilibre.political.optimates || 33;
    adapted.politique.moderates = equilibre.political.moderates || 34;
    
    adapted.populaires = adapted.politique.populaires;
    adapted.populares = adapted.politique.populaires;
    adapted.optimates = adapted.politique.optimates;
    adapted.moderates = adapted.politique.moderates;
  } else if (equilibre.politique) {
    adapted.populaires = equilibre.politique.populaires || 33;
    adapted.populares = equilibre.politique.populaires || 33;
    adapted.optimates = equilibre.politique.optimates || 33;
    adapted.moderates = equilibre.politique.moderates || 34;
  }

  // Handle social fields
  if (equilibre.social) {
    if (equilibre.social.plébéiens !== undefined) {
      adapted.social.plébéiens = equilibre.social.plébéiens;
      adapted.plébéiens = equilibre.social.plébéiens;
    } else if (equilibre.social.plebeiens !== undefined) {
      adapted.social.plébéiens = equilibre.social.plebeiens;
      adapted.plébéiens = equilibre.social.plebeiens;
    }
    
    if (equilibre.social.patriciens !== undefined) {
      adapted.patriciens = equilibre.social.patriciens;
    }
  }

  // Handle economic fields - support both object and direct number
  if (typeof equilibre.economie === 'number') {
    adapted.economie = equilibre.economie;
  }
  if (typeof equilibre.économie === 'number') {
    adapted.économie = equilibre.économie;
  }
  if (typeof equilibre.economy === 'number') {
    adapted.economie = equilibre.economy;
  }
  if (typeof equilibre.economicStability === 'number') {
    adapted.economie = equilibre.economicStability;
  }

  // Handle religion fields - support both object and direct number
  if (typeof equilibre.religion === 'number') {
    adapted.religion = equilibre.religion;
  }

  // Handle other stability factors
  if (equilibre.facteurJuridique !== undefined) {
    adapted.facteurJuridique = equilibre.facteurJuridique;
  }
  
  if (equilibre.stability !== undefined) {
    adapted.stability = equilibre.stability;
  }
  
  if (equilibre.armée !== undefined) {
    adapted.armée = equilibre.armée;
  }
  
  if (equilibre.loyauté !== undefined) {
    adapted.loyauté = equilibre.loyauté;
  }
  
  if (equilibre.morale !== undefined) {
    adapted.morale = equilibre.morale;
  }

  // Handle history and risks
  if (equilibre.historique) {
    adapted.historique = equilibre.historique;
  }
  
  if (equilibre.risques) {
    adapted.risques = equilibre.risques;
  }

  return adapted;
}

/**
 * Gets a numeric value from the equilibre, handling both object and direct number
 */
export function getEquilibreNumber(value: any): number {
  if (typeof value === 'number') {
    return value;
  }
  
  if (typeof value === 'object' && value !== null) {
    if ('stabilite' in value) {
      // Average the economic values if it's an object
      return Math.round((value.stabilite + value.croissance + value.commerce + value.agriculture) / 4);
    }
    
    if ('piete' in value) {
      // Average the religion values if it's an object
      return Math.round((value.piete + value.traditions + value.superstition) / 3);
    }
  }
  
  return 0;
}
