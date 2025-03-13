
import { GameDate, Season, GamePhase, PlayerSeason, reverseSeasonMapping } from '../types/common';

export const createTimeOperations = (
  setCurrentDate: React.Dispatch<React.SetStateAction<GameDate>>,
  setCurrentPhase: React.Dispatch<React.SetStateAction<GamePhase>>
) => {
  const advanceTime = (newSeason?: Season | PlayerSeason) => {
    setCurrentDate(prevDate => {
      if (newSeason) {
        return { ...prevDate, season: newSeason };
      }
      
      // Advance to the next season
      const seasons: PlayerSeason[] = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];
      let currentIndex = -1;
      
      // Find the current season index
      if (typeof prevDate.season === 'string') {
        // Check if it's a PlayerSeason
        if (prevDate.season === 'SPRING' || prevDate.season === 'SUMMER' || 
            prevDate.season === 'AUTUMN' || prevDate.season === 'WINTER') {
          currentIndex = seasons.indexOf(prevDate.season as PlayerSeason);
        } else {
          // It's a Roman season, convert it
          const playerSeason = prevDate.season === 'Ver' ? 'SPRING' :
                              prevDate.season === 'Aestas' ? 'SUMMER' :
                              prevDate.season === 'Autumnus' ? 'AUTUMN' : 'WINTER';
          currentIndex = seasons.indexOf(playerSeason);
        }
      }
      
      const nextIndex = (currentIndex + 1) % 4;
      
      // If we return to SPRING, advance the year
      if (nextIndex === 0) {
        return { year: prevDate.year + 1, season: seasons[nextIndex] };
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
