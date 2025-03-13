
import { GameDate, Season, GamePhase } from '../types/common';
import { convertSeasonBetweenSystems } from '@/utils/timeSystem';

// Crée les opérations de gestion du temps
export const createTimeOperations = (
  setCurrentDate: React.Dispatch<React.SetStateAction<GameDate>>,
  setCurrentPhase: React.Dispatch<React.SetStateAction<GamePhase>>
) => {
  // Fonction pour avancer le temps
  const advanceTime = (newSeason?: Season) => {
    setCurrentDate(prevDate => {
      // Si une saison spécifique est fournie, avancer à cette saison
      if (newSeason) {
        return {
          ...prevDate,
          season: newSeason
        };
      }
      
      // Sinon, avancer à la saison suivante selon un ordre prédéfini
      const seasons: Season[] = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
      const currentIndex = seasons.indexOf(prevDate.season);
      const nextIndex = (currentIndex + 1) % seasons.length;
      
      // Si nous revenons à la première saison, incrémenter l'année
      if (nextIndex === 0) {
        return {
          season: seasons[nextIndex],
          year: prevDate.year + 1
        };
      }
      
      // Sinon, juste changer de saison
      return {
        ...prevDate,
        season: seasons[nextIndex]
      };
    });
  };
  
  // Fonction pour changer la phase du jeu
  const changePhase = (phase: GamePhase) => {
    setCurrentPhase(phase);
  };
  
  return {
    advanceTime,
    changePhase
  };
};
