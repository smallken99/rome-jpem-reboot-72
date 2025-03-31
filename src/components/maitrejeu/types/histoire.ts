
import { GameDate } from './common';

export type HistoireImportanceLevel = 'mineur' | 'standard' | 'majeur' | 'critique';

export interface HistoireEntry {
  id: string;
  titre: string;
  contenu: string;
  date: GameDate;
  type: "politique" | "militaire" | "économique" | "religieux" | "social";
  importanceLevel: HistoireImportanceLevel;
  personnesImpliquées: string[];
  tags: string[];
  importance?: string;
  catégorie?: string;
  auteur?: string;
}

export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: GameDate;
  type: string;
  impact: number;
  faction: string;
  consequences: string[];
}
