
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
    if (typeof gameTime.updateGameTime === 'function') {
      gameTime.updateGameTime({ 
        year: newYear, 
        season: gameTime.season 
      });
    } else {
      console.warn("updateGameTime method not available in gameTime");
    }
  };
  
  // Méthode pour définir une saison spécifique
  const setSeason = (newSeason: Season) => {
    if (typeof gameTime.updateGameTime === 'function') {
      gameTime.updateGameTime({
        year: gameTime.year, 
        season: newSeason
      });
    } else {
      console.warn("updateGameTime method not available in gameTime");
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
