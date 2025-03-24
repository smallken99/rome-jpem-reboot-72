
/**
 * Formate un nombre en devise romaine (As)
 * @param value - Montant à formater
 * @returns Chaîne formatée
 */
export const formatCurrency = (value: number): string => {
  return `${value.toLocaleString()} As`;
};

/**
 * Formate un nombre en notation compacte
 * @param value - Montant à formater
 * @returns Chaîne formatée
 */
export const formatCompactCurrency = (value: number): string => {
  const formatter = new Intl.NumberFormat('fr-FR', {
    notation: 'compact',
    compactDisplay: 'short'
  });
  
  return `${formatter.format(value)} As`;
};

/**
 * Ajoute un préfixe +/- selon que le montant est positif ou négatif
 * @param value - Montant à formater
 * @returns Chaîne formatée avec préfixe
 */
export const formatCurrencyWithSign = (value: number): string => {
  const prefix = value >= 0 ? '+' : '';
  return `${prefix}${formatCurrency(value)}`;
};
