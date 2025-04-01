
/**
 * Formate une date pour l'affichage
 * @param date Date à formater
 * @param options Options de formatage
 */
export const formatDate = (date: Date | string | null | undefined, options: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('fr-FR', options);
};

/**
 * Calcule la différence en jours entre deux dates
 * @param startDate Date de début
 * @param endDate Date de fin
 */
export const getDaysDifference = (startDate: Date | string, endDate: Date | string = new Date()): number => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  const differenceInTime = end.getTime() - start.getTime();
  return Math.floor(differenceInTime / (1000 * 3600 * 24));
};

/**
 * Ajoute des jours à une date
 * @param date Date de départ
 * @param days Nombre de jours à ajouter
 */
export const addDays = (date: Date | string, days: number): Date => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

/**
 * Vérifie si une date est dans le passé
 * @param date Date à vérifier
 */
export const isInPast = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return dateObj < today;
};

/**
 * Vérifie si une date est entre deux autres dates
 * @param date Date à vérifier
 * @param startDate Date de début
 * @param endDate Date de fin
 */
export const isBetweenDates = (date: Date | string, startDate: Date | string, endDate: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  return dateObj >= start && dateObj <= end;
};

/**
 * Récupère l'année d'une date
 * @param date Date
 */
export const getYear = (date: Date | string): number => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getFullYear();
};

/**
 * Récupère le mois d'une date (1-12)
 * @param date Date
 */
export const getMonth = (date: Date | string): number => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getMonth() + 1; // getMonth() retourne 0-11
};
