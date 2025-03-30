
import { GameDate } from '@/utils/types/gameDate';

export interface Evenement {
  id: string;
  title: string;
  description: string;
  date: Date | GameDate;
  type: string;
  importance: string;
  resolved?: boolean;
  impact?: Record<string, number>;
  endDate?: Date | GameDate;
  nom?: string;
  tags?: string[];
  actions?: string[];
}
