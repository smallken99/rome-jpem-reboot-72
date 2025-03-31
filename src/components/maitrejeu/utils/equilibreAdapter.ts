
import { Equilibre, Risk, HistoriqueEntry, PoliticalEvent, RiskType } from '../types/equilibre';

/**
 * Normalise les données d'équilibre pour garantir une structure cohérente
 */
export function normalizeEquilibre(data: any): Equilibre {
  // Extraire les données politiques
  const populaires = data.populaires || data.populares || data.politique?.populaires || 30;
  const optimates = data.optimates || data.politique?.optimates || 40;
  const moderates = data.moderates || data.politique?.moderates || 30;

  // Extraire les données économiques
  let economie = 0;
  if (typeof data.economie === 'number') {
    economie = data.economie;
  } else if (data.economie && typeof data.economie === 'object') {
    // Si c'est un objet avec des sous-valeurs
    const { stabilite = 70, croissance = 60, commerce = 80, agriculture = 50 } = data.economie;
    economie = Math.round((stabilite + croissance + commerce + agriculture) / 4);
  } else {
    economie = data.economy || data.économie || data.economicStability || 70;
  }

  // Créer l'économie détaillée
  const economieDetailed = {
    stabilite: data.economie?.stabilite || 70,
    croissance: data.economie?.croissance || 60,
    commerce: data.economie?.commerce || 80,
    agriculture: data.economie?.agriculture || 50
  };

  // Extraire les données sociales
  const plebeiens = data.plébéiens || data.plebeiens || data.social?.plebeiens || data.social?.plébéiens || 60;
  const patriciens = data.patriciens || data.social?.patriciens || 40;
  const esclaves = data.social?.esclaves || 20;
  const cohesion = data.social?.cohesion || 70;

  // Religion
  let religion = 0;
  if (typeof data.religion === 'number') {
    religion = data.religion;
  } else if (data.religion && typeof data.religion === 'object') {
    const { piete = 70, traditions = 80, superstition = 50 } = data.religion;
    religion = Math.round((piete + traditions + superstition) / 3);
  } else {
    religion = 70; // Valeur par défaut
  }

  // Créer la religion détaillée
  const religionDetailed = {
    piete: data.religion?.piete || 70,
    traditions: data.religion?.traditions || 80,
    superstition: data.religion?.superstition || 50
  };

  // Convertir les risques
  let risques: Risk[] = [];
  if (Array.isArray(data.risques)) {
    risques = data.risques;
  } else if (data.risques && typeof data.risques === 'object') {
    risques = Object.values(data.risques);
  }

  // Mettre en forme l'historique
  const historique: HistoriqueEntry[] = Array.isArray(data.historique) 
    ? data.historique 
    : [];

  // Structure finale normalisée
  return {
    // Politique
    politique: {
      populaires,
      optimates,
      moderates
    },
    populaires,
    populares: populaires,
    optimates,
    moderates,

    // Économie
    economie,
    economy: economie,
    économie: economie,
    economicStability: economie,
    economieDetailed,

    // Social
    social: {
      plebeiens,
      plébéiens: plebeiens,
      patriciens,
      esclaves,
      cohesion
    },
    plebeiens,
    plébéiens: plebeiens,
    patriciens,

    // Militaire
    militaire: data.militaire || {
      moral: data.moral || 80,
      effectifs: data.effectifs || 70,
      equipement: data.equipement || 60,
      discipline: data.discipline || 90
    },

    // Religion
    religion,
    religionDetailed,

    // Divers facteurs de stabilité
    stability: data.stability || 75,
    armée: data.armée || 80,
    loyauté: data.loyauté || 70,
    morale: data.morale || 60,
    facteurJuridique: data.facteurJuridique || 85,

    // Historique et risques
    historique,
    risques,

    // Pour compatibilité
    political: {
      populares: populaires,
      optimates,
      moderates
    }
  };
}

/**
 * Calcule la stabilité économique basée sur les données
 */
export function getEconomicStability(data: any): number {
  if (typeof data.economie === 'number') {
    return data.economie;
  } 
  
  if (data.economie && typeof data.economie === 'object') {
    const { stabilite = 70, croissance = 60, commerce = 80, agriculture = 50 } = data.economie;
    return Math.round((stabilite + croissance + commerce + agriculture) / 4);
  }
  
  return data.economy || data.économie || data.economicStability || 70;
}

/**
 * Calcule la stabilité religieuse basée sur les données
 */
export function getReligionStability(data: any): number {
  if (typeof data.religion === 'number') {
    return data.religion;
  } 
  
  if (data.religion && typeof data.religion === 'object') {
    const { piete = 70, traditions = 80, superstition = 50 } = data.religion;
    return Math.round((piete + traditions + superstition) / 3);
  }
  
  return 70; // Valeur par défaut
}

/**
 * Extrait les événements politiques des données
 */
export function getPoliticalEvents(data: any): PoliticalEvent[] {
  if (!data || !Array.isArray(data.evenements)) {
    return [];
  }
  
  return data.evenements
    .filter((evt: any) => evt.type === 'POLITIQUE' || evt.type === 'POLITICAL')
    .map((evt: any) => ({
      id: evt.id,
      title: evt.title || evt.titre,
      description: evt.description,
      date: evt.date,
      type: evt.type,
      importance: evt.importance
    }));
}
