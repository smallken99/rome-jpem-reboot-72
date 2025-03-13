import { GameDate } from '@/components/maitrejeu/types/common';
import { useMaitreJeu } from '@/components/maitrejeu/context';

export type Season = 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';
export type PlayerSeason = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';

// Ajout du hook useTimeStore qui manque
export const useTimeStore = () => {
  // Utiliser le contexte du Maître de Jeu pour obtenir les informations de temps
  const { currentDate, currentPhase, advanceTime, changePhase } = useMaitreJeu();
  
  return {
    currentDate,
    currentPhase,
    advanceTime,
    changePhase,
    formatSeason: (season: Season) => formatSeason(season),
    formatRomanSeason: (season: Season) => {
      const seasons: Record<Season, string> = {
        'Ver': 'Printemps',
        'Aestas': 'Été',
        'Autumnus': 'Automne',
        'Hiems': 'Hiver'
      };
      return seasons[season] || season;
    }
  };
};

// Fonction pour formater la saison en français
export const formatSeason = (season: Season): string => {
  const seasons: Record<Season, string> = {
    'Ver': 'Printemps',
    'Aestas': 'Été',
    'Autumnus': 'Automne',
    'Hiems': 'Hiver'
  };
  return seasons[season] || String(season);
};

// Fonction pour formater la date du jeu
export const formatGameDate = (date: GameDate): string => {
  return `${formatSeason(date.season as Season)} ${date.year}`;
};

// Fonction pour convertir les saisons entre les systèmes MJ et Player
export const convertSeasonBetweenSystems = (season: string, targetSystem: 'mj' | 'player'): Season | PlayerSeason => {
  if (targetSystem === 'mj') {
    const seasons: Record<string, Season> = {
      'SPRING': 'Ver',
      'SUMMER': 'Aestas',
      'AUTUMN': 'Autumnus',
      'WINTER': 'Hiems'
    };
    return seasons[season] || 'Ver';
  } else {
    const seasons: Record<string, PlayerSeason> = {
      'Ver': 'SPRING',
      'Aestas': 'SUMMER',
      'Autumnus': 'AUTUMN',
      'Hiems': 'WINTER'
    };
    return seasons[season] || 'SPRING';
  }
};
