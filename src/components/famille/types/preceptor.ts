
export interface Skill {
  name: string;
  level: number;
  description?: string;
}

export interface Preceptor {
  id: string;
  name: string;
  origin: string;
  age: number;
  skills: Skill[];
  specialization: string;
  cost: number;
  reputation: number;
  background: string;
  availableUntil?: Date;
  assignedTo?: string;
  assignedDate?: Date;
  performance?: number;
  notes?: string;
  portrait?: string;
}

export interface PreceptorFilter {
  specialization?: string;
  minReputation?: number;
  maxCost?: number;
  origin?: string;
  available?: boolean;
}

export interface PreceptorSort {
  field: 'name' | 'reputation' | 'cost' | 'age';
  direction: 'asc' | 'desc';
}
