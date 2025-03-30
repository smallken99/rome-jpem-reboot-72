
import { useState, useCallback } from 'react';
import { GameDate, Season } from '@/utils/types/gameDate';

export interface GameTime {
  currentDate: GameDate;
  advanceSeason: () => void;
  advanceYear: () => void;
  setYear: (year: number) => void;
  setSeason: (season: Season) => void;
  formatGameDate: (date: GameDate) => string;
  addSeasons: (date: GameDate, seasons: number) => GameDate;
  compareGameDates: (date1: GameDate, date2: GameDate) => number;
  getCurrentYearProgress: () => number;
}

export const useGameTime = (initialDate?: GameDate): GameTime => {
  const [currentDate, setCurrentDate] = useState<GameDate>(initialDate || {
    year: 705,
    season: 'spring'
  });

  const advanceSeason = useCallback(() => {
    const seasons: Season[] = ['winter', 'spring', 'summer', 'fall'];
    const currentIndex = seasons.indexOf(currentDate.season);
    const nextIndex = (currentIndex + 1) % 4;
    
    if (nextIndex === 0) {
      // Si on passe de l'automne à l'hiver, on change d'année
      setCurrentDate({
        year: currentDate.year + 1,
        season: seasons[nextIndex]
      });
    } else {
      setCurrentDate({
        ...currentDate,
        season: seasons[nextIndex]
      });
    }
  }, [currentDate]);

  const advanceYear = useCallback(() => {
    setCurrentDate(prev => ({
      ...prev,
      year: prev.year + 1
    }));
  }, []);

  const setYear = useCallback((year: number) => {
    setCurrentDate(prev => ({
      ...prev,
      year
    }));
  }, []);

  const setSeason = useCallback((season: Season) => {
    setCurrentDate(prev => ({
      ...prev,
      season
    }));
  }, []);

  const formatGameDate = useCallback((date: GameDate): string => {
    return `${date.season} ${date.year}`;
  }, []);

  const addSeasons = useCallback((date: GameDate, seasons: number): GameDate => {
    const allSeasons: Season[] = ['winter', 'spring', 'summer', 'fall'];
    const currentIndex = allSeasons.indexOf(date.season);
    let newIndex = (currentIndex + seasons) % 4;
    let yearChange = Math.floor((currentIndex + seasons) / 4);
    
    if (newIndex < 0) {
      newIndex += 4;
      yearChange -= 1;
    }

    return {
      year: date.year + yearChange,
      season: allSeasons[newIndex]
    };
  }, []);

  const compareGameDates = useCallback((date1: GameDate, date2: GameDate): number => {
    const seasons: Record<Season, number> = {
      winter: 0,
      spring: 1,
      summer: 2,
      fall: 3
    };

    if (date1.year !== date2.year) {
      return date1.year - date2.year;
    }

    return seasons[date1.season] - seasons[date2.season];
  }, []);

  const getCurrentYearProgress = useCallback((): number => {
    const seasons: Record<Season, number> = {
      winter: 0,
      spring: 0.25,
      summer: 0.5,
      fall: 0.75
    };

    return seasons[currentDate.season];
  }, [currentDate.season]);

  return {
    currentDate,
    advanceSeason,
    advanceYear,
    setYear,
    setSeason,
    formatGameDate,
    addSeasons,
    compareGameDates,
    getCurrentYearProgress
  };
};

export default useGameTime;
