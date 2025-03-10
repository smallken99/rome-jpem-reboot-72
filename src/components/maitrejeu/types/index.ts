
// Réexportation des types pour faciliter l'utilisation
export type { SenateurJouable } from './senateurs';
export type { Province, ProvinceCardProps } from './provinces';
export type { Evenement, EvenementAction } from './evenements';
export type { Election } from './elections';
export type { HistoireEntry } from './histoire';
export type { Loi } from './lois';
export type { Equilibre, PoliticalEvent } from './equilibre';
export type { Client, ClientCreationData, ClientFilter, ClientSort } from './clients';
export type { 
  EconomieRecord, 
  EconomieCreationData, 
  EconomieFilter, 
  EconomieSort,
  TreasuryStatus,
  EconomicFactors
} from './economie';
export type { MagistratureType } from './magistratures';
export type {
  FamilleInfo,
  MembreFamille,
  FamilleAlliance,
  MariageInfo,
  FamilleFilter,
  MembreFamilleFilter,
  FamilleCreationData,
  MembreFamilleCreationData,
  FamilleRelation,
  StatutFamilial,
  StatutMatrimonial,
  GenreFamille,
  RelationType
} from './familles';

// Créer un namespace pour les types liés à l'équilibre
import * as EquilibreTypesNamespace from './equilibre';
export const EquilibreTypes = EquilibreTypesNamespace;
