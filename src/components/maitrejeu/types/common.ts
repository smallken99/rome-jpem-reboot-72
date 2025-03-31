
// Types de dates et saisons pour le système de jeu

export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Ver' | 'Aes' | 'Aut' | 'Hie' | 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'spring' | 'summer' | 'autumn' | 'winter' | 'fall' | 'Fall' | 'Aestas' | 'Autumnus' | 'Hiems';

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
  // Ajout des autres phases pour la compatibilité
  SENATE = 'SENATE',
  ACTIONS = 'ACTIONS',
  ECONOMY = 'ECONOMY',
  EVENTS = 'EVENTS',
  DIPLOMACY = 'DIPLOMACY',
  MILITARY = 'MILITARY',
  POLITIQUE = 'POLITIQUE',
  ECONOMIE = 'ECONOMIE',
  MILITAIRE = 'MILITAIRE',
  RELIGION = 'RELIGION',
  SOCIAL = 'SOCIAL',
  SETUP = 'SETUP',
  ELECTION_CAPS = 'ELECTION',
  ACTION = 'ACTION',
  SENAT = 'SENAT',
  EVENEMENT = 'EVENEMENT',
  ADMINISTRATION = 'ADMINISTRATION'
}

export type GamePhase = 'normal' | 'election' | 'crisis' | 'war' | 'diplomatic' | 'religious' | 'economic' | 'revolt' | 'triumph' | 'games' | 'scandal' | 
  'SENATE' | 'ACTIONS' | 'ECONOMY' | 'EVENTS' | 'DIPLOMACY' | 'MILITARY' | 'POLITIQUE' | 'ECONOMIE' | 'MILITAIRE' | 'RELIGION' | 'SOCIAL' | 'SETUP' | 
  'ELECTION' | 'ACTION' | 'SENAT' | 'EVENEMENT' | 'ADMINISTRATION';

export interface GameDate {
  year: number;
  season: Season;
  phase?: GamePhase;
  day?: number;
}

// Utility function to convert Season strings
export function normalizeSeasonString(season: string): Season {
  if (season === 'Spring' || season === 'spring' || season === 'Ver') return 'SPRING';
  if (season === 'Summer' || season === 'summer' || season === 'Aes' || season === 'Aestas') return 'SUMMER';
  if (season === 'Autumn' || season === 'autumn' || season === 'fall' || season === 'Fall' || season === 'Aut' || season === 'Autumnus') return 'AUTUMN';
  if (season === 'Winter' || season === 'winter' || season === 'Hie' || season === 'Hiems') return 'WINTER';
  return season as Season; // Si c'est déjà une saison valide
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

// Function to parse a string to a GameDate safely
export const parseStringToGameDate = (dateString: string): GameDate => {
  if (!dateString) {
    return { year: 701, season: 'SPRING' }; // Default date
  }
  try {
    return stringToGameDate(dateString);
  } catch (e) {
    console.error("Error parsing date string:", e);
    return { year: 701, season: 'SPRING' };
  }
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

// Format a GameDate to a display string
export const formatGameDate = (date: GameDate): string => {
  const seasonStrings: Record<string, string> = {
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver',
    'Ver': 'Printemps',
    'Aestas': 'Été',
    'Autumnus': 'Automne',
    'Hiems': 'Hiver'
  };

  const seasonDisplay = seasonStrings[date.season] || date.season;
  return `${seasonDisplay} ${date.year} AUC`;
};
