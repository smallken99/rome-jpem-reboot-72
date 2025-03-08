
import { GameDate, Season, GamePhase } from '../types/common';

export const createTimeOperations = (
  setCurrentDate: React.Dispatch<React.SetStateAction<GameDate>>,
  setCurrentPhase: React.Dispatch<React.SetStateAction<GamePhase>>
) => {
  const advanceTime = (newSeason?: Season) => {
    setCurrentDate(prevDate => {
      if (newSeason) {
        return { ...prevDate, season: newSeason };
      }
      
      // Avancer à la saison suivante
      const seasons: Season[] = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];
      const currentIndex = seasons.indexOf(prevDate.season);
      const nextIndex = (currentIndex + 1) % 4;
      
      // Si on revient à SPRING, on avance l'année
      if (nextIndex === 0) {
        return { year: prevDate.year + 1, season: "SPRING" };
      } else {
        return { ...prevDate, season: seasons[nextIndex] };
      }
    });
  };

  const changePhase = (phase: GamePhase) => {
    setCurrentPhase(phase);
  };

  return {
    advanceTime,
    changePhase
  };
};
