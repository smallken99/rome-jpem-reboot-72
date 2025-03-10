
import { GameDate, ImportanceType } from './common';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  date: GameDate;
  état: "En délibération" | "Promulguée" | "Rejetée" | "proposée" | "adoptée";
  importance: ImportanceType;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  effets: Record<string, number>;
}
