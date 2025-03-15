
import { Loi as LoiRepublique } from '@/components/republique/lois/hooks/useLois';
import { Loi as LoiMaitreJeu } from '@/components/maitrejeu/types/lois';

/**
 * Assure la compatibilité entre les différentes interfaces Loi
 * en fournissant les propriétés manquantes
 */
export const ensureLoiCompliance = (loi: any): LoiMaitreJeu => {
  // Défaut pour les propriétés obligatoires de MJLoi
  const compliantLoi: LoiMaitreJeu = {
    ...loi,
    id: loi.id,
    title: loi.titre || loi.title || '',
    description: loi.description || '',
    proposedBy: loi.auteur || loi.proposeur || loi.proposedBy || '',
    date: loi.dateProposition || loi.date || '',
    status: loi.statut || loi.status || loi.état || 'proposée',
    category: loi.categorieId || loi.category || loi.catégorie || '',
    type: loi.type || 'Politique',
    importance: loi.importance || 'normale',
    clauses: Array.isArray(loi.clauses) ? loi.clauses : [],
    commentaires: Array.isArray(loi.commentaires) ? loi.commentaires : [],
    tags: Array.isArray(loi.tags) ? loi.tags : []
  };
  
  return compliantLoi;
};

/**
 * Convertit une LoiRepublique en LoiMaitreJeu
 */
export const convertRepubliqueToMJ = (loi: LoiRepublique): LoiMaitreJeu => {
  return ensureLoiCompliance({
    ...loi,
    proposeur: loi.auteur,
    dateProposition: loi.dateProposition,
    état: loi.statut,
    catégorie: loi.categorieId,
    votesPositifs: loi.votes?.pour || 0,
    votesNégatifs: loi.votes?.contre || 0,
    votesAbstention: loi.votes?.abstention || 0
  });
};

/**
 * Convertit une LoiMaitreJeu en LoiRepublique
 */
export const convertMJToRepublique = (loi: LoiMaitreJeu): LoiRepublique => {
  return {
    id: loi.id,
    titre: loi.title || loi.titre || '',
    description: loi.description || '',
    auteur: loi.proposedBy || loi.proposeur || loi.auteur || '',
    dateProposition: typeof loi.date === 'string' ? loi.date : typeof loi.dateProposition === 'string' ? loi.dateProposition : '',
    statut: mapMJStatusToRepublique(loi.status || loi.statut || loi.état || 'proposée'),
    categorieId: loi.category || loi.categorieId || loi.catégorie || '',
    votes: {
      pour: loi.votesPositifs || loi.votesFor || (loi.votes?.pour || 0),
      contre: loi.votesNégatifs || loi.votesAgainst || (loi.votes?.contre || 0),
      abstention: loi.votesAbstention || (loi.votes?.abstention || 0)
    },
    tags: loi.tags || [],
    // Ajouter les propriétés étendues pour compatibilité avec le composant LoiFormTabs
    type: loi.type || 'Politique',
    importance: loi.importance || 'normale',
    clauses: loi.clauses || [],
    commentaires: loi.commentaires || []
  } as LoiRepublique & {
    type: string;
    importance: string;
    clauses: string[];
    commentaires: string[];
  };
};

// Helper function to map statuses between formats
function mapMJStatusToRepublique(status: string): 'proposée' | 'en_débat' | 'votée' | 'rejetée' | 'promulguée' {
  switch (status) {
    case 'proposed':
    case 'proposée': 
    case 'En délibération':
      return 'proposée';
    case 'active':
    case 'Promulguée':
    case 'adoptée': 
    case 'promulguée':
      return 'promulguée';
    case 'rejected':
    case 'rejetée':
      return 'rejetée';
    case 'expired':
      return 'rejetée'; // Closest equivalent
    case 'votée':
      return 'votée';
    default:
      return 'en_débat';
  }
}
