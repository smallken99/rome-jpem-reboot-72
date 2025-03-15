
import { Loi, LoiState, LoiType, ImportanceType, Vote } from '@/components/maitrejeu/types/lois';

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
    'proposed': 'proposée',
    'active': 'promulguée',
    'rejected': 'rejetée',
    'expired': 'expirée',
    'promulguée': 'promulguée',
    'rejetée': 'rejetée',
    'proposée': 'proposée',
    'adoptée': 'votée',
    'en délibération': 'en_débat',
    'En délibération': 'en_débat'
  };
  
  return (stateMap[state] || 'proposée') as LoiState;
};

// Fonction pour convertir un type string en LoiType
const convertToLoiType = (type: string): LoiType => {
  const typeMap: Record<string, LoiType> = {
    'Agraire': 'agraire',
    'Politique': 'politique',
    'Militaire': 'militaire',
    'Economique': 'economique',
    'Sociale': 'sociale',
    'Religieuse': 'religieuse',
    'Civile': 'civile',
    'Électorale': 'electorale',
    'Administrative': 'administrative',
    'Judiciaire': 'judiciaire',
    'Fiscale': 'fiscale'
  };
  
  return (typeMap[type] || 'politique') as LoiType;
};

// Fonction pour convertir une importance string en ImportanceType
const convertToImportanceType = (importance: string): ImportanceType => {
  const importanceMap: Record<string, ImportanceType> = {
    'mineure': 'mineure',
    'normale': 'normale',
    'majeure': 'majeure'
  };
  
  return (importanceMap[importance] || 'normale') as ImportanceType;
};

// Fonction pour convertir les données du formulaire en objet Loi
export const convertFormDataToLoi = (formData: LoiFormData): Loi => {
  return {
    id: formData.id || Date.now().toString(),
    titre: formData.titre,
    description: formData.description,
    type: convertToLoiType(formData.catégorie),
    importance: convertToImportanceType(formData.importance),
    état: convertToLoiState(formData.état),
    proposeur: formData.proposeur,
    dateProposition: formData.dateProposition,
    dateVote: formData.dateVote,
    datePromulgation: formData.datePromulgation,
    dateExpiration: formData.dateExpiration,
    votes: formData.votes as Vote,
    conditions: formData.conditions || [],
    effets: formData.effets || [],
    pénalités: formData.pénalités || []
  };
};

// Fonction pour convertir un objet Loi en données de formulaire
export const convertLoiToFormData = (loi: Loi): LoiFormData => {
  return {
    id: loi.id,
    titre: loi.titre,
    description: loi.description,
    catégorie: loi.type as string,
    importance: loi.importance as string,
    proposeur: loi.proposeur,
    état: loi.état as string,
    dateProposition: loi.dateProposition,
    dateVote: loi.dateVote,
    datePromulgation: loi.datePromulgation,
    dateExpiration: loi.dateExpiration,
    votes: loi.votes,
    conditions: loi.conditions,
    effets: loi.effets,
    pénalités: loi.pénalités
  };
};
