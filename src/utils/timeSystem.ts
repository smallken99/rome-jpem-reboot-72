
import { GameDate, Season } from '@/components/maitrejeu/types/common';

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

// Format season for display
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

// Convert Date to GameDate
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

// Convert a string or GameDate to a standardized GameDate object
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
