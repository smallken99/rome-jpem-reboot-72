
/**
 * Utilitaires de formattage pour l'application
 */

/**
 * Formate un montant en as (monnaie romaine)
 * @param amount Montant à formater
 * @param abbreviate Abréger les grands nombres (ex: 1.2M au lieu de 1,200,000)
 * @returns La chaîne formatée
 */
export const formatMoney = (amount: number, abbreviate: boolean = false): string => {
  if (abbreviate && Math.abs(amount) >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M As`;
  } else if (abbreviate && Math.abs(amount) >= 1000) {
    return `${(amount / 1000).toFixed(1)}K As`;
  }
  
  return `${amount.toLocaleString()} As`;
};

/**
 * Formate un pourcentage
 * @param value Valeur à formater
 * @param decimals Nombre de décimales
 * @returns La chaîne formatée
 */
export const formatPercent = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formate une date romaine
 * @param year Année (Ab Urbe Condita)
 * @param season Saison
 * @param day Jour dans la saison
 * @returns La chaîne formatée
 */
export const formatRomanDate = (year: number, season: string, day: number): string => {
  return `${day} ${season}, ${year} AUC`;
};
