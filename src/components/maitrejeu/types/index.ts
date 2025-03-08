
// Re-export all types
export * from './faction';
export * from './evenements';
export * from './lois';
export * from './provinces';
export * from './senateurs';
export * from './elections';
export * from './magistratures';
export * from './histoire';
export * from './timeManagement';

// Explicitly re-export types with correct syntax
export type { GamePhase, Season, ImportanceType, PhaseType } from './common';
export type { GameDate } from './common';
export { generateId, adaptLegacyData, convertTimeSeasonToMaitreJeuSeason, convertMaitreJeuSeasonToTimeSeason, createGameDate } from './common';

// Re-export equilibre types, but handle PoliticalEvent with a specific export to avoid ambiguity
export type { Equilibre } from './equilibre';
// Explicitly re-export PoliticalEvent with a namespace to avoid conflict
import * as EquilibreTypes from './equilibre';
export { EquilibreTypes };
