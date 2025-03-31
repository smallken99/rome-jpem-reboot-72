
import { GameDate } from './common';

export interface HistoireEntry {
  id: string;
  titre: string;
  contenu: string;
  date: GameDate;
  type: "politique" | "militaire" | "économique" | "religieux" | "social";
  importanceLevel: "mineur" | "standard" | "majeur" | "historique";
  personnesImpliquées: string[];
  tags: string[];
  // Optional properties
  auteur?: string;
  lieuConcerné?: string;
  // English aliases
  title?: string;
  content?: string;
  importantPersons?: string[];
  location?: string;
}
