
import { GameDate, ImportanceType } from './common';

export interface HistoireEntry {
  id: string;
  titre: string;
  contenu: string;
  date: GameDate;
  catégorie: string;
  importance: ImportanceType;
  visible: boolean;
  auteur?: string;
}
