
import { Loi as LoiMaitreJeu, LoiState, ImportanceType, LoiType } from './lois';
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
function getType(loi: LoiMaitreJeu): LoiType {
  return (loi.type || 'Politique') as LoiType;
}

/**
 * Safe accessor for importance property
 */
function getImportance(loi: LoiMaitreJeu): ImportanceType {
  return (loi.importance || 'normale') as ImportanceType;
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
  const statusLower = status.toLowerCase();
  
  if (['proposed', 'proposée', 'en délibération'].includes(statusLower)) {
    return 'proposée';
  }
  
  if (['active', 'promulguée', 'adoptée'].includes(statusLower)) {
    return 'promulguée';
  }
  
  if (['rejected', 'rejetée'].includes(statusLower)) {
    return 'rejetée';
  }
  
  if (statusLower === 'expired') {
    return 'rejetée'; // Closest equivalent
  }
  
  if (statusLower === 'votée') {
    return 'votée';
  }
  
  if (statusLower === 'en_débat') {
    return 'en_débat';
  }
  
  return 'proposée'; // Default
}

/**
 * Map Republique status to MJ status
 */
function mapRepubliqueStatusToMJ(status: string): LoiState {
  switch (status.toLowerCase()) {
    case 'proposée':
    case 'en_débat':
      return 'proposed' as LoiState;
    case 'votée':
    case 'promulguée':
      return 'active' as LoiState;
    case 'rejetée':
      return 'rejected' as LoiState;
    default:
      return 'proposed' as LoiState;
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
    type: (loi.type || 'Politique') as LoiType,
    importance: (loi.importance || 'normale') as ImportanceType,
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
