
// Re-export all types for easier importing
import * as EquilibreTypes from './equilibre';
import * as ProvinceTypes from './provinces';
import * as EventTypes from './evenements';
import * as LoisTypes from './lois';
export type { MagistratureType } from './magistratures'; 
export type { GamePhase, Season, GameDate, ImportanceType } from './common';

// Resolve ambiguous exports
export { EquilibreTypes };
export { ProvinceTypes };
export { EventTypes };
export { LoisTypes };

// Re-export individual types that aren't conflicting
export type { HistoireEntry } from './histoire';
export type { Election } from './elections';
export type { Equilibre } from './equilibre';
export type { SenateurJouable } from './senateurs';
export type { Province } from './provinces';
export type { Evenement, EvenementAction } from './evenements';
export type { Loi } from './lois';
