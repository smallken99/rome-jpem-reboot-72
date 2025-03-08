
import { GameDate, Season } from './common';

// Types liés à la gestion du temps
export type GamePhase = 'SETUP' | 'ELECTION' | 'ACTION' | 'SENAT' | 'EVENEMENT' | 'ADMINISTRATION';

export interface TimeManagementProps {
  currentYear: number;
  currentSeason: Season;
  currentPhase: GamePhase;
  onAdvancePhase: () => void;
  onAdvanceSeason: () => void;
  onAdvanceYear: () => void;
}

export interface TimeSystem {
  date: GameDate;
  phase: GamePhase;
  advanceTime: () => void;
  setDate: (date: GameDate) => void;
  setPhase: (phase: GamePhase) => void;
}
