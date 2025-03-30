
import { useState } from 'react';
import { GameDate, Season } from '@/utils/types/gameDate';

export const useGameTime = (initialYear = 264, initialSeason: Season = 'spring') => {
  const [year, setYear] = useState<number>(initialYear);
  const [season, setSeason] = useState<Season>(initialSeason);
  
  // Fonction pour avancer d'une saison
  const advanceSeason = () => {
    const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];
    const currentIndex = seasons.indexOf(season);
    const nextIndex = (currentIndex + 1) % seasons.length;
    
    if (nextIndex === 0) {
      // Si nous passons de l'hiver au printemps, avancer d'une année
      setYear(year + 1);
    }
    
    setSeason(seasons[nextIndex]);
  };
  
  // Construction de la date courante au format GameDate
  const currentDate: GameDate = {
    year,
    season,
    toLocaleDateString: () => {
      const seasonNames = {
        spring: 'Printemps',
        summer: 'Été',
        autumn: 'Automne',
        winter: 'Hiver'
      };
      return `${seasonNames[season]} ${year}`;
    }
  };
  
  return {
    year,
    season,
    setYear,
    setSeason,
    advanceSeason,
    currentDate
  };
};
