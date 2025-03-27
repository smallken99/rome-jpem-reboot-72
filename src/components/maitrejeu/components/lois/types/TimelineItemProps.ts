
export interface TimelineItemProps {
  title: string;
  date?: {
    year: number;
    season: string;
  };
  description?: string;
  status?: string;
  children?: React.ReactNode;
}
