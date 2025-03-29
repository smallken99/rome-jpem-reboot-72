
export interface Slave {
  id: string;
  name: string;
  age: number;
  origin: string;
  skills: string[];
  health: number;
  price: number;
  loyalty: number;
  assignment: string | null;
  specialization?: string;
  description?: string;
  history?: string[];
}

export interface SlaveAssignment {
  id: string;
  name: string;
  type: 'domestic' | 'agriculture' | 'craft' | 'education' | 'entertainment' | string;
  description: string;
  requiredSkills: string[];
  benefits: {
    income?: number;
    productivity?: number;
    prestige?: number;
    other?: Record<string, number>;
  };
  location?: string;
  propertyId?: string;
}

export interface SlaveManagementHook {
  slaves: Slave[];
  loading: boolean;
  purchaseSlave: (slave: Slave, amount: number) => boolean;
  sellSlave: (slaveId: string) => number;
  assignSlave: (slaveId: string, assignmentId: string) => boolean;
  trainSlave: (slaveId: string, skill: string) => boolean;
  
  // Additional properties used in SlavesOverview
  totalSlaves?: number;
  slavePrice?: number;
  assignedSlaves?: Slave[];
  slaveAssignments?: SlaveAssignment[];
  purchaseSlaves?: (slaves: Slave[], amount: number) => boolean;
  sellSlaves?: (slaveIds: string[]) => number;
  assignSlavesToProperty?: (slaveIds: string[], propertyId: string) => boolean;
  removeSlaveAssignment?: (slaveId: string) => boolean;
  balance?: number;
}
