
import { useGameTime } from '@/hooks/useGameTime';
import { Season } from '@/utils/timeSystem';

export const useTimeStore = () => {
  const { year, season, advanceSeason, setYear, setSeason } = useGameTime();
  
  // Add compatibility method (alias for advanceSeason)
  const advanceTime = () => {
    advanceSeason();
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
