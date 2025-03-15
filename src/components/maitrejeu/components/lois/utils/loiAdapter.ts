
import { Loi, LoiState, LoiType, ImportanceType } from '@/components/maitrejeu/types/lois';

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
    dateProposition: loi.dateProposition || { year: new Date().getFullYear() - 1800, season: 'VER' }
  };
  
  return compliantLoi;
};

// Add these functions to match the expected imports
export const convertMJToRepublique = (loi: Loi): any => {
  return {
    ...loi,
    auteur: loi.proposeur || loi.proposedBy || loi.auteur || '',
    statut: loi.état || loi.status || '',
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
