import { useEffect, useState } from 'react';
import { GameDate, Season } from '@/components/maitrejeu/types/common';
import { formatDate, formatSeason } from '@/utils/formatUtils';

export const useGameDate = (initialDate?: GameDate) => {
  const [currentDate, setCurrentDate] = useState<GameDate>(
    initialDate || { year: 750, season: 'Ver' }
  );

  const toGameDate = (date: Date): GameDate => {
    const month = date.getMonth();
    let season: Season;
    
    if (month >= 2 && month <= 4) season = 'Ver';
    else if (month >= 5 && month <= 7) season = 'Aestas';
    else if (month >= 8 && month <= 10) season = 'Autumnus';
    else season = 'Hiems';
    
    return {
      year: 750 + (date.getFullYear() - 2023),
      season
    };
  };

  const advanceSeason = () => {
    setCurrentDate(prev => {
      let newYear = prev.year;
      let newSeason: Season;
      
      switch (prev.season) {
        case 'Ver':
          newSeason = 'Aestas';
          break;
        case 'Aestas':
          newSeason = 'Autumnus';
          break;
        case 'Autumnus':
          newSeason = 'Hiems';
          break;
        case 'Hiems':
          newSeason = 'Ver';
          newYear += 1;
          break;
        default:
          newSeason = prev.season;
      }
      
      return { year: newYear, season: newSeason };
    });
  };

  const advanceYear = () => {
    setCurrentDate(prev => ({
      ...prev,
      year: prev.year + 1
    }));
  };

  const setDate = (date: GameDate) => {
    setCurrentDate(date);
  };

  const isBefore = (date1: GameDate, date2: GameDate): boolean => {
    if (date1.year < date2.year) return true;
    if (date1.year > date2.year) return false;
    
    const seasonOrder: { [key in Season]: number } = {
      'Ver': 0,
      'Aestas': 1,
      'Autumnus': 2,
      'Hiems': 3
    };
    
    return seasonOrder[date1.season] < seasonOrder[date2.season];
  };

  const isAfter = (date1: GameDate, date2: GameDate): boolean => {
    if (date1.year > date2.year) return true;
    if (date1.year < date2.year) return false;
    
    const seasonOrder: { [key in Season]: number } = {
      'Ver': 0,
      'Aestas': 1,
      'Autumnus': 2,
      'Hiems': 3
    };
    
    return seasonOrder[date1.season] > seasonOrder[date2.season];
  };

  const formatGameDate = (date: GameDate): string => {
    return formatDate(date);
  };

  const gameDateToCompatibleString = (gameDate: GameDate): string => {
    return `${gameDate.year}-${gameDate.season}`;
  };

  const gameDateToDate = (gameDate: GameDate): Date => {
    let month = 0;
    switch (gameDate.season) {
      case 'Ver': month = 2; break;
      case 'Aestas': month = 5; break;
      case 'Autumnus': month = 8; break;
      case 'Hiems': month = 11; break;
    }
    
    return new Date(2000 + gameDate.year - 753, month, 15);
  };

  const gameToStringOrDate = (gameDate: GameDate): string => {
    return `${gameDate.year}-${gameDate.season}`;
  };

  return {
    currentDate,
    setCurrentDate,
    advanceSeason,
    advanceYear,
    setDate,
    toGameDate,
    isBefore,
    isAfter,
    formatGameDate,
    formatSeason,
    gameDateToJs: gameDateToDate,
    gameDateToString: gameToStringOrDate,
    gameDateToCompatibleString,
    gameDateToDate
  };
};
