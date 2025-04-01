
export type Season = 
  'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'Fall' | 
  'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' |
  'Aes' | 'Aut' | 'Hie' |
  'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' |
  'spring' | 'summer' | 'autumn' | 'winter' | 'fall';

export interface GameDate {
  year: number;
  season: Season;
  phase?: string;
}

export function isGameDate(value: any): value is GameDate {
  return value && 
    typeof value === 'object' && 
    typeof value.year === 'number' && 
    typeof value.season === 'string';
}

export function gameDateToString(date: GameDate): string {
  return `${date.year} (${date.season})`;
}

export function stringToGameDate(dateStr: string): GameDate {
  // Format attendu: "708 (Spring)"
  const match = dateStr.match(/(\d+)\s*\(([^)]+)\)/);
  if (!match) {
    throw new Error(`Format de date invalide: ${dateStr}`);
  }
  
  return {
    year: parseInt(match[1], 10),
    season: match[2] as Season
  };
}

export function formatGameDate(date: GameDate): string {
  // Format the date with season and year
  return `${date.season} ${date.year}`;
}

export function adaptSeason(season: string): string {
  const seasonMap: Record<string, string> = {
    'Ver': 'Printemps',
    'Aes': 'Été',
    'Aut': 'Automne',
    'Hie': 'Hiver',
    'Spring': 'Printemps',
    'Summer': 'Été',
    'Fall': 'Automne',
    'Autumn': 'Automne',
    'Winter': 'Hiver',
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver',
    'spring': 'Printemps',
    'summer': 'Été',
    'autumn': 'Automne',
    'fall': 'Automne',
    'winter': 'Hiver'
  };
  return seasonMap[season] || season;
}
