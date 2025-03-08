
import { GameDate } from './common';

export interface HistoireEntry {
  id: string;
  titre: string;
  contenu: string;
  description?: string; // Pour compatibilité avec le code existant
  catégorie?: string; // Pour compatibilité avec le code existant
  date: GameDate;
  type?: string;
  personnagesImpliqués?: string[];
  importance?: ImportanceType; // Pour compatibilité avec le code existant
}

// Définir ImportanceType si ce n'est pas déjà fait ailleurs
type ImportanceType = 'majeure' | 'mineure' | 'normale';

// Réexporter Season pour faciliter l'utilisation
export type { Season } from './common';
