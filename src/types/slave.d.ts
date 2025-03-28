
export interface Slave {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  origin: string;
  price: number;
  skills: string[];
  specialty?: string;
  health: number;
  loyalty: number;
  assignedTo?: string;
  status: 'unassigned' | 'assigned' | 'sold' | 'escaped' | 'deceased';
  purchaseDate?: string;
  experience?: number;
  description?: string;
}

export interface SlaveHook {
  slaves: Slave[];
  loading: boolean;
  totalSlaves: number;
  slavePrice: number;
  assignedSlaves: number | Slave[];
  slaveAssignments: Record<string, string> | Record<string, string[]>;
  balance: number;
  purchaseSlave: (slave: Slave, amount: number) => boolean;
  purchaseSlaves: (count: number) => boolean;
  sellSlave: (slaveId: string) => number;
  sellSlaves: (ids: string[]) => number;
  assignSlave: (slaveId: string, assignmentId: string) => boolean;
  assignSlavesToProperty: (slaveIds: string[], propertyId: string) => boolean;
  removeSlaveAssignment: (slaveId: string) => boolean;
  trainSlave: (slaveId: string, skill: string) => boolean;
}
