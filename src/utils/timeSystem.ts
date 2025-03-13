
// Système de gestion du temps pour le jeu

// Types de saisons
export type Season = 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';
export type PlayerSeason = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

// Interface pour la date du jeu
export interface GameDate {
  year: number;
  season: Season | PlayerSeason;
}

// Tableau de conversion des saisons
export const seasonsMap: Record<PlayerSeason, Season> = {
  'SPRING': 'Ver',
  'SUMMER': 'Aestas',
  'AUTUMN': 'Autumnus',
  'WINTER': 'Hiems'
};

export const seasonsReverseMap: Record<Season, PlayerSeason> = {
  'Ver': 'SPRING',
  'Aestas': 'SUMMER',
  'Autumnus': 'AUTUMN',
  'Hiems': 'WINTER'
};

// Récupère la saison suivante
export const getNextSeason = (currentSeason: Season): Season => {
  const seasons: Season[] = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
  const currentIndex = seasons.indexOf(currentSeason);
  return seasons[(currentIndex + 1) % seasons.length];
};

// Récupère la saison précédente
export const getPreviousSeason = (currentSeason: Season): Season => {
  const seasons: Season[] = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
  const currentIndex = seasons.indexOf(currentSeason);
  return seasons[(currentIndex - 1 + seasons.length) % seasons.length];
};

// Avance le temps d'une saison
export const advanceSeason = (date: GameDate): GameDate => {
  const season = date.season as Season;
  const seasons: Season[] = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
  const currentIndex = seasons.indexOf(season);
  const nextIndex = (currentIndex + 1) % seasons.length;
  
  // Si on passe de l'hiver au printemps, on incrémente l'année
  if (nextIndex === 0) {
    return {
      year: date.year + 1,
      season: seasons[nextIndex]
    };
  }
  
  return {
    ...date,
    season: seasons[nextIndex]
  };
};

// Conversion entre les systèmes de saisons (MJ <-> Joueur)
export const convertSeasonBetweenSystems = (
  season: Season | PlayerSeason,
  targetSystem: 'mj' | 'player'
): Season | PlayerSeason => {
  if (targetSystem === 'mj') {
    // Si c'est déjà une saison MJ, on la renvoie telle quelle
    if (['Ver', 'Aestas', 'Autumnus', 'Hiems'].includes(season as Season)) {
      return season as Season;
    }
    // Sinon on convertit de Player vers MJ
    return seasonsMap[season as PlayerSeason];
  } else {
    // Si c'est déjà une saison Player, on la renvoie telle quelle
    if (['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'].includes(season as PlayerSeason)) {
      return season as PlayerSeason;
    }
    // Sinon on convertit de MJ vers Player
    return seasonsReverseMap[season as Season];
  }
};

// Vérifie si deux saisons sont équivalentes, même si elles sont dans des systèmes différents
export const areSeasonsEqual = (
  season1: Season | PlayerSeason,
  season2: Season | PlayerSeason
): boolean => {
  // Convertir les deux saisons dans le même système (MJ) pour la comparaison
  const season1MJ = convertSeasonBetweenSystems(season1, 'mj') as Season;
  const season2MJ = convertSeasonBetweenSystems(season2, 'mj') as Season;
  
  return season1MJ === season2MJ;
};

// Formater une date dans un format lisible
export const formatGameDate = (date: GameDate): string => {
  const season = typeof date.season === 'string' 
    ? date.season 
    : convertSeasonBetweenSystems(date.season, 'mj') as Season;
    
  return `An ${date.year} - ${season}`;
};

// Analyser une date à partir d'une chaîne de caractères
export const parseGameDate = (dateString: string | null): GameDate | null => {
  if (!dateString) return null;
  
  // Format attendu: "An X - Saison"
  const regex = /An\s+(\d+)\s+-\s+(\w+)/i;
  const match = dateString.match(regex);
  
  if (match && match.length === 3) {
    const year = parseInt(match[1], 10);
    const seasonStr = match[2];
    
    // Vérifier quelle saison a été trouvée
    let season: Season;
    if (['Ver', 'Aestas', 'Autumnus', 'Hiems'].includes(seasonStr as Season)) {
      season = seasonStr as Season;
    } else if (seasonStr.toUpperCase() === 'SPRING') {
      season = 'Ver';
    } else if (seasonStr.toUpperCase() === 'SUMMER') {
      season = 'Aestas';
    } else if (seasonStr.toUpperCase() === 'AUTUMN') {
      season = 'Autumnus';
    } else if (seasonStr.toUpperCase() === 'WINTER') {
      season = 'Hiems';
    } else {
      // Saison par défaut si non reconnue
      season = 'Ver';
    }
    
    return { year, season };
  }
  
  return null;
};

// Obtenir la différence en nombre de saisons entre deux dates
export const getSeasonDifference = (date1: GameDate, date2: GameDate): number => {
  // Calcul: (année2 - année1) * 4 + (indice_saison2 - indice_saison1)
  const seasons: Season[] = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
  
  // Convertir les saisons si nécessaire
  const season1 = typeof date1.season === 'string' 
    ? convertSeasonBetweenSystems(date1.season, 'mj') as Season 
    : date1.season;
  
  const season2 = typeof date2.season === 'string' 
    ? convertSeasonBetweenSystems(date2.season, 'mj') as Season 
    : date2.season;
  
  const seasonIndex1 = seasons.indexOf(season1);
  const seasonIndex2 = seasons.indexOf(season2);
  
  return (date2.year - date1.year) * 4 + (seasonIndex2 - seasonIndex1);
};
