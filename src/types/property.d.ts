
export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: string;
  effect: string | Record<string, number>;
  effects?: string[] | Record<string, number>; // Add for compatibility
  requirements?: {
    buildingType?: string[];
    minLevel?: number;
    minCondition?: number;
    resources?: Record<string, number>;
    tech?: string[];
  };
  installed: boolean;
  installDate?: Date;
}

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  name: string;
  buildingType: string;
  type: string;
  location: string;
  size: number;
  value: number;
  maintenance: number;
  condition: number;
  maintenanceLevel: number;
  securityLevel: number;
  income: number;
  workers: number;
  maxWorkers: number;
  maintenanceCost: number;
  purchaseDate: Date;
  description: string;
  status?: string;
  upgrades?: PropertyUpgrade[];
}

export interface Slave {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  origin: string;
  price: number;
  skills: string[];
  health: number;
  loyalty: number;
  education: number;
  assigned: boolean;
  assignedTo?: string;
}

export interface SlaveAssignment {
  id: string;
  slaveId: string;
  buildingId: string;
  efficiency: number;
  startDate: Date;
}
