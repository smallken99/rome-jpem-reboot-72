
import { GameDate } from '@/utils/types/gameDate';

export interface Evenement {
  id: string;
  title: string;
  description: string;
  date: GameDate;
  type: string;
  nom?: string;
  endDate?: GameDate;
  tags?: string[];
  actions?: string[];
  importance?: string;
}
