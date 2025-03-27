
export interface PoliticalEvent {
  id: string;
  title: string;
  date: string;
  type: string;
  impact: number;
  description: string;
}

export interface RecentEventsTableProps {
  events: PoliticalEvent[];
  formatDate: (date: string) => string;
}
