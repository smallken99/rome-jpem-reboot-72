
import { GameDate } from '@/components/maitrejeu/types/common';

// Fonction pour formatter l'argent en format romain
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(2)} M as`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(2)} K as`;
  } else {
    return `${amount} as`;
  }
};

// Alias pour la compatibilité: formatMoney est utilisé dans plusieurs composants
export const formatMoney = formatCurrency;

// Fonction pour formatter une date de jeu
export const formatDate = (date: GameDate): string => {
  return `${date.year} AUC, ${formatSeason(date.season)}`;
};

// Fonction pour formater une saison
export const formatSeason = (season: string): string => {
  switch (season) {
    case 'Ver':
      return 'Printemps (Ver)';
    case 'Aestas':
      return 'Été (Aestas)';
    case 'Autumnus':
      return 'Automne (Autumnus)';
    case 'Hiems':
      return 'Hiver (Hiems)';
    default:
      return season;
  }
};

// Fonction pour formatter un nombre avec des séparateurs de milliers
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Fonction pour formatter un pourcentage
export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Fonction pour formatter une date au format court
export const formatShortDate = (date: GameDate): string => {
  const seasonMap: Record<string, string> = {
    'Ver': 'P',
    'Aestas': 'É',
    'Autumnus': 'A',
    'Hiems': 'H'
  };
  
  return `${date.year} ${seasonMap[date.season as string] || date.season}`;
};

// Fonction pour formatter la durée de fonctionnement (uptime)
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

// Fonction pour convertir une Date JavaScript en GameDate
export const dateToGameDate = (date: Date): GameDate => {
  // Logique simplifiée pour la conversion
  const month = date.getMonth();
  let season: string;
  
  if (month >= 2 && month <= 4) season = 'Ver';
  else if (month >= 5 && month <= 7) season = 'Aestas';
  else if (month >= 8 && month <= 10) season = 'Autumnus';
  else season = 'Hiems';
  
  return {
    year: 750 + (date.getFullYear() - 2023), // Exemple simple
    season
  };
};

// Fonction pour calculer la différence entre deux dates de jeu
export const getDateDifference = (date1: GameDate, date2: GameDate): number => {
  // Calcul simplifié: chaque année = 4 saisons
  const seasons1 = date1.year * 4 + getSeasonNumber(date1.season);
  const seasons2 = date2.year * 4 + getSeasonNumber(date2.season);
  
  return seasons2 - seasons1;
};

// Fonction auxiliaire pour obtenir l'index numérique d'une saison
const getSeasonNumber = (season: string): number => {
  switch (season) {
    case 'Ver': return 0;
    case 'Aestas': return 1;
    case 'Autumnus': return 2;
    case 'Hiems': return 3;
    default: return 0;
  }
};
