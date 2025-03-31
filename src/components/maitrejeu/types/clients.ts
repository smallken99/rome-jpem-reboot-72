
export interface Client {
  id: string;
  name: string;
  profession: string;
  loyalty: number;
  influence: number;
  wealth: number;
  status: 'active' | 'inactive' | string;
  senateurId?: string;
  competences: Record<string, number>;
  competencePoints?: number;
  background?: string;
  notes?: string;
  portrait?: string;
  age?: number;
  skills?: string[];
  connections?: string[];
}

export interface ClientFormProps {
  onSubmit: (client: Client) => void;
  initialValues?: Partial<Client>;
  isEditMode?: boolean;
}
