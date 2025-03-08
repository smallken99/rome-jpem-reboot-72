
/**
 * Formate un temps en secondes en une chaîne de texte représentant jours, heures, minutes, secondes
 * @param seconds Nombre de secondes à formater
 * @returns Chaîne formatée (ex: "2j 5h 30m 15s")
 */
export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}j`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

  return parts.join(' ');
};

/**
 * Formate un nombre en chaîne avec séparateurs de milliers
 * @param value Nombre à formater
 * @returns Chaîne formatée avec séparateurs de milliers
 */
export const formatNumber = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

/**
 * Formate un montant en devise (as romains)
 * @param amount Montant à formater
 * @returns Chaîne formatée (ex: "1 500 as")
 */
export const formatCurrency = (amount: number): string => {
  return `${formatNumber(amount)} as`;
};
