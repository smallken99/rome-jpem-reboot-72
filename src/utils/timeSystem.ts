
import { create } from 'zustand';

// Roman seasons
export type Season = 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';

export interface TimeState {
  year: number;
  season: Season;
  dayInSeason: number;
  daysPerSeason: number;
  seasonIndex: number;
  advanceDay: () => void;
  advanceSeason: () => void;
  advanceYear: () => void;
  formatDate: () => string;
}

// Roman calendar seasons (approximately)
const seasons: Season[] = ['Ver', 'Aestas', 'Autumnus', 'Hiems']; // Spring, Summer, Autumn, Winter
const DAYS_PER_SEASON = 90; // ~3 months per season

/**
 * Store for managing the game's time system
 */
export const useTimeStore = create<TimeState>((set, get) => ({
  year: 705, // Ab Urbe Condita (AUC) - from the founding of Rome
  season: 'Ver', // Start in spring
  dayInSeason: 1,
  daysPerSeason: DAYS_PER_SEASON,
  seasonIndex: 0,
  
  // Advance a single day
  advanceDay: () => set(state => {
    const newDayInSeason = state.dayInSeason + 1;
    
    // If we've reached the end of the season
    if (newDayInSeason > state.daysPerSeason) {
      // Reset day and move to next season
      return {
        dayInSeason: 1
      };
    }
    
    return { dayInSeason: newDayInSeason };
  }),
  
  // Advance to the next season
  advanceSeason: () => set(state => {
    const newSeasonIndex = (state.seasonIndex + 1) % 4;
    
    // If we've completed a full year
    if (newSeasonIndex === 0) {
      return {
        seasonIndex: newSeasonIndex,
        season: seasons[newSeasonIndex],
      };
    }
    
    return {
      seasonIndex: newSeasonIndex,
      season: seasons[newSeasonIndex]
    };
  }),
  
  // Advance a full year
  advanceYear: () => set(state => ({ year: state.year + 1 })),
  
  // Format the current date in Roman style
  formatDate: () => {
    const { year, season, dayInSeason } = get();
    return `${dayInSeason} ${season}, ${year} AUC`;
  }
}));

/**
 * Custom hook to listen for time changes and trigger events
 * @param onDayChange - Callback when day changes
 * @param onSeasonChange - Callback when season changes
 * @param onYearChange - Callback when year changes
 */
export const useTimeEvents = (
  onDayChange?: () => void,
  onSeasonChange?: (season: Season) => void,
  onYearChange?: (year: number) => void
) => {
  const { year, season, dayInSeason, advanceDay, advanceSeason, advanceYear } = useTimeStore();
  
  // Function to advance time by one day with all potential cascading effects
  const advanceTime = () => {
    const prevDay = dayInSeason;
    const prevSeason = season;
    const prevYear = year;
    
    // First advance the day
    advanceDay();
    
    // Check if day reset to 1, meaning season changed
    if (prevDay === DAYS_PER_SEASON) {
      advanceSeason();
      
      // Check if we're back to the first season, meaning year changed
      if (prevSeason === 'Hiems') {
        advanceYear();
        
        // Trigger year change callback
        if (onYearChange) {
          onYearChange(year + 1); // Use +1 because state hasn't updated in this context yet
        }
      }
      
      // Trigger season change callback
      if (onSeasonChange) {
        const nextSeasonIndex = (seasons.indexOf(prevSeason) + 1) % 4;
        onSeasonChange(seasons[nextSeasonIndex]);
      }
    }
    
    // Trigger day change callback
    if (onDayChange) {
      onDayChange();
    }
  };
  
  return {
    year,
    season,
    dayInSeason,
    advanceTime
  };
};
