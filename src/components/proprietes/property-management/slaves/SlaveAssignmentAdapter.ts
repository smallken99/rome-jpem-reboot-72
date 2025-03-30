
export interface Slave {
  id: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
  health: number;
  skill: number;
  origin: string;
  price: number;
  traits?: string[];
  specialization?: string;
  assigned?: boolean;
  assignedTo?: string;
}

export interface SlaveAssignment {
  id: string;
  slaveId: string;
  buildingId: string;
  efficiency: number;
  role: string;
  startDate: Date;
}

export const adaptSlaveAssignment = (assignment: Partial<SlaveAssignment>): SlaveAssignment => {
  return {
    id: assignment.id || `assignment-${Date.now()}`,
    slaveId: assignment.slaveId || '',
    buildingId: assignment.buildingId || '',
    efficiency: assignment.efficiency || 1.0,
    role: assignment.role || 'worker',
    startDate: assignment.startDate || new Date()
  };
};

export const createSlaveAssignment = (
  slaveId: string,
  buildingId: string,
  role: string = 'worker'
): SlaveAssignment => {
  return {
    id: `assignment-${Date.now()}-${slaveId.substring(0, 4)}`,
    slaveId,
    buildingId,
    efficiency: 1.0,
    role,
    startDate: new Date()
  };
};
