
import { useState, useEffect } from 'react';
import { Season } from '@/utils/types/gameDate';
import { useMaitreJeu } from '@/components/maitrejeu/context/MaitreJeuContext';

export interface GameTime {
  year: number;
  season: Season;
  phaseLabel: string;
  seasonLabel: string;
  yearLabel: string;
  currentDate: {
    year: number;
    season: Season;
    toLocaleDateString: () => string;
  };
  advanceTime: () => void;
  isSpring: boolean;
  isSummer: boolean;
  isAutumn: boolean;
  isWinter: boolean;
}

export const useGameTime = (): GameTime => {
  const { currentYear, currentSeason, currentPhase, advanceTime } = useMaitreJeu();
  
  const seasonLabels = {
    spring: 'Printemps',
    summer: 'Été',
    autumn: 'Automne',
    winter: 'Hiver'
  };
  
  const phaseLabels = {
    debate: 'Débat Sénatorial',
    vote: 'Vote',
    execution: 'Exécution des Lois',
    events: 'Événements',
    end: 'Fin de Tour'
  };
  
  const toLocaleDateString = () => {
    return `${seasonLabels[currentSeason]} ${currentYear}`;
  };
  
  return {
    year: currentYear,
    season: currentSeason,
    phaseLabel: phaseLabels[currentPhase] || 'Phase inconnue',
    seasonLabel: seasonLabels[currentSeason] || 'Saison inconnue',
    yearLabel: `An ${currentYear}`,
    currentDate: {
      year: currentYear,
      season: currentSeason,
      toLocaleDateString
    },
    advanceTime,
    isSpring: currentSeason === 'spring',
    isSummer: currentSeason === 'summer',
    isAutumn: currentSeason === 'autumn',
    isWinter: currentSeason === 'winter'
  };
};
