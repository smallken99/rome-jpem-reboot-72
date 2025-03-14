
import { create } from 'zustand';
import { GameDate, Season, GamePhase } from '@/components/maitrejeu/types/common';

// Export the Season type to be used across the application
export type { Season, GamePhase };

// Season mapping between Latin and modern names
export const seasonMapping: Record<Season, string> = {
  'Ver': 'SPRING',
  'Aestas': 'SUMMER',
  'Autumnus': 'AUTUMN',
  'Hiems': 'WINTER',
  'SPRING': 'SPRING',
  'SUMMER': 'SUMMER',
  'AUTUMN': 'AUTUMN',
  'WINTER': 'WINTER'
};

// Reverse mapping for conversion
export const reverseSeasonMapping: Record<string, Season> = {
  'SPRING': 'Ver',
  'SUMMER': 'Aestas',
  'AUTUMN': 'Autumnus',
  'WINTER': 'Hiems',
  'Ver': 'Ver',
  'Aestas': 'Aestas',
  'Autumnus': 'Autumnus',
  'Hiems': 'Hiems'
};

// Player season type (used in some contexts)
export type PlayerSeason = keyof typeof reverseSeasonMapping;

// Format a season for display
export const formatSeasonDisplay = (season: string): string => {
  switch (season) {
    case 'SPRING':
    case 'Ver':
      return 'Printemps';
    case 'SUMMER':
    case 'Aestas':
      return 'Été';
    case 'AUTUMN':
    case 'Autumnus':
      return 'Automne';
    case 'WINTER':
    case 'Hiems':
      return 'Hiver';
    default:
      return season;
  }
};

// Format a GameDate or convert a string to GameDate and format it
export const formatDate = (date: GameDate | string): string => {
  let gameDate: GameDate;
  
  if (typeof date === 'string') {
    // Convert string to GameDate
    const parts = date.split(' ');
    if (parts.length >= 2) {
      gameDate = {
        year: parseInt(parts[0]),
        season: parts[1] as Season
      };
    } else {
      // Default if format is not recognized
      gameDate = { year: new Date().getFullYear(), season: 'SPRING' };
    }
  } else {
    gameDate = date;
  }
  
  return `An ${gameDate.year}, ${formatSeasonDisplay(gameDate.season)}`;
};

// Convert a season between different naming systems
export const convertSeasonBetweenSystems = (season: string, targetSystem: 'player' | 'mj'): string => {
  if (targetSystem === 'player') {
    return seasonMapping[season as Season] || season;
  } else {
    return reverseSeasonMapping[season] || season;
  }
};

// Get the next season
export const getNextSeason = (season: Season): Season => {
  switch (season) {
    case 'SPRING':
    case 'Ver':
      return 'SUMMER';
    case 'SUMMER':
    case 'Aestas':
      return 'AUTUMN';
    case 'AUTUMN':
    case 'Autumnus':
      return 'WINTER';
    case 'WINTER':
    case 'Hiems':
      return 'SPRING';
    default:
      return 'SPRING';
  }
};

// Parse a string or GameDate to a standardized GameDate object
export const parseGameDate = (dateInput: string | GameDate): GameDate => {
  if (typeof dateInput === 'object' && 'year' in dateInput && 'season' in dateInput) {
    return dateInput;
  }
  
  if (typeof dateInput === 'string') {
    const parts = dateInput.split(' ');
    if (parts.length >= 2) {
      return {
        year: parseInt(parts[0]),
        season: parts[1] as Season
      };
    }
  }
  
  // Default value
  return { year: new Date().getFullYear(), season: 'SPRING' };
};

// Define the store
interface TimeState {
  year: number;
  season: PlayerSeason;
  phase: string;
  advanceTime: () => void;
  setYear: (year: number) => void;
  setSeason: (season: PlayerSeason) => void;
  setPhase: (phase: string) => void;
  getYear: () => number;
}

// Create and export the time store
export const useTimeStore = create<TimeState>((set, get) => ({
  year: 750, // Initial year (AUC - Ab Urbe Condita)
  season: 'Ver',
  phase: 'POLITIQUE',
  
  advanceTime: () => set(state => {
    const seasons: PlayerSeason[] = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
    const currentIndex = seasons.indexOf(state.season);
    const nextIndex = (currentIndex + 1) % seasons.length;
    
    if (nextIndex === 0) {
      // If we cycle back to the first season, increment the year
      return { season: seasons[nextIndex], year: state.year + 1 };
    }
    
    return { season: seasons[nextIndex] };
  }),
  
  setYear: (year: number) => set({ year }),
  setSeason: (season: PlayerSeason) => set({ season }),
  setPhase: (phase: string) => set({ phase }),
  getYear: () => get().year
}));
