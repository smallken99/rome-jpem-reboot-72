
/**
 * Formate un montant en As (la monnaie romaine)
 * @param amount - Montant à formater
 * @returns Montant formaté avec séparateurs de milliers et unité "As"
 */
export const formatMoney = (amount: number): string => {
  return `${amount.toLocaleString()} As`;
};

/**
 * Formate un pourcentage
 * @param value - Valeur à formater en pourcentage
 * @param decimals - Nombre de décimales (défaut: 1)
 * @returns Valeur formatée en pourcentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formate une date au format romain
 * @param date - Date à formater
 * @returns Date au format romain (ex: "XV Kalends Martius, 709 AUC")
 */
export const formatRomanDate = (date: Date): string => {
  // Implémentation simplifiée pour l'instant
  const months = ["Januarius", "Februarius", "Martius", "Aprilis", "Maius", "Junius", 
                 "Julius", "Augustus", "September", "October", "November", "December"];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  
  // Calcul approximatif de l'année AUC (Ab Urbe Condita - depuis la fondation de Rome)
  const yearAUC = date.getFullYear() + 753;
  
  return `${day} ${month}, ${yearAUC} AUC`;
};

/**
 * Formate un montant en devise (As)
 * @param amount - Montant à formater
 * @returns Montant formaté avec séparateurs de milliers et unité "As"
 */
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} As`;
};

/**
 * Formate un nombre avec séparateurs de milliers
 * @param value - Valeur à formater
 * @returns Nombre formaté avec séparateurs de milliers
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString();
};

/**
 * Formate une GameDate pour l'affichage
 * @param date - GameDate à formater ou Date standard
 * @returns Date formatée pour l'affichage
 */
export const formatDate = (date: any): string => {
  if (date instanceof Date) {
    return formatRomanDate(date);
  }
  
  if (typeof date === 'object' && date !== null && 'year' in date && 'season' in date) {
    return `An ${date.year}, ${formatSeason(date.season)}`;
  }
  
  return String(date);
};

/**
 * Formate une saison pour l'affichage
 * @param season - Saison à formater
 * @returns Saison formatée en français
 */
export const formatSeason = (season: string): string => {
  const seasonMap: Record<string, string> = {
    'Ver': 'Printemps',
    'Aestas': 'Été',
    'Autumnus': 'Automne',
    'Hiems': 'Hiver',
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver'
  };
  
  return seasonMap[season] || season;
};

/**
 * Formate la durée de fonctionnement
 * @param seconds - Durée en secondes
 * @returns Durée formatée (jours, heures, minutes)
 */
export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}j ${hours}h ${minutes}m`;
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m`;
};

/**
 * Formate une date en format court
 * @param date - Date à formater
 * @returns Date au format court (ex: "15 Avr. 709")
 */
export const formatShortDate = (date: Date): string => {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", 
                 "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const yearAUC = date.getFullYear() + 753;
  
  return `${day} ${month}. ${yearAUC}`;
};
