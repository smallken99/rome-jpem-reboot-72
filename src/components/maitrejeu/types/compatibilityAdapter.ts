
import { MagistratureType } from './magistratures';
import { GamePhase, Season } from './common';

// Function to convert legacy magistrature types to new format
export const convertLegacyMagistratureType = (type: string): MagistratureType => {
  const typeMap: Record<string, MagistratureType> = {
    'préteur': 'PRETEUR',
    'preteur': 'PRETEUR',
    'consul': 'CONSUL',
    'édile': 'EDILE',
    'edile': 'EDILE',
    'questeur': 'QUESTEUR',
    'censeur': 'CENSEUR',
    'tribun': 'TRIBUN',
    'PRÉTEUR': 'PRETEUR'
  };
  return typeMap[type.toLowerCase()] || 'CONSUL';
};

// Function to convert legacy phase types to new format
export const convertLegacyPhaseType = (phase: string): GamePhase => {
  const phaseMap: Record<string, GamePhase> = {
    'politique': 'POLITIQUE',
    'economie': 'ECONOMIE',
    'économie': 'ECONOMIE',
    'militaire': 'MILITAIRE',
    'religion': 'RELIGION',
    'social': 'SOCIAL',
    'setup': 'SETUP',
    'election': 'ELECTION',
    'action': 'ACTION',
    'senat': 'SENAT',
    'evenement': 'EVENEMENT',
    'événement': 'EVENEMENT',
    'administration': 'ADMINISTRATION'
  };
  return phaseMap[phase.toLowerCase()] || 'POLITIQUE';
};

// Function to convert legacy season types to new format
export const convertLegacySeason = (season: string): Season => {
  const seasonMap: Record<string, Season> = {
    'printemps': 'SPRING',
    'été': 'SUMMER',
    'ete': 'SUMMER',
    'automne': 'AUTUMN',
    'hiver': 'WINTER'
  };
  return seasonMap[season.toLowerCase()] || 'SPRING';
};

// Function to convert legacy status values
export const convertLegacyStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'planifiée': 'planifiée',
    'planifiee': 'planifiée',
    'en cours': 'en cours',
    'terminée': 'terminée',
    'terminee': 'terminée',
    'annulée': 'annulée',
    'annulee': 'annulée'
  };
  return statusMap[status.toLowerCase()] || status;
};

// Type guard to check if an object has a specific property
export function hasProperty<T, K extends string>(obj: T, prop: K): obj is T & Record<K, unknown> {
  return obj !== null && typeof obj === 'object' && prop in obj;
}

// Function to adapt legacy objects to new format
export function adaptLegacyObject<T>(obj: Record<string, any>, propertyMap: Record<string, string>): T {
  const result: Record<string, any> = { ...obj };
  
  Object.entries(propertyMap).forEach(([oldKey, newKey]) => {
    if (hasProperty(obj, oldKey) && !hasProperty(obj, newKey)) {
      result[newKey] = obj[oldKey];
    }
  });
  
  return result as T;
}
