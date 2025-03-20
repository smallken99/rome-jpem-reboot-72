
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
}

export interface ProvinceCardProps {
  province: Province;
  onSelect?: (provinceId: string) => void;
  selected?: boolean;
}
