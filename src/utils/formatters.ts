
/**
 * Formate un nombre en monnaie romaine (As)
 * @param amount Montant à formater
 */
export const formatCurrency = (amount: number): string => {
  if (amount === undefined || amount === null) return '0 As';
  
  if (amount >= 1000000) {
    return `${(amount / 1000000).toLocaleString('fr-FR', { 
      maximumFractionDigits: 1,
      minimumFractionDigits: 0
    })}M As`;
  }
  
  if (amount >= 1000) {
    return `${(amount / 1000).toLocaleString('fr-FR', { 
      maximumFractionDigits: 1,
      minimumFractionDigits: 0
    })}k As`;
  }
  
  return `${amount.toLocaleString('fr-FR')} As`;
};

/**
 * Formate une date pour l'affichage
 * @param date Date à formater
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return 'Date inconnue';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Formate un nombre pour l'affichage
 * @param value Nombre à formater
 * @param decimals Nombre de décimales
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  if (value === undefined || value === null) return '0';
  
  return value.toLocaleString('fr-FR', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  });
};

/**
 * Formate un pourcentage pour l'affichage
 * @param value Valeur à formater (0-1 ou 0-100)
 * @param decimals Nombre de décimales
 */
export const formatPercent = (value: number, decimals: number = 0): string => {
  if (value === undefined || value === null) return '0%';
  
  // Si la valeur est entre 0 et 1, on la multiplie par 100
  const percentage = value > 1 ? value : value * 100;
  
  return `${percentage.toLocaleString('fr-FR', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  })}%`;
};

/**
 * Tronque un texte trop long et ajoute des points de suspension
 * @param text Texte à tronquer
 * @param maxLength Longueur maximale
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};
