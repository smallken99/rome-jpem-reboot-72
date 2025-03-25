
/**
 * Formate une valeur numérique en devise (As)
 */
export const formatCurrency = (value: number | undefined): string => {
  if (value === undefined) return "0 As";
  
  // Formater avec séparateur de milliers
  return `${value.toLocaleString('fr-FR')} As`;
};

/**
 * Formate un pourcentage
 */
export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

/**
 * Formate une date en format français
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('fr-FR');
};
