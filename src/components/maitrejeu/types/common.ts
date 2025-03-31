
// Types pour les dates et les saisons
export type Season = 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems' | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' | 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'spring' | 'summer' | 'autumn' | 'fall' | 'winter';

export interface GameDate {
  year: number;
  season: Season;
  day?: number;
  phase?: string;
}

export const parseStringToGameDate = (dateString: string): GameDate => {
  // Format attendu: "705 AUC, Spring"
  const parts = dateString.split(',');
  
  if (parts.length < 2) {
    // Format fallback: just try to extract year and assume Spring
    const yearMatch = dateString.match(/\d+/);
    return {
      year: yearMatch ? parseInt(yearMatch[0]) : 700,
      season: 'Ver'
    };
  }
  
  const yearPart = parts[0].trim();
  const seasonPart = parts[1].trim();
  
  // Extraire l'année (avant "AUC" ou juste le nombre)
  const yearMatch = yearPart.match(/\d+/);
  const year = yearMatch ? parseInt(yearMatch[0]) : 700;
  
  // Mapper la saison
  let season: Season;
  if (seasonPart === 'Printemps' || seasonPart === 'Ver' || 
      seasonPart === 'SPRING' || seasonPart === 'Spring' || 
      seasonPart === 'spring') {
    season = 'Ver';
  } else if (seasonPart === 'Été' || seasonPart === 'Aestas' || 
             seasonPart === 'SUMMER' || seasonPart === 'Summer' || 
             seasonPart === 'summer') {
    season = 'Aestas';
  } else if (seasonPart === 'Automne' || seasonPart === 'Autumnus' || 
             seasonPart === 'AUTUMN' || seasonPart === 'Autumn' || 
             seasonPart === 'autumn' || seasonPart === 'Fall' || 
             seasonPart === 'fall') {
    season = 'Autumnus';
  } else {
    season = 'Hiems';
  }
  
  return { year, season };
};

export const formatGameDate = (date: GameDate): string => {
  const seasonDisplay = {
    'Ver': 'Printemps',
    'Aestas': 'Été',
    'Autumnus': 'Automne',
    'Hiems': 'Hiver',
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver',
    'Spring': 'Printemps',
    'Summer': 'Été',
    'Autumn': 'Automne',
    'Winter': 'Hiver',
    'spring': 'Printemps',
    'summer': 'Été',
    'autumn': 'Automne',
    'fall': 'Automne',
    'winter': 'Hiver'
  };

  return `${date.year} AUC, ${seasonDisplay[date.season] || date.season}`;
};

// Conversion entre formats de date
export const gameDateToString = (date: GameDate): string => {
  return `${date.year} AUC, ${date.season}`;
};

export const stringToGameDate = (dateString: string): GameDate => {
  return parseStringToGameDate(dateString);
};

// Fonction pour créer des objets GameDate
export const createGameDate = (year: number, season: Season): GameDate => {
  return { year, season };
};

// Fonction pour comparer des dates
export const compareGameDates = (date1: GameDate, date2: GameDate): number => {
  if (date1.year !== date2.year) {
    return date1.year - date2.year;
  }
  
  // Ordre des saisons
  const seasonOrder: Record<Season, number> = {
    'Ver': 0, 'SPRING': 0, 'Spring': 0, 'spring': 0,
    'Aestas': 1, 'SUMMER': 1, 'Summer': 1, 'summer': 1,
    'Autumnus': 2, 'AUTUMN': 2, 'Autumn': 2, 'autumn': 2, 'fall': 2,
    'Hiems': 3, 'WINTER': 3, 'Winter': 3, 'winter': 3
  };
  
  return seasonOrder[date1.season] - seasonOrder[date2.season];
};

// Fonction pour avancer une date d'une saison
export const advanceGameDateBySeason = (date: GameDate): GameDate => {
  const seasonOrder: Season[] = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
  const currentSeasonIndex = seasonOrder.indexOf(date.season as 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems');
  
  if (currentSeasonIndex === -1) {
    // Conversion de la saison si elle n'est pas dans le format standard
    let standardSeason: 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';
    if (date.season === 'SPRING' || date.season === 'Spring' || date.season === 'spring') {
      standardSeason = 'Ver';
    } else if (date.season === 'SUMMER' || date.season === 'Summer' || date.season === 'summer') {
      standardSeason = 'Aestas';
    } else if (date.season === 'AUTUMN' || date.season === 'Autumn' || date.season === 'autumn' || date.season === 'fall') {
      standardSeason = 'Autumnus';
    } else {
      standardSeason = 'Hiems';
    }
    
    const standardSeasonIndex = seasonOrder.indexOf(standardSeason);
    const nextSeasonIndex = (standardSeasonIndex + 1) % 4;
    const nextSeason = seasonOrder[nextSeasonIndex];
    
    return {
      year: nextSeasonIndex === 0 ? date.year + 1 : date.year,
      season: nextSeason
    };
  }
  
  const nextSeasonIndex = (currentSeasonIndex + 1) % 4;
  const nextSeason = seasonOrder[nextSeasonIndex];
  
  return {
    year: nextSeasonIndex === 0 ? date.year + 1 : date.year,
    season: nextSeason
  };
};
