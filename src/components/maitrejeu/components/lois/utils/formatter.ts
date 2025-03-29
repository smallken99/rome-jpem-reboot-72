
import { Loi, LoiState } from '@/types/loi';
import { GameDate } from '@/types/game';

// Format a law title with its ID
export const formatLoiTitle = (loi: Loi): string => {
  return `${loi.titre} (ID: ${loi.id})`;
};

// Format a law state with color
export const formatLoiState = (state: LoiState): { text: string; color: string } => {
  switch (state) {
    case 'proposée':
      return { text: 'Proposée', color: 'blue' };
    case 'en_débat':
      return { text: 'En débat', color: 'purple' };
    case 'en_vote':
      return { text: 'En vote', color: 'amber' };
    case 'adoptée':
      return { text: 'Adoptée', color: 'green' };
    case 'rejetée':
      return { text: 'Rejetée', color: 'red' };
    case 'abrogée':
      return { text: 'Abrogée', color: 'gray' };
    default:
      return { text: state, color: 'gray' };
  }
};

// Format vote counts
export const formatVotes = (votesPositifs: number, votesNégatifs: number, votesAbstention: number): string => {
  return `Pour: ${votesPositifs}, Contre: ${votesNégatifs}, Abstention: ${votesAbstention}`;
};

// Format law importance
export const formatImportance = (importance: string): { text: string; color: string } => {
  switch (importance) {
    case 'mineure':
      return { text: 'Mineure', color: 'blue' };
    case 'moyenne':
      return { text: 'Moyenne', color: 'purple' };
    case 'majeure':
      return { text: 'Majeure', color: 'red' };
    case 'critique':
      return { text: 'Critique', color: 'amber' };
    default:
      return { text: importance, color: 'gray' };
  }
};
