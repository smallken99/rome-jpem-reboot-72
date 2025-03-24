
// Types pour le système de temps
export type Season = 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';
export type GamePhase = 'SENATE' | 'ECONOMY' | 'ELECTIONS' | 'ELECTION' | 'DIPLOMACY' | 'MILITARY' | 'RELIGION' | 'VOTE' | 'ACTIONS' | 'EVENTS';

export interface GameDate {
  year: number;
  season: Season;
}

// Fonctions d'aide pour la gestion du temps
export const formatSeasonDisplay = (season: Season | string): string => {
  const seasonMap: Record<string, string> = {
    'Ver': 'Printemps',
    'Aestas': 'Été',
    'Autumnus': 'Automne',
    'Hiems': 'Hiver',
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver'
  };
  return seasonMap[season] || season;
};

export const formatGameDate = (date: GameDate): string => {
  return `An ${date.year} AUC - ${formatSeasonDisplay(date.season)}`;
};

export const nextSeason = (currentSeason: Season): Season => {
  switch (currentSeason) {
    case 'Ver': return 'Aestas';
    case 'Aestas': return 'Autumnus';
    case 'Autumnus': return 'Hiems';
    case 'Hiems': return 'Ver';
    default: return 'Ver';
  }
};

export const nextGameDate = (date: GameDate): GameDate => {
  if (date.season === 'Hiems') {
    return { year: date.year + 1, season: 'Ver' };
  } else {
    return { year: date.year, season: nextSeason(date.season) };
  }
};

export const seasonToNumber = (season: Season): number => {
  switch (season) {
    case 'Ver': return 0;
    case 'Aestas': return 1;
    case 'Autumnus': return 2;
    case 'Hiems': return 3;
    default: return 0;
  }
};

export const numberToSeason = (num: number): Season => {
  switch (num % 4) {
    case 0: return 'Ver';
    case 1: return 'Aestas';
    case 2: return 'Autumnus';
    case 3: return 'Hiems';
    default: return 'Ver';
  }
};

export const dateToString = (date: GameDate): string => {
  return `${date.year}-${date.season}`;
};

export const stringToDate = (dateString: string): GameDate | null => {
  try {
    const [yearStr, seasonStr] = dateString.split('-');
    const year = parseInt(yearStr, 10);
    
    if (isNaN(year)) return null;
    
    // Vérifier que la saison est valide
    if (!['Ver', 'Aestas', 'Autumnus', 'Hiems'].includes(seasonStr)) {
      return null;
    }
    
    return {
      year,
      season: seasonStr as Season
    };
  } catch (error) {
    console.error("Error parsing date string:", error);
    return null;
  }
};

// Fonction pour convertir d'autres formats de saison vers le format standard
export const convertToStandardSeason = (season: string): Season => {
  const seasonMap: Record<string, Season> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas', 
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems',
    'Printemps': 'Ver',
    'Été': 'Aestas',
    'Automne': 'Autumnus',
    'Hiver': 'Hiems'
  };
  
  return (seasonMap[season] || season) as Season;
};

export const getTotalSeasons = (startDate: GameDate, endDate: GameDate): number => {
  const yearDiff = endDate.year - startDate.year;
  const seasonDiff = seasonToNumber(endDate.season) - seasonToNumber(startDate.season);
  return yearDiff * 4 + seasonDiff;
};

export const addSeasons = (date: GameDate, seasons: number): GameDate => {
  if (seasons === 0) return { ...date };
  
  const totalSeasons = seasonToNumber(date.season) + seasons;
  const yearsToAdd = Math.floor(totalSeasons / 4);
  const newSeasonIndex = totalSeasons % 4;
  
  return {
    year: date.year + yearsToAdd,
    season: numberToSeason(newSeasonIndex)
  };
};
