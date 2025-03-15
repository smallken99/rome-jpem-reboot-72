
export interface Province {
  id: string;
  nom: string;
  région: string;
  description: string;
  gouverneur: string;
  status: 'Pacifiée' | 'Instable' | 'En guerre' | 'Rebelle';
  population: number;
  ressource: string;
  revenue: number;
  stabilite: number;
  loyauté?: number;
  richesse?: number;
  armée?: number;
  impôts?: number;
  revenuAnnuel?: number;
  loyautéVariation?: number;
  variationLoyauté?: number;
}

export interface ProvinceCardProps {
  province: Province;
  onEdit?: (province: Province) => void;
  onDelete?: (id: string) => void;
  onSelect?: () => void;
  selected?: boolean;
}

export interface ProvinceModalProps {
  province: Province;
  isOpen: boolean;
  onClose: () => void;
  onSave: (province: Province) => void;
}

export interface ProvincesMapProps {
  provinces: Province[];
  onProvinceSelect?: (provinceId: string) => void;
  selectedProvinceId?: string;
}
