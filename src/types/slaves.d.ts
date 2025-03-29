
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
  specialization?: string;
  assignment?: string;
  propertyId?: string;
  assigned?: boolean;
  assignedTo?: string;
  productivity?: number;
  value?: number;
  strength?: number;
  intelligence?: number;
  status?: string;
  purchaseDate?: string;
  type?: string;
}

export interface SlaveAssignment {
  slaveId: string;
  propertyId: string;
  role: string;
  startDate: string;
  efficiency: number;
}

export interface SlaveManagementHook {
  slaves: Slave[];
  loading: boolean;
  totalSlaves: number;
  slavePrice: number;
  assignedSlaves: number | Slave[];
  slaveAssignments: Record<string, string[]> | SlaveAssignment[];
  balance: number;
  
  // Méthodes de gestion des esclaves
  purchaseSlave: (slave: Slave, amount: number) => boolean;
  sellSlave: (slaveId: string) => number;
  assignSlave: (slaveId: string, assignmentId: string) => boolean;
  trainSlave: (slaveId: string, skill: string) => boolean;
  purchaseSlaves: (count: number, type: string) => boolean;
  sellSlaves: (slaveIds: string[]) => number;
  assignSlavesToProperty: (slaveIds: string[], propertyId: string) => boolean;
  removeSlaveAssignment: (slaveId: string) => boolean;
}
