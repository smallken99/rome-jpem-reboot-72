
// Create a compatibility wrapper for components that rely on useTimeStore
import { useGameTime } from '@/hooks/useGameTime';

export const useTimeStore = () => {
  const { year, season, advanceTime } = useGameTime();
  
  return {
    year,
    season,
    getYear: () => year,
    getSeason: () => season,
    advanceTime
  };
};

export default useTimeStore;
