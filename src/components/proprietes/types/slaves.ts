
export interface Slave {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  skills: string[];
  price: number;
  health: number;
  loyalty: number;
  origin: string;
  specialization?: string;
  specialties?: string[];
  assigned?: boolean;
  assignedTo?: string;
  purchaseDate?: Date;
  status: 'idle' | 'working' | 'training' | 'sick' | 'escaped';
  acquired?: Date;
  value?: number;
  notes?: string;
}

export interface SlaveAssignment {
  id?: string;
  slaveId?: string;
  propertyId: string;
  buildingId?: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  efficiency: number;
  income: number;
  productivity?: number;
  assignedAt?: Date;
}

export interface SlaveTraining {
  id: string;
  slaveId: string;
  skill: string;
  progress: number;
  startDate: Date;
  completionDate?: Date;
  trainer?: string;
  cost: number;
}
