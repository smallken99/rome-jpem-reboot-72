
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
}

export interface SlaveManagementHook {
  slaves: Slave[];
  loading: boolean;
  purchaseSlave: (slave: Slave, amount: number) => boolean;
  sellSlave: (slaveId: string) => number;
  assignSlave: (slaveId: string, assignmentId: string) => boolean;
  trainSlave: (slaveId: string, skill: string) => boolean;
  
  // Additional properties needed for SlavesOverview component
  totalSlaves: number;
  slavePrice: number;
  assignedSlaves: number;
  slaveAssignments: Record<string, string[]>;
  purchaseSlaves: (count: number, type: string) => boolean;
  sellSlaves: (slaveIds: string[]) => number;
  assignSlavesToProperty: (slaveIds: string[], propertyId: string) => boolean;
  removeSlaveAssignment: (slaveId: string) => boolean;
  balance: number;
}
