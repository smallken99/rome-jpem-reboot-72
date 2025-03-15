
import { Loi as LoiRepublique } from '@/components/republique/lois/hooks/useLois';
import { Loi as LoiMJ } from '@/components/maitrejeu/types/lois';
import { ExtendedLoi } from '../hooks/useLoiModalForm';

/**
 * Assure que la loi a toutes les propriétés requises pour l'interface LoiMJ
 */
export const ensureLoiCompliance = (loi: any): LoiMJ => {
  // Si la loi est déjà conforme au format LoiMJ, retourner directement
  if (
    loi.type !== undefined &&
    loi.importance !== undefined &&
    loi.clauses !== undefined &&
    loi.commentaires !== undefined &&
    loi.tags !== undefined
  ) {
    return loi as LoiMJ;
  }
  
  // Sinon, adapter les propriétés pour assurer la conformité
  return {
    ...loi,
    // Propriétés obligatoires à s'assurer de remplir
    id: loi.id || `loi-${Date.now()}`,
    titre: loi.titre || loi.title || '',
    description: loi.description || '',
    type: loi.type || 'Politique',
    importance: loi.importance || 'normale',
    proposeur: loi.proposeur || loi.auteur || loi.proposedBy || '',
    catégorie: loi.catégorie || loi.categorieId || loi.category || '',
    état: loi.état || loi.statut || loi.status || 'proposée',
    date: loi.date || loi.dateProposition || { year: new Date().getFullYear(), season: 'SPRING' },
    votesPositifs: loi.votesPositifs || (loi.votes?.pour || 0),
    votesNégatifs: loi.votesNégatifs || (loi.votes?.contre || 0),
    votesAbstention: loi.votesAbstention || (loi.votes?.abstention || 0),
    clauses: loi.clauses || [],
    commentaires: loi.commentaires || [],
    tags: loi.tags || [],
    effets: loi.effets || {}
  };
};

/**
 * Convertit une loi du format MJ vers le format République
 */
export const convertMJToRepublique = (loi: LoiMJ): ExtendedLoi => {
  return {
    id: loi.id,
    titre: loi.titre || loi.title || loi.nom || '',
    description: loi.description || '',
    auteur: loi.proposeur || loi.auteur || loi.proposedBy || '',
    categorieId: loi.catégorie || loi.category || '',
    dateProposition: typeof loi.date === 'string' ? loi.date : `${loi.date?.year} ${loi.date?.season}`,
    statut: loi.état || loi.status || 'proposée',
    votes: {
      pour: loi.votesPositifs || loi.votesFor || 0,
      contre: loi.votesNégatifs || loi.votesAgainst || 0,
      abstention: loi.votesAbstention || 0
    },
    tags: loi.tags || [],
    clauses: loi.clauses || [],
    commentaires: loi.commentaires || [],
    type: loi.type || 'Politique',
    importance: loi.importance || 'normale'
  };
};

/**
 * Convertit une loi du format République vers le format MJ
 */
export const convertRepubliqueToMJ = (loi: ExtendedLoi): LoiMJ => {
  return {
    id: loi.id,
    titre: loi.titre || '',
    description: loi.description || '',
    proposeur: loi.auteur || '',
    catégorie: loi.categorieId || '',
    date: typeof loi.dateProposition === 'string' 
      ? { year: parseInt(loi.dateProposition.split(' ')[0]), season: loi.dateProposition.split(' ')[1] } 
      : loi.dateProposition,
    état: loi.statut || 'proposée',
    votesPositifs: loi.votes?.pour || 0,
    votesNégatifs: loi.votes?.contre || 0,
    votesAbstention: loi.votes?.abstention || 0,
    tags: loi.tags || [],
    clauses: loi.clauses || [],
    commentaires: loi.commentaires || [],
    type: loi.type || 'Politique',
    importance: loi.importance || 'normale',
    effets: {},
  };
};
