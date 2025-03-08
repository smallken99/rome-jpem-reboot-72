
import { Season } from "@/components/maitrejeu/types/maitreJeuTypes";

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
