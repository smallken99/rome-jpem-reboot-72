
import { v4 as uuidv4 } from 'uuid';
import { 
  Season, 
  PlayerSeason, 
  seasonMapping, 
  reverseSeasonMapping, 
  formatSeasonDisplay, 
  GameDate 
} from '@/components/maitrejeu/types/common';

// Exporter les types nécessaires
export type { Season, PlayerSeason, GameDate };

// Définition du store pour la gestion du temps
export const useTimeStore = () => {
  // Simulation d'un store - dans une implémentation réelle, utiliser zustand ou un autre gestionnaire d'état
  const year = 721; // AUC
  const season: Season = 'Ver';
  
  return {
    year,
    season,
    advanceTime: () => {/* Logique pour faire avancer le temps */},
    getSeason: () => season,
    getYear: () => year,
  };
};

// Fonction pour formater les saisons romaines en texte lisible
export const formatRomanSeason = (season: Season | PlayerSeason): string => {
  return formatSeasonDisplay(season);
};

// Convertisseur entre systèmes de temps
export const convertSeasonBetweenSystems = (
  season: Season | PlayerSeason, 
  targetSystem: 'player' | 'mj'
): PlayerSeason | Season => {
  if (targetSystem === 'player') {
    if (season in seasonMapping) {
      return seasonMapping[season as Season];
    }
    return season as PlayerSeason;
  } else {
    if (season in reverseSeasonMapping) {
      return reverseSeasonMapping[season as PlayerSeason];
    }
    return season as Season;
  }
};

// Hook pour gérer les événements liés au temps
export const useTimeEvents = (
  onDayChange?: (day: number) => void,
  onSeasonChange?: (season: Season) => void,
  onYearChange?: (year: number) => void
) => {
  // Ici, vous utiliseriez useState, useEffect, etc.
  // Mais pour la simplicité, nous retournons juste une interface simulée
  
  return {
    advanceTime: () => {
      // Logique pour faire avancer le temps et déclencher les callbacks appropriés
      if (onYearChange) onYearChange(722); // Simulation
    }
  };
};

// Fonction pour convertir entre les formats de saisons
export const parseGameDate = (dateString: string): GameDate => {
  try {
    // Si c'est déjà un objet GameDate
    if (typeof dateString === 'object' && 'year' in dateString && 'season' in dateString) {
      return dateString as GameDate;
    }
    
    // Tenter de parser un objet JSON
    const parsed = JSON.parse(dateString);
    if (parsed && typeof parsed === 'object' && 'year' in parsed && 'season' in parsed) {
      return {
        year: Number(parsed.year),
        season: parsed.season as Season
      };
    }
  } catch (e) {
    // Si l'analyse JSON échoue, continuer avec d'autres méthodes de parsing
  }
  
  // Format par défaut si aucun parsing ne fonctionne
  return { year: 721, season: 'Ver' };
};

// Fonction pour vérifier si deux saisons sont égales (incluant différents systèmes)
export const areSeasonsEqual = (season1: Season | PlayerSeason, season2: Season | PlayerSeason): boolean => {
  // Convertir les deux saisons en format MJ pour la comparaison
  const s1AsMJ = season1 in reverseSeasonMapping ? reverseSeasonMapping[season1 as PlayerSeason] : season1 as Season;
  const s2AsMJ = season2 in reverseSeasonMapping ? reverseSeasonMapping[season2 as PlayerSeason] : season2 as Season;
  
  return s1AsMJ === s2AsMJ;
};
