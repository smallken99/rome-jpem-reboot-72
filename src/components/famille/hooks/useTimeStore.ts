
import { useGameTime } from '@/hooks/useGameTime';
import { Season } from '@/utils/timeSystem';

export const useTimeStore = () => {
  const gameTime = useGameTime();
  const { year, season } = gameTime;
  
  // Add compatibility method (alias for advanceSeason)
  const advanceSeason = () => {
    if (gameTime.advanceSeason) {
      gameTime.advanceSeason();
    } else {
      console.warn("advanceSeason method not available in gameTime");
    }
  };
  
  const advanceTime = () => {
    advanceSeason();
  };
  
  const setYear = (newYear: number) => {
    if (gameTime.setYear) {
      gameTime.setYear(newYear);
    } else {
      console.warn("setYear method not available in gameTime");
    }
  };
  
  const setSeason = (newSeason: Season) => {
    if (gameTime.setSeason) {
      gameTime.setSeason(newSeason);
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
