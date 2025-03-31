
import { GameDate, Season } from '../types/common';

/**
 * Adaptateur pour convertir entre les différents formats de dates du jeu
 */
export const dateAdapter = {
  // Normalise les noms de saison à travers l'application
  normalizeSeasonName: (season: string): Season => {
    const seasonMap: Record<string, Season> = {
      'spring': 'SPRING',
      'Spring': 'SPRING',
      'Ver': 'SPRING',
      'SPRING': 'SPRING',
      
      'summer': 'SUMMER',
      'Summer': 'SUMMER',
      'Aes': 'SUMMER',
      'Aestas': 'SUMMER',
      'SUMMER': 'SUMMER',
      
      'autumn': 'AUTUMN',
      'Autumn': 'AUTUMN',
      'fall': 'AUTUMN',
      'Fall': 'AUTUMN',
      'Aut': 'AUTUMN',
      'Autumnus': 'AUTUMN',
      'AUTUMN': 'AUTUMN',
      
      'winter': 'WINTER',
      'Winter': 'WINTER',
      'Hie': 'WINTER',
      'Hiems': 'WINTER',
      'WINTER': 'WINTER'
    };
    
    return seasonMap[season] || 'SPRING';
  },
  
  // Convertit un format GameDate vers un format de date JS
  gameDateToJSDate: (gameDate: GameDate): Date => {
    const { year, season } = gameDate;
    
    // Mapper les saisons aux mois
    let month = 0;
    switch (season) {
      case 'SPRING':
      case 'Ver':
        month = 2; // Mars
        break;
      case 'SUMMER':
      case 'Aestas':
        month = 5; // Juin
        break;
      case 'AUTUMN':
      case 'Autumnus':
        month = 8; // Septembre
        break;
      case 'WINTER':
      case 'Hiems':
        month = 11; // Décembre
        break;
      default:
        month = 0; // Janvier par défaut
    }
    
    return new Date(year, month, 1);
  },
  
  // Convertit une date JS en format GameDate
  jsDateToGameDate: (date: Date): GameDate => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    let season: Season;
    if (month >= 2 && month <= 4) {
      season = 'SPRING';
    } else if (month >= 5 && month <= 7) {
      season = 'SUMMER';
    } else if (month >= 8 && month <= 10) {
      season = 'AUTUMN';
    } else {
      season = 'WINTER';
    }
    
    return { year, season };
  },
  
  // Formatte une GameDate pour l'affichage
  formatGameDate: (gameDate: GameDate): string => {
    const seasonStrings: Record<string, string> = {
      'SPRING': 'Printemps',
      'SUMMER': 'Été',
      'AUTUMN': 'Automne',
      'WINTER': 'Hiver',
      'Ver': 'Printemps',
      'Aestas': 'Été',
      'Autumnus': 'Automne',
      'Hiems': 'Hiver'
    };
    
    const seasonDisplay = seasonStrings[gameDate.season] || gameDate.season;
    return `${seasonDisplay} ${gameDate.year} AUC`;
  },
  
  // Convertit une chaîne de caractères en GameDate
  parseStringToGameDate: (dateString: string): GameDate => {
    try {
      const parts = dateString.split(' ');
      
      if (parts.length >= 2) {
        const year = parseInt(parts[0], 10);
        const season = this.normalizeSeasonName(parts[1]);
        
        return { year, season };
      }
      
      // Fallback: essayer de parser comme une date JS
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return this.jsDateToGameDate(date);
      }
    } catch (e) {
      console.error("Error parsing date string:", e);
    }
    
    // Valeur par défaut
    return { year: 701, season: 'SPRING' };
  },
  
  // Compare deux dates de jeu
  compareGameDates: (date1: GameDate, date2: GameDate): number => {
    if (date1.year !== date2.year) {
      return date1.year - date2.year;
    }
    
    const seasonOrder: Record<string, number> = {
      'SPRING': 0, 'Ver': 0,
      'SUMMER': 1, 'Aestas': 1,
      'AUTUMN': 2, 'Autumnus': 2,
      'WINTER': 3, 'Hiems': 3
    };
    
    const season1 = seasonOrder[date1.season] || 0;
    const season2 = seasonOrder[date2.season] || 0;
    
    return season1 - season2;
  },
  
  // Avance une date de jeu d'une saison
  advanceSeason: (gameDate: GameDate): GameDate => {
    const seasonOrder: Season[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
    const currentSeasonIndex = seasonOrder.indexOf(this.normalizeSeasonName(gameDate.season as string));
    
    if (currentSeasonIndex === -1) {
      // Saison inconnue, avancer à la suivante par défaut
      return { year: gameDate.year, season: 'SUMMER' };
    }
    
    const nextSeasonIndex = (currentSeasonIndex + 1) % 4;
    const nextSeason = seasonOrder[nextSeasonIndex];
    
    // Si on était en hiver, avancer d'une année
    if (nextSeasonIndex === 0) {
      return { year: gameDate.year + 1, season: nextSeason };
    }
    
    return { year: gameDate.year, season: nextSeason };
  }
};
