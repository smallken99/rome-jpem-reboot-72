
import { GameDate } from './common';

export interface HistoireEntry {
  id: string;
  titre: string;
  date: GameDate;
  contenu: string;
  type: 'politique' | 'militaire' | 'économique' | 'religieux' | 'social';
  importanceLevel: 'mineur' | 'standard' | 'majeur' | 'historique';
  personnesImpliquées?: string[];
  lieuConcerné?: string;
  tags?: string[];
}

// Type pour adapteur avec les types PoliticalEvent
export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  type: string;
  date: GameDate;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

// Fonction pour convertir HistoireEntry vers PoliticalEvent
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
