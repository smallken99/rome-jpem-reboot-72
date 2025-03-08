
import { GameDate, ImportanceType } from './common';

export interface HistoireEntry {
  id: string;
  titre: string;
  contenu: string;
  date: GameDate;
  catégorie: string;
  importance: ImportanceType;
  auteur: string;
  visible: boolean;
  type?: string; // For backward compatibility
  description?: string; // For backward compatibility
  personnagesImpliqués?: string[]; // Add this field
}
