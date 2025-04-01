
export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'Fall' | 
                    'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' |
                    'Aes' | 'Aut' | 'Hie';

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
