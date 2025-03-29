
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
}

export interface SlaveAssignment {
  slaveId: string;
  buildingId: string;
  startDate: Date;
  efficiency: number;
  propertyId: string;
  propertyName: string;
}
