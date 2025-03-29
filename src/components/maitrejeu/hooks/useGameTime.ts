
import { useState } from 'react';
import { Season, GameDate } from '@/types/game';

export const useGameTime = (initialYear = 44, initialSeason: Season = 'spring') => {
  const [year, setYear] = useState(initialYear);
  const [season, setSeason] = useState<Season>(initialSeason);
  
  const advanceSeason = () => {
    const seasons: Season[] = ['winter', 'spring', 'summer', 'fall'];
    const currentIndex = seasons.indexOf(season);
    const nextIndex = (currentIndex + 1) % seasons.length;
    
    if (nextIndex === 0) {
      // If we're cycling back to winter, increment the year
      setYear(year + 1);
    }
    
    setSeason(seasons[nextIndex]);
  };
  
  const currentDate: GameDate = {
    year,
    season
  };
  
  return {
    year,
    season,
    currentDate,
    advanceSeason,
    setYear,
    setSeason
  };
};
