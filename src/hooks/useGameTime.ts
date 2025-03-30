
import { useState, useEffect } from 'react';
import { GameDate, Season } from '@/utils/types/gameDate';

export interface GameTime {
  year: number;
  season: Season;
  phase?: string;
  updateTime?: (newTime: Partial<GameTime>) => void;
  advanceSeason?: () => void;
  advanceYear?: () => void;
}

export const useGameTime = (): GameTime => {
  const [gameTime, setGameTime] = useState<GameTime>({
    year: 510,
    season: 'spring',
    phase: 'normal'
  });

  const updateTime = (newTime: Partial<GameTime>) => {
    setGameTime(prevTime => ({ ...prevTime, ...newTime }));
  };

  const advanceSeason = () => {
    setGameTime(prevTime => {
      let newSeason: Season;
      let newYear = prevTime.year;
      
      switch (prevTime.season) {
        case 'winter':
          newSeason = 'spring';
          break;
        case 'spring':
          newSeason = 'summer';
          break;
        case 'summer':
          newSeason = 'fall';
          break;
        case 'fall':
          newSeason = 'winter';
          newYear += 1;
          break;
      }
      
      return { ...prevTime, year: newYear, season: newSeason };
    });
  };

  const advanceYear = () => {
    setGameTime(prevTime => ({
      ...prevTime,
      year: prevTime.year + 1
    }));
  };

  return {
    ...gameTime,
    updateTime,
    advanceSeason,
    advanceYear
  };
};
