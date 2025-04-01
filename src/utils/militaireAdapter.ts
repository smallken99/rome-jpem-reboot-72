
import { Militaire } from '@/components/maitrejeu/types/equilibre';

/**
 * Adapter utility to handle different field names for the Militaire object
 */
export const militaireAdapter = {
  /**
   * Normalizes a Militaire object to ensure consistent property names
   * Handles conversions between moral/morale, etc.
   */
  normalize(militaire: Partial<Militaire> | any): Militaire {
    if (!militaire) {
      return {
        morale: 0,
        loyaute: 0,
        puissance: 0,
        discipline: 0,
        effectifs: 0,
        equipement: 0
      };
    }

    // Handle the moral/morale inconsistency
    const morale = militaire.morale !== undefined ? militaire.morale : 
                  (militaire.moral !== undefined ? militaire.moral : 0);

    return {
      morale,
      loyaute: militaire.loyaute || (militaire.loyauté !== undefined ? militaire.loyauté : 0),
      puissance: militaire.puissance || 0,
      discipline: militaire.discipline || 0,
      effectifs: militaire.effectifs || 0,
      equipement: militaire.equipement || 0
    };
  },

  /**
   * Converts a classic militaire object to a normalized one
   */
  fromLegacy(legacyMilitaire: any): Militaire {
    return this.normalize({
      morale: legacyMilitaire?.moral || legacyMilitaire?.morale || 0,
      loyaute: legacyMilitaire?.loyauté || legacyMilitaire?.loyaute || 0,
      puissance: legacyMilitaire?.puissance || 0,
      discipline: legacyMilitaire?.discipline || 0,
      effectifs: legacyMilitaire?.effectifs || legacyMilitaire?.troops || 0,
      equipement: legacyMilitaire?.equipement || legacyMilitaire?.equipment || 0
    });
  }
};

/**
 * Adapter utility to handle different field names for the Politique object
 */
export const politiqueAdapter = {
  /**
   * Normalizes a Politique object to ensure consistent property names
   * Handles conversions between populaires/populares, etc.
   */
  normalize(politique: any) {
    if (!politique) {
      return {
        populares: 0,
        optimates: 0,
        moderates: 0
      };
    }

    // Handle the populaires/populares inconsistency
    const populares = politique.populares !== undefined ? politique.populares : 
                      (politique.populaires !== undefined ? politique.populaires : 0);

    return {
      populares,
      optimates: politique.optimates || 0,
      moderates: politique.moderates || 0
    };
  }
};
