
import { Loi as LoiMaitreJeu } from './lois';
import { Loi as LoiRepublique } from '@/components/republique/lois/hooks/useLois';
import { GameDate } from './common';

/**
 * Format a date into a consistent string representation
 */
function formatDateToString(date: any): string {
  if (!date) return '';
  
  if (typeof date === 'string') {
    return date;
  }
  
  if (date && typeof date === 'object' && 'year' in date && 'season' in date) {
    return `${date.year} ${date.season}`;
  }
  
  return '';
}

/**
 * Parse a string date into a GameDate object
 */
function parseStringToGameDate(dateString: string): GameDate | undefined {
  if (!dateString) return undefined;
  
  const parts = dateString.split(' ');
  if (parts.length >= 2) {
    return {
      year: parseInt(parts[0], 10),
      season: parts[1]
    };
  }
  
  return undefined;
}

/**
 * Safe accessor for type property
 */
function getType(loi: LoiMaitreJeu): string {
  return loi.type || 'Politique';
}

/**
 * Safe accessor for importance property
 */
function getImportance(loi: LoiMaitreJeu): string {
  return loi.importance || 'normale';
}

/**
 * Safe accessor for clauses property
 */
function getClauses(loi: LoiMaitreJeu): any[] {
  return loi.clauses || [];
}

/**
 * Safe accessor for commentaires property
 */
function getCommentaires(loi: LoiMaitreJeu): string[] {
  if (loi.commentaires) return loi.commentaires;
  if (loi.notes) return [loi.notes];
  return [];
}

/**
 * Safe accessor for votes 
 */
function getVotes(loi: LoiMaitreJeu): { pour: number; contre: number; abstention: number } {
  return {
    pour: loi.votesPositifs || loi.votesFor || (loi.votes?.pour || 0),
    contre: loi.votesNégatifs || loi.votesAgainst || (loi.votes?.contre || 0),
    abstention: loi.votesAbstention || (loi.votes?.abstention || 0)
  };
}

/**
 * Map MJ status to Republique status
 */
function mapMJStatusToRepublique(status: string): 'proposée' | 'en_débat' | 'votée' | 'rejetée' | 'promulguée' {
  switch (status.toLowerCase()) {
    case 'proposed':
    case 'proposée': 
    case 'en délibération':
      return 'proposée';
    case 'active':
    case 'promulguée':
    case 'adoptée': 
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

/**
 * Map Republique status to MJ status
 */
function mapRepubliqueStatusToMJ(status: string): 'proposed' | 'active' | 'rejected' | 'expired' {
  switch (status.toLowerCase()) {
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

/**
 * Convert a single loi from MJ format to Republique format
 */
export function convertMJToRepubliqueLoi(loi: LoiMaitreJeu): LoiRepublique {
  const result: LoiRepublique = {
    id: loi.id,
    titre: loi.title || loi.titre || '',
    description: loi.description || '',
    auteur: loi.proposedBy || loi.proposeur || loi.auteur || '',
    dateProposition: formatDateToString(loi.dateProposition) || formatDateToString(loi.date) || '',
    statut: mapMJStatusToRepublique(loi.status || loi.état || loi.statut || 'proposée'),
    categorieId: loi.category || loi.catégorie || loi.categorieId || '',
    votes: getVotes(loi),
    tags: loi.tags || [],
    type: getType(loi),
    clauses: getClauses(loi),
    commentaires: getCommentaires(loi),
    importance: getImportance(loi)
  };
  
  return result;
}

/**
 * Convert a single loi from Republique format to MJ format
 */
export function convertRepubliqueToMJLoi(loi: LoiRepublique): LoiMaitreJeu {
  let gameDate: GameDate | undefined;
  
  try {
    if (typeof loi.dateProposition === 'string') {
      gameDate = parseStringToGameDate(loi.dateProposition);
    }
  } catch (error) {
    console.error("Error parsing date", error);
    gameDate = { year: new Date().getFullYear(), season: "SPRING" };
  }
  
  return {
    id: loi.id,
    title: loi.titre,
    description: loi.description,
    proposeur: loi.auteur,
    date: gameDate,
    état: mapRepubliqueStatusToMJ(loi.statut),
    catégorie: loi.categorieId,
    votesPositifs: loi.votes?.pour || 0,
    votesNégatifs: loi.votes?.contre || 0,
    votesAbstention: loi.votes?.abstention || 0,
    type: loi.type || 'Politique',
    importance: loi.importance || 'normale',
    clauses: loi.clauses || [],
    commentaires: loi.commentaires || [],
    tags: loi.tags || [],
    effets: []
  };
}

/**
 * Convert an array of lois from MJ format to Republique format
 */
export function convertMJArrayToRepublique(lois: LoiMaitreJeu[]): LoiRepublique[] {
  return lois.map(convertMJToRepubliqueLoi);
}

/**
 * Convert an array of lois from Republique format to MJ format
 */
export function convertRepubliqueArrayToMJ(lois: LoiRepublique[]): LoiMaitreJeu[] {
  return lois.map(convertRepubliqueToMJLoi);
}
