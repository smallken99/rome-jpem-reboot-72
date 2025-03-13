
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

// Fonction pour formater une date de jeu
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
