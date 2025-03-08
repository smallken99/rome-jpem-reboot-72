
export interface Province {
  id: string;
  nom: string;
  gouverneur: string | null;
  région: string;
  region?: string; // Pour compatibilité avec le code existant
  population: number;
  status: 'pacifiée' | 'instable' | 'rebelle' | 'conquise' | 'en révolte';
  statut?: string; // Pour compatibilité avec le code existant
  description: string;
  revenu: number;
  dépense: number;
  loyauté: number;
  légions: number;
  garnison: number;
  richesse: number;
  revenuAnnuel: number;
  impôts: number;
  ressourcesPrincipales: string[];
  problèmes: string[];
  opportunités: string[];
  coordonnées: {
    x: number;
    y: number;
  };
  armée?: number; // Pour compatibilité avec le code existant
  ressources?: string[]; // Pour compatibilité avec le code existant
  position?: any; // Pour compatibilité avec le code existant
}

// Props interfaces pour les composants de province
export interface ProvincesMapProps {
  provinces: Province[];
  onProvinceSelect: (provinceId: string) => void;
}

export interface ProvinceModalProps {
  province: Province;
  open: boolean;
  onClose?: () => void;
  onSave: (province: Province) => void;
}

export interface ProvinceCardProps {
  province: Province;
  onViewProvince: (provinceId: string) => void;
}

export interface ProvincesDataProps {
  provinces: Province[];
  onViewProvince: (provinceId: string) => void;
}
