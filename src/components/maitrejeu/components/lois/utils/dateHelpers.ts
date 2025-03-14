
import { GameDate } from '@/components/maitrejeu/types/common';

/**
 * Garantit qu'un objet de date est un GameDate valide
 */
export const ensureGameDate = (date: any): GameDate => {
  if (!date) {
    // Valeur par défaut si aucune date n'est fournie
    return { year: new Date().getFullYear(), season: 'Ver' };
  }
  
  // Si c'est déjà un GameDate valide
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return date as GameDate;
  }
  
  // Si c'est une chaîne, essayons de l'analyser
  if (typeof date === 'string') {
    try {
      const [yearPart, seasonPart] = date.split(' ');
      const year = parseInt(yearPart, 10);
      
      if (!isNaN(year)) {
        return {
          year,
          season: seasonPart || 'Ver'
        };
      }
    } catch (error) {
      console.error('Erreur lors de l\'analyse de la date:', date);
    }
  }
  
  // Valeur par défaut si aucun cas ci-dessus ne fonctionne
  return { year: new Date().getFullYear(), season: 'Ver' };
};

/**
 * Formate toute date en une chaîne lisible
 */
export const formatAnyGameDate = (date: any): string => {
  const gameDate = ensureGameDate(date);
  return `An ${gameDate.year} - ${gameDate.season}`;
};
