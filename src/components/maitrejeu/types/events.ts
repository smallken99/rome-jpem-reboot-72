
export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  date: string | { year: number; season: string };
  type: string;
  impact: Record<string, number>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source?: string;
  faction?: string;
  resolved?: boolean;
  relatedTo?: string[];
}

export interface GameDate {
  year: number;
  season: string;
}
