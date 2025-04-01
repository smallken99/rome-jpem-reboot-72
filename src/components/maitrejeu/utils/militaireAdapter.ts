
import { Militaire } from '../types/equilibre';

/**
 * Adapts legacy militaire data to the current Militaire interface
 */
export const adaptMilitaire = (militaireData: any): Militaire => {
  if (!militaireData) {
    return {
      morale: 50,
      loyaute: 50,
      puissance: 50,
      discipline: 50,
      effectifs: 50,
      equipement: 50
    };
  }

  // Handle case where militaireData might be a number (legacy data)
  if (typeof militaireData === 'number') {
    return {
      morale: militaireData,
      loyaute: militaireData,
      puissance: militaireData,
      discipline: militaireData,
      effectifs: militaireData,
      equipement: militaireData
    };
  }

  // Handle the case where moral is used instead of morale
  const result: Militaire = {
    morale: militaireData.morale || militaireData.moral || 50,
    loyaute: militaireData.loyaute || 50,
    puissance: militaireData.puissance || 50,
    discipline: militaireData.discipline || 50,
    effectifs: militaireData.effectifs || 50,
    equipement: militaireData.equipement || 50
  };

  return result;
};

/**
 * Converts any property that should be Militaire to the proper format
 */
export const ensureMilitaire = (value: any): Militaire => {
  if (!value) return adaptMilitaire(null);
  
  if (typeof value === 'number') {
    return adaptMilitaire(value);
  }
  
  if (typeof value === 'object') {
    return adaptMilitaire(value);
  }
  
  return adaptMilitaire(null);
};
