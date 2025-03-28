import { Loi, LoiType, LoiState, ImportanceType } from '../types/loiTypes';
import { GameDate } from '../types/gameDate';

// Function to convert string-based effects to array if needed
export function ensureArrayFormat(value: string | string[] | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    if (value.trim() === '') return [];
    // Try to detect if it's a JSON array format
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // If parsing fails, treat as single item
      }
    }
    // Return as single item array
    return [value];
  }
  return [];
}

// Function to safely handle GameDate conversion
export function ensureGameDateFormat(date: string | GameDate | undefined): GameDate {
  if (!date) return { year: new Date().getFullYear(), season: 'Spring' };
  
  if (typeof date === 'string') {
    try {
      // Try to parse as JSON
      const parsed = JSON.parse(date);
      if (parsed && typeof parsed === 'object' && 'year' in parsed && 'season' in parsed) {
        return { year: parsed.year, season: parsed.season };
      }
    } catch (e) {
      // If parsing fails, create a new GameDate
      return { year: new Date().getFullYear(), season: 'Spring' };
    }
  }
  
  // If it's already a GameDate, return it
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return date;
  }
  
  // Default fallback
  return { year: new Date().getFullYear(), season: 'Spring' };
}

// Interface pour les données du formulaire de loi
interface LoiFormData {
  id?: string;
  titre: string;
  description: string;
  catégorie: string;
  importance: string;
  proposeur: string;
  état: string;
  dateProposition: string;
  dateVote?: string;
  datePromulgation?: string;
  dateExpiration?: string;
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
  conditions?: string[];
  effets?: string[];
  pénalités?: string[];
}

// Fonction pour convertir un état string en LoiState
const convertToLoiState = (state: string): LoiState => {
  const stateMap: Record<string, LoiState> = {
    'proposed': 'proposed' as LoiState,
    'active': 'active' as LoiState,
    'rejected': 'rejected' as LoiState,
    'expired': 'expired' as LoiState,
    'promulguée': 'promulguée' as LoiState,
    'rejetée': 'rejetée' as LoiState,
    'proposée': 'proposée' as LoiState,
    'adoptée': 'votée' as LoiState,
    'en délibération': 'en_débat' as LoiState,
    'En délibération': 'en_débat' as LoiState,
    'expirée': 'expired' as LoiState
  };
  
  return (stateMap[state.toLowerCase()] || 'proposée') as LoiState;
};

// Fonction pour convertir un type string en LoiType
const convertToLoiType = (type: string): LoiType => {
  const typeMap: Record<string, LoiType> = {
    'Agraire': 'Agraire' as LoiType,
    'agraire': 'Agraire' as LoiType,
    'Politique': 'Politique' as LoiType,
    'politique': 'Politique' as LoiType,
    'Militaire': 'Militaire' as LoiType,
    'militaire': 'Militaire' as LoiType,
    'Economique': 'Economique' as LoiType,
    'economique': 'Economique' as LoiType,
    'Sociale': 'Sociale' as LoiType,
    'sociale': 'Sociale' as LoiType,
    'Religieuse': 'Religieuse' as LoiType,
    'religieuse': 'Religieuse' as LoiType,
    'Civile': 'Civile' as LoiType,
    'civile': 'Civile' as LoiType,
    'Électorale': 'Electorale' as LoiType,
    'Electorale': 'Electorale' as LoiType,
    'electorale': 'Electorale' as LoiType,
    'Administrative': 'Administrative' as LoiType,
    'administrative': 'Administrative' as LoiType,
    'Judiciaire': 'Judiciaire' as LoiType,
    'judiciaire': 'Judiciaire' as LoiType,
    'Fiscale': 'Fiscale' as LoiType,
    'fiscale': 'Fiscale' as LoiType
  };
  
  return (typeMap[type] || 'Politique') as LoiType;
};

// Fonction pour convertir une importance string en ImportanceType
const convertToImportanceType = (importance: string): ImportanceType => {
  const importanceMap: Record<string, ImportanceType> = {
    'mineure': 'mineure' as ImportanceType,
    'normale': 'normale' as ImportanceType,
    'majeure': 'majeure' as ImportanceType
  };
  
  return (importanceMap[importance] || 'normale') as ImportanceType;
};

// Fonction pour convertir les données du formulaire en objet Loi
export const convertFormDataToLoi = (formData: LoiFormData): Loi => {
  const loi: Loi = {
    id: formData.id || Date.now().toString(),
    titre: formData.titre,
    description: formData.description,
    type: convertToLoiType(formData.catégorie),
    importance: convertToImportanceType(formData.importance),
    état: convertToLoiState(formData.état),
    proposeur: formData.proposeur,
    dateProposition: formData.dateProposition,
    votes: formData.votes || { pour: 0, contre: 0, abstention: 0 },
    conditions: formData.conditions || [],
    effets: formData.effets ? formData.effets : {},
    pénalités: formData.pénalités || [],
    clauses: [],
    commentaires: [],
    tags: []
  };
  
  return loi;
};

// Fonction pour convertir un objet Loi en données de formulaire
export const convertLoiToFormData = (loi: Loi): LoiFormData => {
  return {
    id: loi.id,
    titre: loi.titre || loi.title || '',
    description: loi.description,
    catégorie: loi.type as string,
    importance: loi.importance as string,
    proposeur: loi.proposeur || loi.proposedBy || loi.auteur || '',
    état: loi.état as string || loi.status as string || loi.statut || '',
    dateProposition: typeof loi.dateProposition === 'string' ? loi.dateProposition : '',
    votes: loi.votes as any,
    conditions: loi.conditions || [],
    effets: Array.isArray(loi.effets) ? loi.effets : [],
    pénalités: loi.pénalités || []
  };
};

// Ensure loi compliance - adding this function to fix import errors
export const ensureLoiCompliance = (loi: any): Loi => {
  // Create a compliant loi object with all required properties
  const compliantLoi: Loi = {
    id: loi.id || Date.now().toString(),
    description: loi.description || '',
    type: convertToLoiType(loi.type || loi.catégorie || loi.category || 'Politique'),
    importance: convertToImportanceType(loi.importance || 'normale'),
    clauses: loi.clauses || [],
    commentaires: loi.commentaires || [],
    tags: loi.tags || [],
    titre: loi.titre || loi.title || '',
    proposeur: loi.proposeur || loi.proposedBy || loi.auteur || '',
    état: convertToLoiState(loi.état || loi.status || loi.statut || 'proposée'),
    votes: loi.votes || {
      pour: loi.votesPositifs || loi.votesFor || 0,
      contre: loi.votesNégatifs || loi.votesAgainst || 0,
      abstention: loi.votesAbstention || 0
    },
    effets: loi.effets || {},
    conditions: loi.conditions || [],
    pénalités: loi.pénalités || [],
    dateProposition: loi.dateProposition || loi.date,
    soutiens: loi.soutiens || [],
    opposants: loi.opposants || []
  };
  
  return compliantLoi;
};

// Add these functions to match the expected imports
export const convertMJToRepublique = (loi: Loi): any => {
  return {
    ...loi,
    auteur: loi.proposeur || loi.proposedBy || loi.auteur || '',
    statut: loi.état || loi.status || loi.statut || '',
    categorieId: loi.catégorie || loi.category || ''
  };
};

export const convertRepubliqueToMJ = (loi: any): Loi => {
  return ensureLoiCompliance({
    ...loi,
    proposeur: loi.auteur || loi.proposeur || '',
    état: loi.statut || loi.état || '',
    catégorie: loi.categorieId || loi.catégorie || ''
  });
};

// Helper functions to convert arrays
export const convertMJArrayToRepublique = (lois: Loi[]): any[] => {
  return lois.map(convertMJToRepublique);
};

export const convertRepubliqueArrayToMJ = (lois: any[]): Loi[] => {
  return lois.map(convertRepubliqueToMJ);
};

// Function to normalize Loi properties
export function normalizeLoi(loi: Partial<Loi>): Loi {
  return {
    id: loi.id || crypto.randomUUID(),
    titre: loi.titre || loi.title || '',
    description: loi.description || '',
    proposeur: loi.proposeur || loi.proposedBy || loi.auteur || '',
    catégorie: loi.catégorie || loi.category || '',
    date: loi.date || { year: new Date().getFullYear(), season: 'Spring' },
    état: loi.état || loi.status || loi.statut || 'proposée',
    importance: loi.importance || 'normale',
    votesPositifs: loi.votesPositifs || loi.votesFor || 0,
    votesNégatifs: loi.votesNégatifs || loi.votesAgainst || 0,
    abstentions: loi.abstentions || loi.votesAbstention || 0,
    type: loi.type || '',
    effets: ensureArrayFormat(loi.effets),
    clauses: ensureArrayFormat(loi.clauses),
    commentaires: ensureArrayFormat(loi.commentaires),
    tags: ensureArrayFormat(loi.tags),
    conditions: loi.conditions || {},
    pénalités: loi.pénalités || {},
    dateProposition: loi.dateProposition || loi.date,
    soutiens: loi.soutiens || [],
    opposants: loi.opposants || []
  } as Loi;
}
