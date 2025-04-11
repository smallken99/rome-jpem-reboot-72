
import { useGameTime } from '@/hooks/useGameTime';
import { Season } from '@/utils/timeSystem';

export const useTimeStore = () => {
  const gameTime = useGameTime();
  const { year, season } = gameTime;
  
  // Méthode pour avancer la saison
  const advanceSeason = () => {
    if (typeof gameTime.advanceTime === 'function') {
      gameTime.advanceTime();
    } else {
      console.warn("advanceTime method not available in gameTime");
    }
  };
  
  // Méthode pour avancer le temps (alias de advanceSeason pour compatibilité)
  const advanceTime = () => {
    advanceSeason();
  };
  
  // Méthode pour définir une année spécifique
  const setYear = (newYear: number) => {
    if (typeof gameTime.advanceTime === 'function') {
      // Utiliser la méthode disponible ou adapter selon l'API
      console.log(`Set year to ${newYear}`);
      const currentYear = gameTime.year;
      const diff = newYear - currentYear;
      
      // Advance time by the difference in years
      for (let i = 0; i < diff * 4; i++) { // 4 seasons per year
        gameTime.advanceTime();
      }
    } else {
      console.warn("Cannot set year directly, advanceTime method not available");
    }
  };
  
  // Méthode pour définir une saison spécifique
  const setSeason = (newSeason: Season) => {
    if (typeof gameTime.advanceTime === 'function') {
      // Use the available API to get to the desired season
      console.log(`Setting season to ${newSeason}`);
      while (gameTime.season !== newSeason) {
        gameTime.advanceTime();
      }
    } else {
      console.warn("Cannot set season directly, advanceTime method not available");
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
