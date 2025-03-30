
import { GameDate } from './types/gameDate';

export const formatDate = (date: Date | GameDate): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  
  const seasonNames = {
    spring: 'Printemps',
    summer: 'Été',
    autumn: 'Automne',
    winter: 'Hiver'
  };
  
  return `${seasonNames[date.season]} ${date.year}`;
};
