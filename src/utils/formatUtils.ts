
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
