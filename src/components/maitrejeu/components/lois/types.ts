
import { Loi } from '@/components/maitrejeu/types/lois';

export interface LoiTimelineProps {
  loi: Loi;
}

export interface TimelineItemProps {
  title: string;
  date: string;
  description?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export interface LoiDetailProps {
  loi: Loi;
  onEdit?: (loi: Loi) => void;
  onDelete?: (loiId: string) => void;
  readOnly?: boolean;
}
