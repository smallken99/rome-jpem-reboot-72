
import { Season as TimeSystemSeason } from '@/utils/timeSystem';

// Types de base
export type Season = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
export type ImportanceType = 'majeure' | 'mineure' | 'normale';
export type GamePhase = 'SETUP' | 'ELECTION' | 'ACTION' | 'SENAT' | 'EVENEMENT' | 'ADMINISTRATION';
export type PhaseType = string;

// Fonction de conversion entre les types de saisons
export const convertTimeSeasonToMaitreJeuSeason = (season: TimeSystemSeason): Season => {
  const seasonMap: Record<TimeSystemSeason, Season> = {
    'Ver': 'SPRING',
    'Aestas': 'SUMMER',
    'Autumnus': 'AUTUMN',
    'Hiems': 'WINTER'
  };
  return seasonMap[season];
};

export const convertMaitreJeuSeasonToTimeSeason = (season: Season): TimeSystemSeason => {
  const seasonMap: Record<Season, TimeSystemSeason> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas',
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems'
  };
  return seasonMap[season];
};

// Interface de date commune
export interface GameDate {
  year: number;
  season: Season;
  day?: number;
}
