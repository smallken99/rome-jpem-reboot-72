
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
