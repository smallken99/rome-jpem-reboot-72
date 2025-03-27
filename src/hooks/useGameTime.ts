
import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type Season = 'Hiems' | 'Ver' | 'Aestas' | 'Autumnus';

interface GameTime {
  year: number;
  season: Season;
}

const SEASONS: Season[] = ['Hiems', 'Ver', 'Aestas', 'Autumnus'];

export const useGameTime = () => {
  const [gameTime, setGameTime] = useLocalStorage<GameTime>('roman-game-time', {
    year: 755, // AUC - Ab Urbe Condita
    season: 'Ver'
  });
  
  const advanceSeason = useCallback(() => {
    const currentSeasonIndex = SEASONS.indexOf(gameTime.season);
    const nextSeasonIndex = (currentSeasonIndex + 1) % SEASONS.length;
    
    if (nextSeasonIndex === 0) {
      // If we've cycled through all seasons, advance to the next year
      setGameTime({
        year: gameTime.year + 1,
        season: SEASONS[0]
      });
    } else {
      setGameTime({
        ...gameTime,
        season: SEASONS[nextSeasonIndex]
      });
    }
  }, [gameTime, setGameTime]);
  
  const setYear = useCallback((year: number) => {
    setGameTime({
      ...gameTime,
      year
    });
  }, [gameTime, setGameTime]);
  
  const setSeason = useCallback((season: Season) => {
    setGameTime({
      ...gameTime,
      season
    });
  }, [gameTime, setGameTime]);
  
  return {
    ...gameTime,
    advanceSeason,
    setYear,
    setSeason
  };
};
