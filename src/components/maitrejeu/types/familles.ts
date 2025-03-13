
// Types pour la gestion des familles

export type StatutFamilial = 'Patricien' | 'Plébéien';
export type StatutMatrimonial = 'Célibataire' | 'Marié' | 'Veuf' | 'Divorcé';
export type GenreFamille = 'male' | 'female';
export type RelationType = 'Père' | 'Mère' | 'Fils' | 'Fille' | 'Frère' | 'Soeur' | 'Époux' | 'Épouse' | 'Cousin' | 'Oncle' | 'Tante' | 'Neveu' | 'Nièce';

// Interface pour les informations d'une famille
export interface FamilleInfo {
  id: string;
  nom: string;
  gens: string;
  statut: StatutFamilial;
  prestige: number;
  influence: number;
  richesse: number;
  description: string;
  devise?: string;
  blason?: string;
  membres: string[];
  alliances: string[];
  chefId?: string;
  matrone?: string;
  couleurPrimaire?: string;
  couleurSecondaire?: string;
}

// Interface pour un membre de famille
export interface MembreFamille {
  id: string;
  nom: string;
  prenom: string;
  age: number;
  genre: GenreFamille;
  statut: StatutFamilial;
  statutMatrimonial: StatutMatrimonial;
  familleId?: string;
  role: string;
  pere?: string;
  mere?: string;
  senateurId?: string;
  education: string;
  popularite: number;
  piete: number;
  joueur: boolean;
  description: string;
  portrait?: string;
}

// Interface pour une alliance entre familles
export interface FamilleAlliance {
  id: string;
  famille1Id: string;
  famille2Id: string;
  type: 'politique' | 'matrimoniale' | 'commerciale' | 'militaire';
  dateDebut: string;
  dateFin?: string;
  termes: string;
  benefices: string[];
  statut: 'active' | 'inactive' | 'en négociation' | 'rompue';
  membres: string[];
}

// Interface pour les informations d'un mariage
export interface MariageInfo {
  id: string;
  epoux: string;
  epouse: string;
  familleEpoux: string;
  familleEpouse: string;
  dot: number;
  date: string;
  statut: 'actif' | 'rompu' | 'veuvage' | 'prévu';
}

// Interface pour les relations familiales
export interface FamilleRelation {
  id: string;
  membre1Id: string;
  membre2Id: string;
  type: RelationType;
}

// Interface pour le filtrage des familles
export interface FamilleFilter {
  nom?: string;
  statut?: StatutFamilial;
  prestigeMin?: number;
  prestigeMax?: number;
}

// Interface pour le filtrage des membres
export interface MembreFamilleFilter {
  nom?: string;
  genre?: GenreFamille;
  statut?: StatutFamilial;
  statutMatrimonial?: StatutMatrimonial;
  age?: {
    min?: number;
    max?: number;
  };
  familleId?: string;
}

// Interface pour la création d'une famille
export interface FamilleCreationData {
  nom: string;
  gens: string;
  statut: StatutFamilial;
  prestige: number;
  influence: number;
  richesse: number;
  description: string;
  devise?: string;
  blason?: string;
  couleurPrimaire?: string;
  couleurSecondaire?: string;
  chefInitial?: Omit<MembreFamilleCreationData, 'familleId'>;
  matroneInitiale?: Omit<MembreFamilleCreationData, 'familleId'>;
}

// Interface pour la création d'un membre
export interface MembreFamilleCreationData {
  nom: string;
  prenom: string;
  age: number;
  genre: GenreFamille;
  statut: StatutFamilial;
  statutMatrimonial: StatutMatrimonial;
  familleId?: string;
  role?: string;
  pere?: string;
  mere?: string;
  senateurId?: string;
  education?: string;
  popularite?: number;
  piete?: number;
  joueur?: boolean;
  description?: string;
  portrait?: string;
}
