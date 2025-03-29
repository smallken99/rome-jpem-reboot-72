
import { useState } from 'react';
import { Season, GameDate } from '@/types/game';

export const useGameTime = () => {
  const [year, setYear] = useState<number>(753); // Default to founding of Rome
  const [season, setSeason] = useState<Season>('spring');

  const advanceSeason = () => {
    const seasons: Season[] = ['winter', 'spring', 'summer', 'fall'];
    const currentSeasonIndex = seasons.indexOf(season);
    const nextSeasonIndex = (currentSeasonIndex + 1) % 4;
    
    if (nextSeasonIndex === 0) { // If we're moving from fall to winter
      setYear(year + 1);
    }
    
    setSeason(seasons[nextSeasonIndex]);
  };
  
  // Create a currentDate getter that returns the current date in GameDate format
  const currentDate: GameDate = {
    year,
    season
  };

  return {
    year,
    season,
    setYear,
    setSeason,
    advanceSeason,
    currentDate
  };
};
