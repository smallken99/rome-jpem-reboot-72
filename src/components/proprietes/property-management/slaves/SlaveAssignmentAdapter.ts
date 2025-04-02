
import { SlaveAssignment } from '@/components/proprietes/types/slave';
import { v4 as uuidv4 } from 'uuid';

export const createSlaveAssignment = (
  slaveId: string,
  buildingId: string,
  propertyId: string,
  propertyName: string,
  buildingName?: string
): SlaveAssignment => {
  return {
    id: uuidv4(),
    slaveId,
    propertyId,
    buildingId,
    role: "worker",
    startDate: new Date(),
    efficiency: 80 + Math.floor(Math.random() * 20),
    productivity: 80 + Math.floor(Math.random() * 20)
  };
};

export const adaptSlaveAssignment = (assignment: any): SlaveAssignment => {
  return {
    id: assignment.id || uuidv4(),
    slaveId: assignment.slaveId,
    propertyId: assignment.propertyId,
    buildingId: assignment.buildingId,
    role: assignment.role || "worker",
    startDate: assignment.startDate || new Date(),
    endDate: assignment.endDate,
    efficiency: assignment.efficiency || 80,
    productivity: assignment.productivity || 80,
    income: assignment.income
  };
};
