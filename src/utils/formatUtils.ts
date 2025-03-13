
/**
 * Formate un nombre en monnaie romaine (As)
 */
export const formatMoney = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(2)}M As`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K As`;
  } else {
    return `${amount} As`;
  }
};

/**
 * Formate une date de jeu en texte lisible
 */
export const formatDate = (year: number, season: string): string => {
  const seasonNames: Record<string, string> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas',
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems'
  };
  
  return `${seasonNames[season]} ${year} AUC`;
};

/**
 * Formate un pourcentage
 */
export const formatPercentage = (value: number, decimalPlaces: number = 1): string => {
  return `${value.toFixed(decimalPlaces)}%`;
};

/**
 * Formate un grand nombre
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

/**
 * Calcule l'évolution en pourcentage entre deux valeurs
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Formate un temps d'activité en format lisible
 */
export const formatUptime = (uptimeInSeconds: number): string => {
  const days = Math.floor(uptimeInSeconds / 86400);
  const hours = Math.floor((uptimeInSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}j ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

/**
 * Convertit une saison du système de temps en saison pour le MJ
 */
export const convertTimeSeasonToMaitreJeuSeason = (season: string): import('@/components/maitrejeu/types/common').Season => {
  const seasonMap: Record<string, import('@/components/maitrejeu/types/common').Season> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas',
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems',
    'Ver': 'Ver',
    'Aestas': 'Aestas',
    'Autumnus': 'Autumnus',
    'Hiems': 'Hiems'
  };
  
  return seasonMap[season] || 'Ver';
};

/**
 * Formate une date complète pour affichage
 */
export const formatFullDate = (date: { year: number, season: string }): string => {
  return `${convertTimeSeasonToMaitreJeuSeason(date.season)} ${date.year} AUC`;
};

/**
 * Convertit une valeur numérique en notation romaine de qualité/influence
 */
export const numberToRomanInfluence = (value: number): string => {
  if (value >= 90) return '++++';
  if (value >= 70) return '+++';
  if (value >= 50) return '++';
  if (value >= 30) return '+';
  return '-';
};
