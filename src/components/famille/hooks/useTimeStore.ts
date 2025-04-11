
import { useGameTime } from '@/hooks/useGameTime';
import { Season } from '@/utils/timeSystem';

export const useTimeStore = () => {
  const gameTime = useGameTime();
  const { year, season } = gameTime;
  
  // Add compatibility method for advancing season
  const advanceSeason = () => {
    if (typeof gameTime.advanceSeason === 'function') {
      gameTime.advanceSeason();
    } else {
      console.warn("advanceSeason method not available in gameTime");
      // Provide fallback implementation if needed
      if (typeof gameTime.advanceTime === 'function') {
        gameTime.advanceTime();
      }
    }
  };
  
  const advanceTime = () => {
    advanceSeason();
  };
  
  const setYear = (newYear: number) => {
    if (typeof gameTime.setYear === 'function') {
      gameTime.setYear(newYear);
    } else {
      console.warn("setYear method not available in gameTime");
      // Fallback implementation
      if (gameTime.year !== undefined && typeof gameTime.updateGameTime === 'function') {
        gameTime.updateGameTime({ year: newYear, season: gameTime.season });
      }
    }
  };
  
  const setSeason = (newSeason: Season) => {
    if (typeof gameTime.setSeason === 'function') {
      gameTime.setSeason(newSeason);
    } else if (typeof gameTime.updateGameTime === 'function') {
      gameTime.updateGameTime({ year: gameTime.year, season: newSeason });
    } else {
      console.warn("setSeason method not available in gameTime");
    }
  };
  
  return {
    year,
    season,
    advanceSeason,
    advanceTime,
    setYear,
    setSeason
  };
};
