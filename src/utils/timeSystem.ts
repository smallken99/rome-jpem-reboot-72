export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';

export interface GameDate {
  year: number;
  season: Season;
}

export const formatSeasonDisplay = (season: Season | string): string => {
  const seasonMappings: Record<string, string> = {
    SPRING: 'Printemps',
    SUMMER: 'Été',
    AUTUMN: 'Automne',
    WINTER: 'Hiver',
    Ver: 'Printemps',
    Aestas: 'Été',
    Autumnus: 'Automne',
    Hiems: 'Hiver'
  };
  
  return seasonMappings[season] || season;
};

export const formatDate = (date: GameDate | string): string => {
  if (!date) return '';
  
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return `${Math.abs(date.year)} ${date.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'} - ${formatSeasonDisplay(date.season as Season)}`;
  }
  
  return String(date);
};

export const parseGameDate = (dateString: string): GameDate | null => {
  if (!dateString) return null;
  
  try {
    const [yearPart, seasonPart] = dateString.split(' ');
    const year = parseInt(yearPart, 10);
    
    if (isNaN(year)) return null;
    
    return {
      year,
      season: seasonPart as Season
    };
  } catch (error) {
    console.error('Error parsing game date:', dateString);
    return null;
  }
};

export type PlayerSeason = Season;

export const reverseSeasonMapping: Record<string, Season> = {
  'Printemps': 'Ver',
  'Été': 'Aestas',
  'Automne': 'Autumnus',
  'Hiver': 'Hiems',
  'Spring': 'Ver',
  'Summer': 'Aestas',
  'Autumn': 'Autumnus',
  'Winter': 'Hiems'
};

export const convertSeasonBetweenSystems = (season: string): Season => {
  const latinSeasons: Record<string, Season> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas',
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems',
    'Printemps': 'Ver',
    'Été': 'Aestas',
    'Automne': 'Autumnus',
    'Hiver': 'Hiems'
  };
  
  return latinSeasons[season] || season as Season;
};

const createTimeStore = () => {
  let year = 750; // AUC (Ab Urbe Condita) starting year
  let season: Season = 'Ver';
  
  const getYear = () => year;
  const getSeason = () => season;
  
  const advanceTime = () => {
    const seasons: Season[] = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
    const currentIndex = seasons.indexOf(season);
    const nextIndex = (currentIndex + 1) % seasons.length;
    
    season = seasons[nextIndex];
    
    if (nextIndex === 0) {
      year += 1;
    }
    
    return { year, season };
  };
  
  const setDate = (newYear: number, newSeason: Season) => {
    year = newYear;
    season = newSeason;
  };
  
  return {
    year,
    season,
    getYear,
    getSeason,
    advanceTime,
    setDate
  };
};

export const useTimeStore = createTimeStore();
