
export interface Province {
  id: string;
  nom: string;
  gouverneur?: string;
  gouverneur_id?: string;
  ressources: string[];
  revenu: number;
  coût: number;
  population: number;
  légions: number;
  stabilite: number;
  stability: number; // Alias pour compatibilité
  rébellion: boolean;
  description: string;
  founding_year: number;
  location: string;
  type: 'sénatoriale' | 'impériale';
  loyalty: number; // Ajout de loyalty pour compatibilité
  
  // Propriétés manquantes dans l'interface mais utilisées dans le code
  région?: string;
  status?: string;
  armée?: number;
  loyauté?: number;
  variationLoyauté?: number;
  richesse?: number;
  ressource?: string;
  revenue?: number; // Alias pour revenu
}

export interface ProvinceCardProps {
  province: Province;
  onSelect?: (provinceId: string) => void;
  selected?: boolean;
  onEdit?: (province: Province) => void;
  onDelete?: (provinceId: string) => void;
}
