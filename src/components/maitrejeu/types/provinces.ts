
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
}

export interface ProvinceCardProps {
  province: Province;
  onEdit: (province: Province) => void;
  onDelete: (id: string) => void;
}
