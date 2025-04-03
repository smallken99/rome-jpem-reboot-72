
import { GameDate } from './common';

export interface HistoireEntry {
  id: string;
  titre: string;
  texte?: string;
  date: string | Date | GameDate;
  type: string;
  importance?: string;
  tags?: string[];
  visible?: boolean;
}

export interface HistoireFilter {
  types?: string[];
  dateStart?: string | Date;
  dateEnd?: string | Date;
  importance?: string[];
  searchTerm?: string;
}
