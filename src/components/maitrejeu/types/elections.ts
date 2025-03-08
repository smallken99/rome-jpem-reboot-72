
import { GameDate } from './common';

export interface Election {
  id: string;
  magistrature: string;
  annee: number;
  saison: string;
  candidats: string[];
  results: Record<string, number> | null;
  status: 'planifiée' | 'en cours' | 'terminée';
  // Propriétés de compatibilité
  year?: number;
  season?: string;
  candidates?: string[];
}
