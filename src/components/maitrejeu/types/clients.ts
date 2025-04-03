
export interface Client {
  id: string;
  name: string;
  type: string;
  status: string;
  activeStatus?: string;
  description?: string;
  occupation?: string;
  location?: string;
  loyalty?: number;
  influence?: number;
  assignedTo?: string;
  assignedToSenateurId?: string;
  competences: string[];
  competencePoints?: number;
}

export interface ClientCreationData {
  name: string;
  type: string;
  status: string;
  description?: string;
  occupation?: string;
  location?: string;
  loyalty?: number;
  influence?: number;
  assignedTo?: string;
  competences?: string[];
  competencePoints?: number;
}

export interface ClientFilter {
  type?: string;
  status?: string;
  assignedTo?: string;
  search?: string;
}

export interface ClientSort {
  field: string;
  direction: 'asc' | 'desc';
}
