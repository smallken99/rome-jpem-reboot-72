
import { Loi as LoiMaitreJeu } from './lois';
import { Loi as LoiRepublique } from '@/components/republique/lois/hooks/useLois';
import { parseGameDate } from '@/utils/timeSystem';

// Helper function to convert a date to string format
const formatLoiDate = (date: any): string => {
  if (!date) return '';
  
  if (typeof date === 'string') {
    return date;
  }
  
  if (date && typeof date === 'object' && 'year' in date && 'season' in date) {
    return `${date.year} ${date.season}`;
  }
  
  return '';
};

// Function to convert a law from the Game Master format to the Republic format
export const convertMJToRepubliqueLoi = (loi: LoiMaitreJeu): LoiRepublique => {
  const result: LoiRepublique = {
    id: loi.id,
    titre: loi.title || loi.titre || '',
    description: loi.description || '',
    auteur: loi.proposedBy || loi.proposeur || loi.auteur || '',
    dateProposition: formatLoiDate(loi.dateProposition) || formatLoiDate(loi.date) || '',
    statut: mapMJStatusToRepublique(loi.status || loi.état || loi.statut || 'proposée'),
    categorieId: loi.category || loi.catégorie || loi.categorieId || '',
    votes: {
      pour: loi.votesFor || loi.votesPositifs || (loi.votes?.pour || 0),
      contre: loi.votesAgainst || loi.votesNégatifs || (loi.votes?.contre || 0),
      abstention: loi.votesAbstention || (loi.votes?.abstention || 0)
    },
    tags: loi.tags || []
  };
  
  // Only add these properties if they exist
  if (loi.type !== undefined) {
    result.type = String(loi.type);
  } else {
    result.type = 'Politique';
  }
  
  if (loi.clauses !== undefined) {
    result.clauses = loi.clauses;
  } else {
    result.clauses = [];
  }
  
  if (loi.commentaires !== undefined) {
    result.commentaires = loi.commentaires;
  } else if (loi.notes) {
    result.commentaires = [loi.notes];
  } else {
    result.commentaires = [];
  }
  
  if (loi.importance !== undefined) {
    result.importance = loi.importance;
  } else {
    result.importance = 'normale';
  }
  
  return result;
};

// Function to convert a law from the Republic format to the Game Master format
export const convertRepubliqueToMJLoi = (loi: LoiRepublique): LoiMaitreJeu => {
  let year = 0;
  let season = "SPRING";
  
  try {
    if (typeof loi.dateProposition === 'string') {
      const dateParts = loi.dateProposition.split(' ');
      year = parseInt(dateParts[0]) || new Date().getFullYear();
      season = dateParts[1] || 'SPRING';
    }
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
    votesPositifs: loi.votes?.pour || 0,
    votesNégatifs: loi.votes?.contre || 0,
    votesAbstention: loi.votes?.abstention || 0,
    clauses: loi.clauses || [],
    commentaires: loi.commentaires || [],
    type: loi.type || 'Politique',
    importance: loi.importance || 'normale',
    tags: loi.tags || [],
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
