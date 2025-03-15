
import { GameDate } from '@/components/maitrejeu/types/common';

// Format a GameDate for display
export const formatDate = (date: GameDate | string): string => {
  if (typeof date === 'string') return date;
  
  // Format season name
  const season = formatSeasonDisplay(date.season);
  
  return `${season} ${date.year} AUC`;
};

// Format a season name for display
export const formatSeasonDisplay = (season: string): string => {
  switch (season.toUpperCase()) {
    case 'VER':
    case 'SPRING':
      return 'Printemps';
    case 'AESTAS':
    case 'SUMMER':
      return 'Été';
    case 'AUTUMNUS':
    case 'FALL':
    case 'AUTUMN':
      return 'Automne';
    case 'HIEMS':
    case 'WINTER':
      return 'Hiver';
    default:
      return season;
  }
};

// Format une saison pour le système (en majuscules)
export const formatSeason = (season: string): string => {
  switch (season.toLowerCase()) {
    case 'printemps':
    case 'ver':
      return 'SPRING';
    case 'été':
    case 'aestas':
      return 'SUMMER';
    case 'automne':
    case 'autumnus':
      return 'FALL';
    case 'hiver':
    case 'hiems':
      return 'WINTER';
    default:
      return season.toUpperCase();
  }
};

// Fonction pour formater un montant d'argent
export const formatMoney = (amount: number): string => {
  return `${amount.toLocaleString()} deniers`;
};

// Alias de formatMoney pour compatibilité avec le code existant
export const formatCurrency = (amount: number): string => {
  return formatMoney(amount);
};

// Format le temps de fonctionnement d'un système
export const formatUptime = (uptime: number): string => {
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  
  if (days > 0) {
    return `${days}j ${hours}h ${minutes}m`;
  } else {
    return `${hours}h ${minutes}m`;
  }
};
