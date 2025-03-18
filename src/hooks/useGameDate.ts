
import { useEffect, useState } from 'react';
import { GameDate, Season } from '@/components/maitrejeu/types/common';
import { formatDate, formatSeason } from '@/utils/formatUtils';

export const useGameDate = (initialDate?: GameDate) => {
  const [currentDate, setCurrentDate] = useState<GameDate>(
    initialDate || { year: 750, season: 'Ver' }
  );

  // Convertir une date JavaScript en GameDate
  const toGameDate = (date: Date): GameDate => {
    // Logique simplifiée pour la conversion
    // Dans un cas réel, il faudrait une logique plus sophistiquée pour déterminer la saison
    const month = date.getMonth();
    let season: Season;
    
    if (month >= 2 && month <= 4) season = 'Ver';
    else if (month >= 5 && month <= 7) season = 'Aestas';
    else if (month >= 8 && month <= 10) season = 'Autumnus';
    else season = 'Hiems';
    
    return {
      year: 750 + (date.getFullYear() - 2023), // Exemple simple
      season
    };
  };

  // Avancer à la saison suivante
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

  // Avancer d'une année
  const advanceYear = () => {
    setCurrentDate(prev => ({
      ...prev,
      year: prev.year + 1
    }));
  };

  // Définir une date spécifique
  const setDate = (date: GameDate) => {
    setCurrentDate(date);
  };

  // Vérifier si une date est antérieure à une autre
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

  // Vérifier si une date est postérieure à une autre
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

  // Formater la date pour l'affichage
  const formatGameDate = (date: GameDate): string => {
    return formatDate(date);
  };

  // Convert GameDate to a compatible string format
  const gameDateToCompatibleString = (gameDate: GameDate): string => {
    return `${gameDate.year}-${gameDate.season}`;
  };

  // This function converts a GameDate to a JavaScript Date for compatibility
  const gameDateToDate = (gameDate: GameDate): Date => {
    // Simple mapping of seasons to months
    let month = 0;
    switch (gameDate.season) {
      case 'Ver': month = 2; break; // March
      case 'Aestas': month = 5; break; // June
      case 'Autumnus': month = 8; break; // September
      case 'Hiems': month = 11; break; // December
    }
    
    // Use a base year (2000) and add the game year as offset
    return new Date(2000 + gameDate.year - 753, month, 15);
  };

  // Modified: Always return a Date object to fix type compatibility issues
  const gameToStringOrDate = (gameDate: GameDate): string => {
    // Convertir en chaîne de caractères au lieu d'objet Date
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
