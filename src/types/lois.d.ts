
import { ImportanceType, LoiType, LoiState } from '@/components/maitrejeu/types/lois';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: 'Agraire' | 'Politique' | 'Militaire' | 'Economique' | 'Sociale' | 'Religieuse';
  date: {
    year: number;
    season: string;
  };
  état: LoiState;
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  abstentions: number;
  
  // Propriétés alternatives pour compatibilité
  title?: string;
  proposedBy?: string;
  category?: string;
  auteur?: string;
  catégorieId?: string;
  categorieId?: string;
  dateProposition?: string | { year: number; season: string };
  implementationDate?: { year: number; season: string };
  expirationDate?: { year: number; season: string };
  votesFor?: number;
  votesAgainst?: number;
  votesAbstention?: number;
  status?: string;
  statut?: string;
  nom?: string;
  name?: string;
  contenu?: string;
  conditions?: any;
  pénalités?: any;
  notes?: any;
  type?: LoiType;
  clauses?: any[];
  commentaires?: string[];
  tags?: string[];
  effets?: Record<string, any>;
  
  // Propriétés requises par les composants
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
}
