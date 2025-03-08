
import { GameDate } from './common';

export type ProvinceStatus = 'pacifiée' | 'instable' | 'rebelle' | 'conquise' | 'en révolte';

export interface Province {
  id: string;
  nom: string;
  gouverneur: string;
  région: string;
  region?: string; // For backward compatibility
  population: number;
  status: ProvinceStatus;
  statut?: string; // For backward compatibility
  description: string;
  ressources: string[];
  richesse: number;
  loyauté: number;
  loyauteVariation?: number; // Optional property for change tracking
  armée: number;
  dernierEvenement?: {
    date: GameDate;
    description: string;
  };
  position?: any; // For map positioning
}

export interface ProvinceCardProps {
  province: Province;
  onClick: (id: string) => void;
}

export interface ProvinceModalProps {
  province: Province;
  onSave: (province: Province) => void;
  open: boolean;
  onClose: () => void;
}

export interface ProvincesMapProps {
  provinces: Province[];
  onProvinceSelect: (id: string) => void;
}

export interface ProvincesDataProps {
  provinces: Province[];
}
