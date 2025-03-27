
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
  badge?: React.ReactNode;
}

export interface LoiDetailProps {
  loi: Loi;
  onEdit?: (loi: Loi) => void;
  onDelete?: (loiId: string) => void;
  readOnly?: boolean;
}

export interface LoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loi: Loi) => void;
  loi?: Loi;
  categories?: Array<{ id: string, name: string, description: string }>;
}

export interface HistoriqueLoiTabProps {
  loi: Loi;
  lois?: Loi[];
  onViewLoi?: (loi: Loi) => void;
  formatSeason?: (season: string) => string;
}
