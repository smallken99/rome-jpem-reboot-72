
import { useEffect, useState } from 'react';
import { GameDate, Season, formatSeasonDisplay, formatGameDate, nextGameDate, seasonToNumber, numberToSeason, addSeasons, dateToString, stringToDate } from '@/utils/timeSystem';

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
    setCurrentDate(prev => nextGameDate(prev));
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

  const isEqual = (date1: GameDate, date2: GameDate): boolean => {
    return date1.year === date2.year && date1.season === date2.season;
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

  const getDateDifference = (date1: GameDate, date2: GameDate): { years: number, seasons: number } => {
    const totalSeasons1 = date1.year * 4 + seasonToNumber(date1.season);
    const totalSeasons2 = date2.year * 4 + seasonToNumber(date2.season);
    const diffSeasons = totalSeasons2 - totalSeasons1;
    
    return {
      years: Math.floor(diffSeasons / 4),
      seasons: diffSeasons % 4
    };
  };

  // Calculer une date à partir d'une occurrence (ex: "la 3ème Ver après l'an 750")
  const getNthOccurrence = (startDate: GameDate, targetSeason: Season, occurrence: number): GameDate => {
    let currentDate = { ...startDate };
    let count = 0;
    
    // Si nous sommes déjà sur la saison cible, on compte cette occurrence
    if (currentDate.season === targetSeason) {
      count++;
    }
    
    // Avancer jusqu'à ce qu'on atteigne le nombre d'occurrences désiré
    while (count < occurrence) {
      currentDate = nextGameDate(currentDate);
      if (currentDate.season === targetSeason) {
        count++;
      }
    }
    
    return currentDate;
  };

  // Formatter une date pour l'affichage
  const formatDateLong = (date: GameDate): string => {
    return `An ${date.year} AUC, ${formatSeasonDisplay(date.season)}`;
  };

  // Formatter une date en style romain
  const formatDateRoman = (date: GameDate): string => {
    return `An ${date.year} ab Urbe condita, ${date.season}`;
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
    isEqual,
    formatGameDate: formatDateLong,
    formatDateRoman,
    formatSeason: formatSeasonDisplay,
    gameDateToJs: gameDateToDate,
    gameDateToDate,
    gameDateToString: dateToString,
    stringToGameDate: stringToDate,
    getDateDifference,
    getNthOccurrence,
    addSeasons
  };
};
