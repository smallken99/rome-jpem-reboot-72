
import { Season, GamePhase } from './common';

export interface TimeManagementProps {
  currentYear: number;
  currentSeason: Season;
  currentPhase: GamePhase;
  year?: number; // Pour compatibilité avec le code existant
  season?: Season; // Pour compatibilité avec le code existant
  phase?: GamePhase; // Pour compatibilité avec le code existant
  onAdvance: () => void;
  onPhaseChange: (phase: GamePhase) => void;
}
