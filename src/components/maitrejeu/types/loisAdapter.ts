
import { Loi as LoiMaitreJeu } from './lois';
import { Loi as LoiRepublique } from '@/components/republique/lois/hooks/useLois';

// Fonction pour convertir une loi du maître de jeu vers le format de la république
export const convertMJToRepubliqueLoi = (loi: LoiMaitreJeu): LoiRepublique => {
  return {
    id: loi.id,
    titre: loi.title || loi.titre || '',
    description: loi.description || '',
    auteur: loi.proposedBy || loi.proposeur || '',
    dateProposition: typeof loi.date === 'string' 
      ? loi.date 
      : `${loi.date.year} ${loi.date.season}`,
    statut: loi.status || loi.état || 'En délibération',
    categorieId: loi.category || loi.catégorie || '',
    type: loi.type || 'Politique',
    clauses: loi.clauses || [],
    commentaires: loi.notes ? [loi.notes] : [],
    importance: loi.importance || 'normale',
    votes: {
      pour: loi.votesFor || loi.votesPositifs || 0,
      contre: loi.votesAgainst || loi.votesNégatifs || 0,
      abstention: loi.votesAbstention || 0
    },
    tags: []
  };
};

// Fonction pour convertir une loi de la république vers le format du maître de jeu
export const convertRepubliqueToMJLoi = (loi: LoiRepublique): LoiMaitreJeu => {
  return {
    id: loi.id,
    title: loi.titre,
    description: loi.description,
    proposedBy: loi.auteur,
    date: { 
      year: parseInt(loi.dateProposition.split(' ')[0]) || new Date().getFullYear(), 
      season: loi.dateProposition.split(' ')[1] || 'SPRING' 
    },
    status: loi.statut as any,
    category: loi.categorieId,
    votesFor: loi.votes?.pour || 0,
    votesAgainst: loi.votes?.contre || 0,
    votesAbstention: loi.votes?.abstention || 0,
    notes: loi.commentaires && loi.commentaires.length > 0 ? loi.commentaires[0] : '',
    effets: loi.clauses ? loi.clauses.filter(c => c.type === 'effet').map(c => c.content) : [],
    conditions: loi.clauses ? loi.clauses.filter(c => c.type === 'condition').map(c => c.content) : [],
    penalites: loi.clauses ? loi.clauses.filter(c => c.type === 'penalite').map(c => c.content) : []
  };
};

// Fonction pour convertir un tableau de lois
export const convertMJArrayToRepublique = (lois: LoiMaitreJeu[]): LoiRepublique[] => {
  return lois.map(convertMJToRepubliqueLoi);
};

export const convertRepubliqueArrayToMJ = (lois: LoiRepublique[]): LoiMaitreJeu[] => {
  return lois.map(convertRepubliqueToMJLoi);
};
