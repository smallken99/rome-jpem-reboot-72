
import { Loi, CategorieLoi } from '@/components/republique/lois/hooks/useLois';

export interface LoisActivesTabProps {
  lois: Loi[];
  onViewLoi: (loi?: Loi) => void;
}

export interface LoisProposeesTabProps {
  lois: Loi[];
  onViewLoi: (loi?: Loi) => void;
}

export interface LoisRejeteesTabProps {
  lois: Loi[];
  onViewLoi: (loi?: Loi) => void;
}

export interface HistoriqueLoiTabProps {
  lois: Loi[];
  onViewLoi: (loi?: Loi) => void;
  formatSeason: (season: string) => string;
}

export interface LoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loiData: Loi) => void;
  loi?: Loi;
  categories?: CategorieLoi[];
}
