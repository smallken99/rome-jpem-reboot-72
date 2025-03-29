
export interface Slave {
  id: string;
  name: string;
  age: number;
  health: number;
  skills: string[];
  value: number;
  assigned: boolean;
  assignedTo?: string;
  origin: string;
  status: 'active' | 'sick' | 'injured' | 'deceased';
}

export interface SlaveAssignment {
  id: string;
  buildingId: string;
  buildingName: string;
  count: number;
  productivity: number;
}

export interface SlaveManagementHook {
  slaves: Slave[];
  loading: boolean;
  totalSlaves: number;
  slavePrice: number;
  assignedSlaves: number;
  slaveAssignments: SlaveAssignment[];
  balance: number;
  purchaseSlave: (slave: Slave, amount: number) => boolean;
  sellSlave: (slaveId: string) => number;
  purchaseSlaves: (amount: number) => boolean;
  sellSlaves: (amount: number) => boolean;
  assignSlave: (slaveId: string, assignmentId: string) => boolean;
  assignSlavesToProperty: (buildingId: string, count: number) => boolean;
  removeSlaveAssignment: (buildingId: string) => boolean;
  trainSlave: (slaveId: string, skill: string) => boolean;
}
