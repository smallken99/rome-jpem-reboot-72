
import { Loi as MJLoi } from '@/components/maitrejeu/types/lois';
import { Loi as RepubliqueLoi } from '@/components/republique/lois/hooks/useLois';

/**
 * Assure la compatibilité entre les différentes interfaces Loi
 * en fournissant les propriétés manquantes
 */
export const ensureLoiCompliance = (loi: any): MJLoi => {
  // Défaut pour les propriétés obligatoires de MJLoi
  const compliantLoi: MJLoi = {
    ...loi,
    type: loi.type || loi.catégorie || 'Politique',
    importance: loi.importance || 'normale',
    clauses: loi.clauses || [],
    commentaires: loi.commentaires || (loi.notes ? [loi.notes] : []),
    tags: loi.tags || []
  };
  
  return compliantLoi;
};

/**
 * Convertit un tableau de lois au format compatible avec MJLoi
 */
export const ensureLoiArrayCompliance = (lois: any[]): MJLoi[] => {
  return lois.map(ensureLoiCompliance);
};
