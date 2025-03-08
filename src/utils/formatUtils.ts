
import { Season } from "@/components/maitrejeu/types/common";

// Fonction pour convertir une saison en nom français
export const seasonToFrench = (season: Season): string => {
  const seasonMap: Record<Season, string> = {
    'SPRING': 'Printemps',
    'SUMMER': 'Été',
    'AUTUMN': 'Automne',
    'WINTER': 'Hiver'
  };
  return seasonMap[season];
};

// Fonction pour formater une date romaine
export const formatDate = (year: number, season: Season, day?: number): string => {
  const seasonName = seasonToFrench(season);
  if (day) {
    return `Jour ${day}, ${seasonName} ${year} AUC`;
  }
  return `${seasonName} ${year} AUC`;
};

// Fonction pour formater un montant d'argent en As
export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR').format(amount) + " As";
};

// Fonction pour formater la durée de fonctionnement
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

// Conversion entre système de saisons du MaitreJeu et le système de temps
export const convertTimeSeasonToMaitreJeuSeason = (season: import('@/utils/timeSystem').Season): Season => {
  const seasonMap: Record<import('@/utils/timeSystem').Season, Season> = {
    'Ver': 'SPRING',
    'Aestas': 'SUMMER',
    'Autumnus': 'AUTUMN',
    'Hiems': 'WINTER'
  };
  return seasonMap[season];
};

export const convertMaitreJeuSeasonToTimeSeason = (season: Season): import('@/utils/timeSystem').Season => {
  const seasonMap: Record<Season, import('@/utils/timeSystem').Season> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas',
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems'
  };
  return seasonMap[season];
};
