
import { Loi as LoiMaitreJeu } from './lois';
import { Loi as LoiRepublique } from '@/components/republique/lois/hooks/useLois';
import { parseStringToGameDate } from './common';

// Function to convert a law from the Game Master format to the Republic format
export const convertMJToRepubliqueLoi = (loi: LoiMaitreJeu): LoiRepublique => {
  return {
    id: loi.id,
    titre: loi.title || loi.titre || '',
    description: loi.description || '',
    auteur: loi.proposedBy || loi.proposeur || '',
    dateProposition: typeof loi.date === 'string' 
      ? loi.date 
      : `${loi.date.year} ${loi.date.season}`,
    statut: mapMJStatusToRepublique(loi.status || loi.état || 'proposée'),
    categorieId: loi.category || loi.catégorie || '',
    type: (loi.type as string) || 'Politique',
    clauses: loi.clauses || [],
    commentaires: loi.notes ? [loi.notes] : loi.commentaires || [],
    importance: loi.importance || 'normale',
    votes: {
      pour: loi.votesFor || loi.votesPositifs || 0,
      contre: loi.votesAgainst || loi.votesNégatifs || 0,
      abstention: loi.votesAbstention || 0
    },
    tags: []
  };
};

// Function to convert a law from the Republic format to the Game Master format
export const convertRepubliqueToMJLoi = (loi: LoiRepublique): LoiMaitreJeu => {
  let year = 0;
  let season = "SPRING";
  
  try {
    const dateParts = loi.dateProposition.split(' ');
    year = parseInt(dateParts[0]) || new Date().getFullYear();
    season = dateParts[1] || 'SPRING';
  } catch (error) {
    console.error("Error parsing date", error);
  }
  
  return {
    id: loi.id,
    title: loi.titre,
    description: loi.description,
    proposedBy: loi.auteur,
    date: { year, season },
    status: mapRepubliqueStatusToMJ(loi.statut),
    category: loi.categorieId,
    votesFor: loi.votes?.pour || 0,
    votesAgainst: loi.votes?.contre || 0,
    votesAbstention: loi.votes?.abstention || 0,
    notes: loi.commentaires && loi.commentaires.length > 0 ? loi.commentaires[0] : '',
    titre: loi.titre,
    proposeur: loi.auteur,
    catégorie: loi.categorieId,
    état: loi.statut,
    votesPositifs: loi.votes?.pour || 0,
    votesNégatifs: loi.votes?.contre || 0,
    type: loi.type || 'Politique',
    clauses: [], // Initialize as empty array since we'll build this
    effets: [],
    conditions: [],
    penalites: []
  };
};

// Function to convert arrays of laws
export const convertMJArrayToRepublique = (lois: LoiMaitreJeu[]): LoiRepublique[] => {
  return lois.map(convertMJToRepubliqueLoi);
};

export const convertRepubliqueArrayToMJ = (lois: LoiRepublique[]): LoiMaitreJeu[] => {
  return lois.map(convertRepubliqueToMJLoi);
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

function mapRepubliqueStatusToMJ(status: string): 'proposed' | 'active' | 'rejected' | 'expired' {
  switch (status) {
    case 'proposée':
    case 'en_débat':
      return 'proposed';
    case 'votée':
    case 'promulguée':
      return 'active';
    case 'rejetée':
      return 'rejected';
    default:
      return 'proposed';
  }
}
