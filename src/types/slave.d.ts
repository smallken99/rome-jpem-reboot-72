
export interface Slave {
  id: string;
  name: string;
  origin: string;
  price: number;
  skills: string[];
  health: number;
  productivity: number;
  assigned: boolean;
  assignedTo?: string;
  buildingId?: string;
  assignment?: string;
  gender?: string;
  age?: number;
  level?: number;
}

export interface SlaveAssignment {
  slaveId: string;
  buildingId: string;
  startDate: Date;
  efficiency: number;
  propertyId: string;
  propertyName: string;
  count?: number;
  buildingName?: string;
}
