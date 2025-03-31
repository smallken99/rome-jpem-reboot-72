
// Creating or updating this file to include the missing properties
export interface PropertyUpgrade {
  id: string;
  name: string;
  cost: number;
  description: string;
  effect: string[];
  effects?: string[]; // Alias for effect
  installed: boolean;
  requirements?: {
    buildingLevel?: number;
    buildingType?: string[];
    prerequisiteUpgrades?: string[];
    minValue?: number;
    buildingCondition?: number;
    minIncome?: number;
    value?: number;
    previousUpgrade?: string;
    upgrades?: string[];
  };
  type?: string;
  buildingType?: string[];
}

export interface SlaveAssignment {
  id?: string;
  slaveId: string;
  propertyId: string;
  startDate: Date;
  efficiency: number;
  buildingId?: string;
  assignedAt?: Date;
  role?: string;
  productivity?: number;
}

export interface Slave {
  id: string;
  name: string;
  price: number;
  specialty: string;
  skills: string[];
  age: number;
  gender: string;
  status: string;
  acquired: Date;
  value: number;
}

export interface OwnedBuilding {
  id: string;
  name: string;
  type: string;
  location: string;
  value: number;
  condition: number;
  workers: number;
  income: number;
  maintenance: number;
  buildingId: string;
  buildingType: string;
  size: number;
  maintenanceCost: number;
  maxWorkers: number;
  securityLevel: number;
  maintenanceLevel: number;
  description?: string;
  purchaseDate?: Date;
  status?: string;
  upgrades?: PropertyUpgrade[];
}
