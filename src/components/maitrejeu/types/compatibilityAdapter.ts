
// Fichier adaptateur pour assurer la rétrocompatibilité avec les anciennes importations

// Réexportation de tous les types depuis l'index principal
import * as Types from './index';

// Pour que les imports de "../types/maitreJeuTypes" continuent de fonctionner
export * from './index';

// Alias pour les types les plus utilisés pour la rétrocompatibilité
export type MaitreJeuContextType = Types.MaitreJeuContextType;
export type EvenementType = Types.EvenementType;
export type Season = Types.Season;
export type GamePhase = Types.GamePhase;
export type PhaseType = Types.PhaseType;
export type ImportanceType = Types.ImportanceType;
export type Province = Types.Province;
export type Loi = Types.Loi;
export type Evenement = Types.Evenement;
export type EvenementAction = Types.EvenementAction;
export type SenateurJouable = Types.SenateurJouable;
export type Election = Types.Election;
export type MagistratureType = Types.MagistratureType;
export type Faction = Types.Faction;
export type FactionPolitique = Types.FactionPolitique;
export type Equilibre = Types.Equilibre;
export type HistoireEntry = Types.HistoireEntry;
export type GameDate = Types.GameDate;

// Réexport des interfaces de props
export type EquilibreChartProps = Types.EquilibreChartProps;
export type PartisGraphProps = Types.PartisGraphProps;
export type PoliticalEventsTimelineProps = Types.PoliticalEventsTimelineProps;
export type TimeManagementProps = Types.TimeManagementProps;
export type ElectionPlannerProps = Types.ElectionPlannerProps;
export type LoisTableProps = Types.LoisTableProps;
export type EvenementsListProps = Types.EvenementsListProps;
export type ProvincesMapProps = Types.ProvincesMapProps;
export type ProvinceModalProps = Types.ProvinceModalProps;
export type ProvinceCardProps = Types.ProvinceCardProps;
export type ProvincesDataProps = Types.ProvincesDataProps;
export type SenateurModalProps = Types.SenateurModalProps;
export type SenateurCardProps = Types.SenateurCardProps;
export type AssignmentTableProps = Types.AssignmentTableProps;
