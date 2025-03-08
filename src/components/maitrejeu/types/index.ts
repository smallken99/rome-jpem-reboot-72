
// Re-export all types
export * from './equilibre';
export * from './faction';
export * from './evenements';
export * from './lois';
export * from './provinces';
export * from './senateurs';
export * from './elections';
export * from './magistratures';
export * from './histoire';
export * from './timeManagement';
export * from './context';

// Explicitly re-export types with correct syntax
export type { GamePhase, Season, ImportanceType, PhaseType } from './common';
export type { GameDate } from './common';
