
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';

export interface GameDate {
  year: number;
  season: Season;
}

export const formatSeasonDisplay = (season: Season): string => {
  const seasonMappings: Record<Season, string> = {
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

export const formatDate = (date: GameDate): string => {
  if (!date) return '';
  return `${Math.abs(date.year)} ${date.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'} - ${formatSeasonDisplay(date.season as Season)}`;
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
