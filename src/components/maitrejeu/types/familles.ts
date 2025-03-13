
// Types pour la gestion des familles

export type StatutFamilial = "Patricien" | "Plébéien";
export type StatutMatrimonial = "Célibataire" | "Marié" | "Veuf" | "Divorcé";
export type GenreFamille = "male" | "female";
export type RelationType = "Père" | "Mère" | "Fils" | "Fille" | "Frère" | "Soeur" | "Époux" | "Épouse" | "Oncle" | "Tante" | "Cousin" | "Cousine" | "Neveu" | "Nièce" | "Grand-père" | "Grand-mère";

// Interface pour un membre de la famille
export interface MembreFamille {
  id: string;
  nom: string;
  prenom: string;
  age: number;
  genre: GenreFamille;
  statut: StatutFamilial;
  statutMatrimonial: StatutMatrimonial;
  familleId?: string;     // ID de la famille à laquelle appartient le membre
  role?: string;
  pere?: string;          // ID du père
  mere?: string;          // ID de la mère
  senateurId?: string;    // Référence à un sénateur si applicable
  education?: string;
  popularite?: number;
  piete?: number;
  joueur?: boolean;
  description?: string;
  portrait?: string;
}

// Interface pour une alliance entre familles
export interface FamilleAlliance {
  id: string;
  famille1Id: string;
  famille2Id: string;
  type: "matrimoniale" | "politique" | "commerciale" | "militaire";
  dateDebut: string;
  dateFin?: string;
  termes: string;
  benefices: string[];
  statut: "active" | "inactive" | "en négociation" | "rompue";
  membres: string[]; // IDs des membres impliqués
}

// Interface pour un mariage
export interface MariageInfo {
  id: string;
  epoux: string; // ID du membre masculin
  epouse: string; // ID du membre féminin
  familleEpoux: string; // ID de la famille de l'époux
  familleEpouse: string; // ID de la famille de l'épouse
  dot: number;
  date: string;
  statut: "prévu" | "actif" | "rompu" | "veuvage";
  contrat?: string;
}

// Interface principale pour une famille
export interface FamilleInfo {
  id: string;
  nom: string;
  gens: string;
  statut: StatutFamilial;
  prestige: number;
  influence: number;
  richesse: number;
  description?: string;
  devise?: string;
  blason?: string;
  chefId?: string; // ID du pater familias
  matrone?: string; // ID de la mater familias
  membres: string[]; // IDs des membres
  alliances: string[]; // IDs des alliances
  histoireId?: string; // Référence à l'histoire de la famille
  couleurPrimaire?: string;
  couleurSecondaire?: string;
}

// Types pour les opérations CRUD
export interface FamilleFilter {
  nom?: string;
  statut?: StatutFamilial;
  prestigeMin?: number;
  prestigeMax?: number;
}

export interface MembreFamilleFilter {
  nom?: string;
  age?: {min?: number, max?: number};
  genre?: GenreFamille;
  statut?: StatutFamilial;
  statutMatrimonial?: StatutMatrimonial;
  familleId?: string;
}

export interface FamilleCreationData extends Omit<FamilleInfo, "id" | "membres" | "alliances"> {
  chefInitial?: Omit<MembreFamille, "id" | "pere" | "mere" | "senateurId">;
  matroneInitiale?: Omit<MembreFamille, "id" | "pere" | "mere" | "senateurId">;
}

export interface MembreFamilleCreationData extends Omit<MembreFamille, "id"> {
  familleId: string;
}

export interface FamilleRelation {
  id: string;
  membre1Id: string;
  membre2Id: string;
  type: RelationType;
  description?: string;
}
