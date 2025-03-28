
export interface TimelineItemProps {
  title: string;
  status: string;
  content?: React.ReactNode;
  date?: string | { year: number; season: string };
  description?: string;
  timestamp?: string;
  importance?: string;
  onClick?: () => void;
}
