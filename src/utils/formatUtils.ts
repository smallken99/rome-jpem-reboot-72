
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
