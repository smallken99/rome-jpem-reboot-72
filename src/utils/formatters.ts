
/**
 * Formate un nombre en valeur monétaire (As romains)
 */
export const formatCurrency = (value: number): string => {
  return `${value.toLocaleString('fr-FR')} As`;
};

/**
 * Formate un pourcentage
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

/**
 * Formate une date romaine
 */
export const formatRomanDate = (year: number, season: string): string => {
  let result = `An ${year}`;
  if (season) {
    result += `, ${season}`;
  }
  return result;
};

/**
 * Format date object to roman date format
 */
export const formatGameDate = (date: {year: number, season: string} | Date): string => {
  if (date instanceof Date) {
    // Convert standard date to game date format
    const month = date.getMonth();
    let season = '';
    
    if (month >= 0 && month <= 2) season = 'Hiems';
    else if (month >= 3 && month <= 5) season = 'Ver';
    else if (month >= 6 && month <= 8) season = 'Aestas';
    else season = 'Autumnus';
    
    return `An ${date.getFullYear()}, ${season}`;
  } else {
    // It's already a game date format
    return `An ${date.year}, ${date.season}`;
  }
};
