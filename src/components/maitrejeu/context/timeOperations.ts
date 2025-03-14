
import { GameDate, GamePhase, Season } from '../types/common';

// Create a simple season conversion function (since we don't have access to timeSystem.ts's version)
const convertSeasonBetweenSystems = (season: string): Season => {
  const mapping: Record<string, Season> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas',
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems',
    'Printemps': 'Ver',
    'Été': 'Aestas',
    'Automne': 'Autumnus',
    'Hiver': 'Hiems'
  };
  
  return mapping[season] || season as Season;
};

// Define PlayerSeason type
type PlayerSeason = Season;

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
      const currentSeason = typeof prevDate.season === 'string'
        ? prevDate.season as Season
        : prevDate.season;
      
      const currentIndex = seasons.indexOf(currentSeason);
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
