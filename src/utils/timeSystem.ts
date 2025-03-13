// Types pour le système de temps du jeu
export type Season = 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';

// Store pour la gestion du temps
export const useTimeStore = () => {
  // Simulation d'un store - dans une vraie implémentation, utiliser zustand ou un autre gestionnaire d'état
  const year = 721; // AUC
  const season: Season = 'Ver';
  
  return {
    year,
    season,
    advanceTime: () => {/* Logique d'avancement du temps */},
    getSeason: () => season,
    getYear: () => year
  };
};

// Convertisseur entre les systèmes de temps
export const convertSeasonBetweenSystems = (
  season: Season | string, 
  targetSystem: 'player' | 'mj'
): string => {
  const mjToPlayer: Record<Season, string> = {
    'Ver': 'SPRING',
    'Aestas': 'SUMMER',
    'Autumnus': 'AUTUMN',
    'Hiems': 'WINTER'
  };
  
  const playerToMj: Record<string, Season> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas',
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems'
  };
  
  if (targetSystem === 'player') {
    return mjToPlayer[season as Season] || 'SPRING';
  } else {
    return playerToMj[season] || 'Ver';
  }
};
