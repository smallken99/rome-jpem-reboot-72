
import { GameDate } from '@/utils/types/gameDate';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: GameDate;
  type: EventType;
  importance: EventImportance;
  effects: Record<string, number>; // Impact on different aspects
  source?: string;
  tags?: string[];
  actors?: string[];
  location?: string;
  isHistorical?: boolean;
  isPublic?: boolean;
  isResolved?: boolean;
}

export type EventType = 
  | 'political'
  | 'economic'
  | 'military'
  | 'religious'
  | 'social'
  | 'cultural'
  | 'diplomatic'
  | 'natural'
  | 'other';

export type EventImportance = 
  | 'minor'
  | 'normal'
  | 'major'
  | 'critical';

export interface EventFilter {
  type?: EventType | string;
  importance?: EventImportance | string;
  startDate?: GameDate;
  endDate?: GameDate;
  searchTerm?: string;
  tags?: string[];
  isHistorical?: boolean;
  isPublic?: boolean;
  isResolved?: boolean;
}
