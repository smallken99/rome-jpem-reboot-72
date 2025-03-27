
// This file declares missing modules to fix TypeScript errors

declare module '@/types/slaves' {
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
    assigned?: boolean;
    assignedTo?: string;
    productivity: number;
    value?: number;
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
    purchaseSlave: (slave: Slave, amount: number) => boolean;
    sellSlave: (slaveId: string) => number;
    assignSlave: (slaveId: string, assignmentId: string) => boolean;
    trainSlave: (slaveId: string, skill: string) => boolean;
    totalSlaves: number;
    slavePrice: number;
    assignedSlaves: Slave[];
    slaveAssignments: SlaveAssignment[];
    purchaseSlaves: (slaves: Slave[], amount: number) => boolean;
    sellSlaves: (slaveIds: string[]) => number;
    assignSlavesToProperty: (slaveIds: string[], propertyId: string) => boolean;
    removeSlaveAssignment: (slaveId: string) => boolean;
    balance: number;
  }
}
