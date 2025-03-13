
// Types pour le système de temps du jeu
export type Season = 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';
export type PlayerSeason = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

// Mapping entre les saisons romaines et les saisons pour les joueurs
const seasonMapping = {
  Ver: 'SPRING',
  Aestas: 'SUMMER',
  Autumnus: 'AUTUMN',
  Hiems: 'WINTER'
} as const;

// Mapping inverse
const reverseSeasonMapping = {
  SPRING: 'Ver',
  SUMMER: 'Aestas',
  AUTUMN: 'Autumnus',
  WINTER: 'Hiems'
} as const;

// Store pour la gestion du temps
export const useTimeStore = () => {
  // Simulation d'un store - dans une vraie implémentation, utiliser zustand ou un autre gestionnaire d'état
  const year = 721; // AUC
  const season: Season = 'Ver';
  const dayInSeason = 1; // Jour dans la saison (1-90)
  
  return {
    year,
    season,
    dayInSeason,
    advanceTime: () => {/* Logique d'avancement du temps */},
    advanceDay: () => {/* Avancer d'un jour */},
    advanceSeason: () => {/* Avancer d'une saison */},
    getSeason: () => season,
    getYear: () => year,
    formatDate: () => `${formatRomanSeason(season)} ${year} AUC, Jour ${dayInSeason}`
  };
};

// Fonction pour formater les saisons en texte lisible
export const formatRomanSeason = (season: Season): string => {
  switch (season) {
    case 'Ver': return 'Printemps';
    case 'Aestas': return 'Été';
    case 'Autumnus': return 'Automne';
    case 'Hiems': return 'Hiver';
    default: return 'Printemps';
  }
};

// Convertisseur entre les systèmes de temps
export const convertSeasonBetweenSystems = (
  season: Season | PlayerSeason, 
  targetSystem: 'player' | 'mj'
): PlayerSeason | Season => {
  if (targetSystem === 'player') {
    return seasonMapping[season as Season] || 'SPRING';
  } else {
    return reverseSeasonMapping[season as PlayerSeason] || 'Ver';
  }
};

// Hook pour gérer les événements liés au temps
export const useTimeEvents = (
  onDayChange?: (day: number) => void,
  onSeasonChange?: (season: Season) => void,
  onYearChange?: (year: number) => void
) => {
  // Ici, vous pourriez utiliser useState, useEffect, etc.
  // Mais pour simplifier, nous retournons juste une interface factice
  
  return {
    advanceTime: () => {
      // Logique pour avancer le temps et déclencher les callbacks appropriés
      if (onYearChange) onYearChange(722); // Simulation
    }
  };
};
