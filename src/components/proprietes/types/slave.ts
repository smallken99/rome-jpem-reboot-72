
export interface Slave {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  skills: string[];
  price: number;
  health: number;
  loyalty: number;
  origin: string;
  specialization?: string;
  specialties?: string[];
  assigned?: boolean;
  assignedTo?: string;
  buildingId?: string;
  status: 'idle' | 'working' | 'training' | 'sick' | 'escaped';
  acquired?: Date;
  value?: number;
  productivity?: number;
  notes?: string;
}

export interface SlaveAssignment {
  id: string;
  slaveId: string;
  propertyId: string;
  buildingId?: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  efficiency: number;
  productivity?: number;
  income?: number;
}

export interface SlaveTraining {
  id: string;
  slaveId: string;
  skill: string;
  progress: number;
  startDate: Date;
  completionDate?: Date;
  trainer?: string;
  cost: number;
}

export interface SlaveManagementHook {
  slaves: Slave[];
  loading: boolean;
  totalSlaves: number;
  slavePrice: number;
  assignedSlaves: Slave[];
  availableSlaves: Slave[];
  slaveAssignments: SlaveAssignment[];
  
  // Méthodes de base
  addSlave: (slave: Omit<Slave, "id">) => string;
  removeSlave: (slaveId: string) => boolean;
  updateSlave: (slaveId: string, updates: Partial<Slave>) => boolean;
  
  // Méthodes d'assignation
  assignSlave: (slaveId: string, buildingId: string) => boolean;
  unassignSlave: (slaveId: string) => boolean;
  removeSlaveAssignment: (slaveId: string) => boolean;
  
  // Méthodes de commerce
  purchaseSlave: (slave: Omit<Slave, "id">, amount: number) => boolean;
  sellSlave: (slaveId: string) => number;
  purchaseSlaves: (count: number, type: string) => boolean;
  sellSlaves: (slaveIds: string[]) => number;
  
  // Méthodes avancées
  assignSlaveToBuilding: (slaveId: string, buildingId: string, propertyId: string, propertyName: string, buildingName?: string) => boolean;
  assignSlavesToProperty: (slaveIds: string[], propertyId: string) => boolean;
  trainSlave: (slaveId: string, skill: string) => boolean;
  
  // Méthodes de requête
  getAvailableSlaves: () => Slave[];
  getAssignedSlaves: () => Slave[];
  getSlavesByBuilding: (buildingId: string) => Slave[];
  getAssignmentsByBuilding: (buildingId: string) => SlaveAssignment[];
  
  // État financier
  balance: number;
}
