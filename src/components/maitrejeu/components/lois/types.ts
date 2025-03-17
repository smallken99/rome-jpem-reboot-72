
import { Loi } from '@/components/maitrejeu/types/lois';

export interface LoisActivesTabProps {
  lois: any[]; // Accepte n'importe quel tableau qui sera adapté à l'intérieur du composant
  onViewLoi: (loi?: Loi) => void;
  formatSeason?: (season: string) => string;
  onPromulguer?: (loiId: string) => void;
}

export interface LoisProposeesTabProps {
  lois: any[]; // Accepte n'importe quel tableau qui sera adapté à l'intérieur du composant
  onViewLoi: (loi?: Loi) => void;
  formatSeason?: (season: string) => string;
  onVoterPour?: (loiId: string) => void;
  onVoterContre?: (loiId: string) => void;
  onVoterAbstention?: (loiId: string) => void;
}

export interface LoisRejeteesTabProps {
  lois: any[]; // Accepte n'importe quel tableau qui sera adapté à l'intérieur du composant
  onViewLoi: (loi?: Loi) => void;
  formatSeason?: (season: string) => string;
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
