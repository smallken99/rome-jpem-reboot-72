
import { GameDate } from './common';

export interface HistoireEntry {
  id: string;
  titre: string;
  date: GameDate;
  contenu: string;
  type: 'politique' | 'militaire' | 'économique' | 'religieux' | 'social';
  importanceLevel: 'mineur' | 'standard' | 'majeur' | 'historique';
  personnesImpliquées?: string[];
  personnagesImpliqués?: string[]; // Alternative spelling
  lieuConcerné?: string;
  tags?: string[];
  catégorie?: string; // Additional field
  importance?: string; // Additional field
  auteur?: string; // Additional field
}

// Type for adapter with PoliticalEvent
export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  type: string;
  date: GameDate;
  importance: 'low' | 'medium' | 'high' | 'critical' | string;
}

// Function to convert HistoireEntry to PoliticalEvent
export function histoireEntryToPoliticalEvent(entry: HistoireEntry): PoliticalEvent {
  const importanceMap: Record<string, 'low' | 'medium' | 'high' | 'critical'> = {
    'mineur': 'low',
    'standard': 'medium',
    'majeur': 'high',
    'historique': 'critical'
  };

  return {
    id: entry.id,
    title: entry.titre,
    description: entry.contenu,
    type: entry.type,
    date: entry.date,
    importance: importanceMap[entry.importanceLevel] || 'medium'
  };
}
