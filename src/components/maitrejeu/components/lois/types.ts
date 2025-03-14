
import { Loi } from '@/components/maitrejeu/types/lois';

export interface LoisActivesTabProps {
  lois: any[]; // Accepte n'importe quel tableau qui sera adapté à l'intérieur du composant
  onViewLoi: (loi?: Loi) => void;
}

export interface LoisProposeesTabProps {
  lois: any[]; // Accepte n'importe quel tableau qui sera adapté à l'intérieur du composant
  onViewLoi: (loi?: Loi) => void;
}

export interface LoisRejeteesTabProps {
  lois: any[]; // Accepte n'importe quel tableau qui sera adapté à l'intérieur du composant
  onViewLoi: (loi?: Loi) => void;
}

export interface HistoriqueLoiTabProps {
  lois: any[]; // Accepte n'importe quel tableau qui sera adapté à l'intérieur du composant
  onViewLoi: (loi?: Loi) => void;
  formatSeason: (season: string) => string;
}

export interface LoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loiData: any) => void;
  loi?: any;
  categories?: Array<{id: string, name: string, description: string}>;
}
