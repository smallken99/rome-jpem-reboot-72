
import { GameDate } from './common';

export interface Province {
  id: string;
  nom: string;
  description: string;
  gouverneur: string;
  région: string;
  population: number;
  status: string;
  richesse: number;
  loyauté: number;
  loyautéVariation: number;
  ressources: string[];
  impôts: number;
  dernierEvenement: string;
  armée: {
    légions: number;
    auxiliaires: number;
    navires: number;
  };
  position: { x: number; y: number };
  // Propriétés de compatibilité
  variationLoyauté?: number;
  dernierEvénement?: string;
  coordonnées?: { x: number; y: number };
}

export interface ProvinceCardProps {
  province: Province;
  onSelect?: (id: string) => void;
  selected?: boolean;
  onViewProvince?: (provinceId: string) => void;
}

export interface ProvinceModalProps {
  isOpen: boolean;
  province: Province | null;
  onClose: () => void;
  onUpdate: (province: Province) => void;
}

export interface ProvincesMapProps {
  provinces: Province[];
  onSelectProvince: (id: string) => void;
  selectedProvinceId?: string;
}

export interface ProvincesDataProps {
  provinces: Province[];
  onSelectProvince: (id: string) => void;
  selectedProvinceId?: string;
}
