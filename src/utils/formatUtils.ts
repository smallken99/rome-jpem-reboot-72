
import { formatCurrency } from './currencyUtils';

// Format un nombre comme argent
export const formatMoney = (amount: number): string => {
  return formatCurrency(amount);
};

// Format une date au format romain
export const formatRomanDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Mois romains
  const romanMonths = [
    'Ianuarius', 'Februarius', 'Martius', 'Aprilis',
    'Maius', 'Iunius', 'Iulius', 'Augustus',
    'September', 'October', 'November', 'December'
  ];
  
  const day = d.getDate();
  const month = romanMonths[d.getMonth()];
  const year = d.getFullYear() + 753; // Ajouter 753 ans pour Ab Urbe Condita
  
  return `${day} ${month} ${year} AUC`;
};

// Convertit une chaîne de caractères en titre capitalisé
export const titleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Formatter une date standard
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

// Formatter une durée de temps
export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}j ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

// Formatter une saison
export const formatSeason = (season: string): string => {
  const seasons: Record<string, string> = {
    'spring': 'Printemps',
    'summer': 'Été',
    'autumn': 'Automne',
    'winter': 'Hiver'
  };
  
  return seasons[season.toLowerCase()] || season;
};

// Exporter les fonctions pour qu'elles soient accessibles
export { formatCurrency } from './currencyUtils';
