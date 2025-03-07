
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
 * Formate un montant avec couleur selon positif/négatif
 * @param amount Montant à formater
 * @param withPrefix Inclure un préfixe '+' pour les valeurs positives
 * @returns La chaîne formatée avec classe de couleur
 */
export const formatSignedMoney = (amount: number, withPrefix: boolean = true): { text: string, className: string } => {
  let text = formatMoney(Math.abs(amount));
  let className = "text-gray-900";
  
  if (amount > 0) {
    className = "text-green-600";
    if (withPrefix) text = `+${text}`;
  } else if (amount < 0) {
    className = "text-red-600";
    text = `-${text}`;
  }
  
  return { text, className };
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
 * Formate un pourcentage avec une indication de positif/négatif
 * @param value Valeur à formater
 * @param withSign Inclure un signe +/-
 * @returns La chaîne formatée avec classe de couleur
 */
export const formatSignedPercent = (value: number, withSign: boolean = true): { text: string, className: string } => {
  let text = `${Math.abs(value).toFixed(1)}%`;
  let className = "text-gray-900";
  
  if (value > 0) {
    className = "text-green-600";
    if (withSign) text = `+${text}`;
  } else if (value < 0) {
    className = "text-red-600";
    text = `-${text}`;
  }
  
  return { text, className };
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

/**
 * Formate une durée en années romaines
 * @param years Nombre d'années
 * @returns La chaîne formatée
 */
export const formatRomanYears = (years: number): string => {
  if (years === 1) return "1 année";
  return `${years} années`;
};

/**
 * Formate un statut en badge
 * @param status Statut à formater
 * @returns Configuration du badge
 */
export const formatStatusBadge = (status: string): { label: string, className: string } => {
  switch(status.toLowerCase()) {
    case "active":
    case "actif":
    case "completed":
    case "terminé":
    case "approved":
    case "approuvé":
      return { label: "Actif", className: "bg-green-100 text-green-800" };
    
    case "pending":
    case "en attente":
    case "planned":
    case "planifié":
      return { label: "En attente", className: "bg-yellow-100 text-yellow-800" };
    
    case "inactive":
    case "inactif":
    case "abandoned":
    case "abandonné":
      return { label: "Inactif", className: "bg-gray-100 text-gray-800" };
    
    case "damaged":
    case "endommagé":
    case "critical":
    case "critique":
      return { label: "Critique", className: "bg-red-100 text-red-800" };
    
    case "in_progress":
    case "en cours":
      return { label: "En cours", className: "bg-blue-100 text-blue-800" };
    
    default:
      return { label: status, className: "bg-gray-100 text-gray-800" };
  }
};

