
import { Season as TimeSystemSeason } from '@/utils/timeSystem';

// Types de base
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
export type ImportanceType = 'majeure' | 'mineure' | 'normale';
export type GamePhase = 'SETUP' | 'ELECTION' | 'ACTION' | 'SENAT' | 'EVENEMENT' | 'ADMINISTRATION' | 'POLITIQUE' | 'ECONOMIE' | 'MILITAIRE' | 'RELIGION' | 'SOCIAL';
export type PhaseType = string;

// Fonction de conversion entre les types de saisons
export const convertTimeSeasonToMaitreJeuSeason = (season: TimeSystemSeason): Season => {
  const seasonMap: Record<TimeSystemSeason, Season> = {
    'Ver': 'SPRING',
    'Aestas': 'SUMMER',
    'Autumnus': 'AUTUMN',
    'Hiems': 'WINTER'
  };
  return seasonMap[season];
};

export const convertMaitreJeuSeasonToTimeSeason = (season: Season): TimeSystemSeason => {
  const seasonMap: Record<Season, TimeSystemSeason> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas',
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems'
  };
  return seasonMap[season];
};

// Interface de date commune
export interface GameDate {
  year: number;
  season: Season;
  day?: number;
}

// Fonctions de migration et d'adaptation pour faciliter la transition
export const adaptLegacyData = {
  // Convertir les anciens formats de date
  dateFormat: (year: number, season: TimeSystemSeason): GameDate => {
    return {
      year,
      season: convertTimeSeasonToMaitreJeuSeason(season)
    };
  },
  
  // Assurer la compatibilité avec les propriétés renommées
  propertyNames: <T extends Record<string, any>>(data: T, mapping: Record<string, string>): any => {
    const result: Record<string, any> = { ...data };
    Object.entries(mapping).forEach(([oldKey, newKey]) => {
      if (oldKey in data && !(newKey in data)) {
        result[newKey] = data[oldKey];
      }
    });
    return result;
  },
  
  // Assurer la conversion des types d'événements
  evenementType: (type: string): string => {
    const typeMap: Record<string, string> = {
      'politique': 'POLITIQUE',
      'economique': 'ECONOMIQUE',
      'économique': 'ECONOMIQUE',
      'guerre': 'GUERRE',
      'religion': 'RELIGION',
      'diplomatique': 'DIPLOMATIQUE',
      'social': 'SOCIAL',
      'crise': 'CRISE'
    };
    return typeMap[type.toLowerCase()] || type.toUpperCase();
  },
  
  // Assurer la conversion des statuts de province
  provinceStatus: (status: string): string => {
    const statusMap: Record<string, string> = {
      'pacifiée': 'pacifiée',
      'pacifiee': 'pacifiée',
      'instable': 'instable',
      'rebelle': 'rebelle',
      'conquise': 'conquise',
      'en révolte': 'rebelle',
      'en revolte': 'rebelle'
    };
    return statusMap[status.toLowerCase()] || 'instable';
  },
  
  // Assurer la conversion des magistratures
  magistratureType: (type: string): string => {
    const typeMap: Record<string, string> = {
      'préteur': 'PRETEUR',
      'preteur': 'PRETEUR',
      'consul': 'CONSUL',
      'édile': 'EDILE',
      'edile': 'EDILE',
      'questeur': 'QUESTEUR',
      'censeur': 'CENSEUR',
      'tribun': 'TRIBUN'
    };
    return typeMap[type.toLowerCase()] || type.toUpperCase();
  }
};

// Fonction utilitaire pour créer des identifiants uniques
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Fonction pour créer une nouvelle date de jeu à partir de l'année et saison actuelle
export const createGameDate = (year: number, season: Season): GameDate => {
  return { year, season };
};

// Types compatibles pour la migration vers la nouvelle structure
export interface BackwardCompatible {
  // Propriétés de compatibilité pour les anciennes versions
  [key: string]: any;
}
