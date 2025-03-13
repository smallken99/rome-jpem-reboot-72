
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { GamePhase, Season } from '@/components/maitrejeu/types/common';
import { formatSeasonDisplay } from '@/utils/timeSystem';

export const useGameTime = () => {
  const { 
    currentDate,
    currentPhase,
    currentYear,
    currentSeason,
    advanceTime,
    changePhase
  } = useMaitreJeu();

  // Format a season for display
  const formatSeason = (season: Season) => {
    return formatSeasonDisplay(season);
  };

  // Format as Roman season
  const formatRomanSeason = (season: Season) => {
    switch (season) {
      case 'Ver': return 'Ver (Printemps)';
      case 'Aestas': return 'Aestas (Été)';
      case 'Autumnus': return 'Autumnus (Automne)';
      case 'Hiems': return 'Hiems (Hiver)';
      default: return season;
    }
  };

  // Get current year
  const getYear = () => {
    return currentYear;
  };

  return {
    currentDate,
    currentPhase,
    advanceTime,
    changePhase,
    year: currentYear,
    season: currentSeason,
    formatSeason,
    formatRomanSeason,
    getYear
  };
};
