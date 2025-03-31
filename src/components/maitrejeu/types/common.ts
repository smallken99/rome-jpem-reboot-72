
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Ver' | 'Aes' | 'Aut' | 'Hie' | 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'spring' | 'summer' | 'autumn' | 'winter' | 'fall';

export enum GamePhaseEnum {
  NORMAL = 'normal',
  ELECTION = 'election',
  CRISIS = 'crisis',
  WAR = 'war',
  DIPLOMATIC = 'diplomatic',
  RELIGIOUS = 'religious',
  ECONOMIC = 'economic',
  REVOLT = 'revolt',
  TRIUMPH = 'triumph',
  GAMES = 'games',
  SCANDAL = 'scandal',
}

export type GamePhase = 'normal' | 'election' | 'crisis' | 'war' | 'diplomatic' | 'religious' | 'economic' | 'revolt' | 'triumph' | 'games' | 'scandal';

export interface GameDate {
  year: number;
  season: Season;
  phase?: GamePhase;
}

// Utility function to convert Season strings
export function normalizeSeasonString(season: string): Season {
  if (season === 'Spring' || season === 'spring' || season === 'Ver') return 'SPRING';
  if (season === 'Summer' || season === 'summer' || season === 'Aes') return 'SUMMER';
  if (season === 'Autumn' || season === 'autumn' || season === 'fall' || season === 'Fall' || season === 'Aut') return 'AUTUMN';
  if (season === 'Winter' || season === 'winter' || season === 'Hie') return 'WINTER';
  return 'SPRING'; // Default to SPRING if unknown
}

// Function to convert a GameDate to a string representation
export const gameDateToString = (date: GameDate): string => {
  return `${date.year} ${date.season}`;
};

// Function to convert a string date to a GameDate
export const stringToGameDate = (dateString: string): GameDate => {
  const parts = dateString.split(' ');
  return {
    year: parseInt(parts[0]),
    season: normalizeSeasonString(parts[1])
  };
};

// Function to convert a JS Date to a GameDate
export const dateToGameDate = (date: Date): GameDate => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  let season: Season;
  if (month >= 2 && month <= 4) season = 'SPRING';
  else if (month >= 5 && month <= 7) season = 'SUMMER';
  else if (month >= 8 && month <= 10) season = 'AUTUMN';
  else season = 'WINTER';
  
  return { year, season };
};
