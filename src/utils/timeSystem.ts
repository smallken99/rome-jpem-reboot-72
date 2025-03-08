
import { create } from 'zustand';

// Saisons romaines
export type Season = 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';

export interface TimeState {
  year: number;
  season: Season;
  dayInSeason: number;
  daysPerSeason: number;
  seasonIndex: number;
  advanceDay: () => void;
  advanceSeason: () => void;
  advanceYear: () => void;
  formatDate: () => string;
  advanceGamePhase: (currentPhase: string) => string;
}

// Saisons romaines
const seasons: Season[] = ['Ver', 'Aestas', 'Autumnus', 'Hiems']; // Printemps, Été, Automne, Hiver
const DAYS_PER_SEASON = 90; // ~3 mois par saison
const STARTING_YEAR = 200; // Année de début du jeu (200 après la fondation de Rome)

/**
 * Store pour gérer le système de temps du jeu
 */
export const useTimeStore = create<TimeState>((set, get) => ({
  year: STARTING_YEAR, // Ab Urbe Condita (AUC) - depuis la fondation de Rome
  season: 'Ver', // Commencer au printemps
  dayInSeason: 1,
  daysPerSeason: DAYS_PER_SEASON,
  seasonIndex: 0,
  
  // Avancer d'un jour
  advanceDay: () => set(state => {
    const newDayInSeason = state.dayInSeason + 1;
    
    // Si nous avons atteint la fin de la saison
    if (newDayInSeason > state.daysPerSeason) {
      // Réinitialiser le jour et passer à la saison suivante
      return {
        dayInSeason: 1
      };
    }
    
    return { dayInSeason: newDayInSeason };
  }),
  
  // Avancer à la saison suivante
  advanceSeason: () => set(state => {
    const newSeasonIndex = (state.seasonIndex + 1) % 4;
    
    // Si nous avons terminé une année complète
    if (newSeasonIndex === 0) {
      return {
        seasonIndex: newSeasonIndex,
        season: seasons[newSeasonIndex],
      };
    }
    
    return {
      seasonIndex: newSeasonIndex,
      season: seasons[newSeasonIndex]
    };
  }),
  
  // Avancer d'une année complète
  advanceYear: () => set(state => ({ year: state.year + 1 })),
  
  // Formater la date actuelle dans le style romain
  formatDate: () => {
    const { year, season, dayInSeason } = get();
    return `${dayInSeason} ${season}, ${year} AUC`;
  },
  
  // Avancer à la phase de jeu suivante
  advanceGamePhase: (currentPhase: string) => {
    const phases = [
      'VOTE_DES_LOIS',
      'ÉLECTIONS',
      'ADMINISTRATION',
      'GUERRE',
      'DIPLOMATIE',
      'COMMERCE',
      'CRISES'
    ];
    
    const currentIndex = phases.indexOf(currentPhase);
    const nextIndex = (currentIndex + 1) % phases.length;
    
    // Si on revient à la première phase, avancer la saison
    if (nextIndex === 0) {
      get().advanceSeason();
      
      // Si nous sommes revenus à Ver, avancer l'année
      if (get().seasonIndex === 0) {
        get().advanceYear();
      }
    }
    
    return phases[nextIndex];
  }
}));

/**
 * Hook personnalisé pour écouter les changements de temps et déclencher des événements
 * @param onDayChange - Callback lors du changement de jour
 * @param onSeasonChange - Callback lors du changement de saison
 * @param onYearChange - Callback lors du changement d'année
 */
export const useTimeEvents = (
  onDayChange?: () => void,
  onSeasonChange?: (season: Season) => void,
  onYearChange?: (year: number) => void
) => {
  const { year, season, dayInSeason, advanceDay, advanceSeason, advanceYear } = useTimeStore();
  
  // Fonction pour avancer le temps d'un jour avec tous les effets en cascade potentiels
  const advanceTime = () => {
    const prevDay = dayInSeason;
    const prevSeason = season;
    const prevYear = year;
    
    // D'abord avancer le jour
    advanceDay();
    
    // Vérifier si le jour est réinitialisé à 1, ce qui signifie que la saison a changé
    if (prevDay === DAYS_PER_SEASON) {
      advanceSeason();
      
      // Vérifier si nous sommes revenus à la première saison, ce qui signifie que l'année a changé
      if (prevSeason === 'Hiems') {
        advanceYear();
        
        // Déclencher le callback de changement d'année
        if (onYearChange) {
          onYearChange(year + 1); // Utiliser +1 car l'état n'a pas encore été mis à jour dans ce contexte
        }
      }
      
      // Déclencher le callback de changement de saison
      if (onSeasonChange) {
        const nextSeasonIndex = (seasons.indexOf(prevSeason) + 1) % 4;
        onSeasonChange(seasons[nextSeasonIndex]);
      }
    }
    
    // Déclencher le callback de changement de jour
    if (onDayChange) {
      onDayChange();
    }
  };
  
  return {
    year,
    season,
    dayInSeason,
    advanceTime
  };
};

// Exporter les fonctions d'utilitaires pour le formatage des dates romaines
export const formatRomanDate = (year: number, season: Season, day: number): string => {
  return `${day} ${season}, ${year} AUC`;
};

export const formatRomanSeason = (season: Season): string => {
  const seasonMap: Record<Season, string> = {
    'Ver': 'Printemps',
    'Aestas': 'Été',
    'Autumnus': 'Automne',
    'Hiems': 'Hiver'
  };
  
  return seasonMap[season] || season;
};
