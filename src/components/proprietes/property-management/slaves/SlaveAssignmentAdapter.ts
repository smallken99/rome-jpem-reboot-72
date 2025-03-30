
import { SlaveAssignment as BaseSlaveAssignment } from '@/types/slave';
import { SlaveAssignment } from './SlaveAssignments';

export const adaptSlaveAssignment = (
  assignment: BaseSlaveAssignment
): SlaveAssignment => {
  return {
    ...assignment,
    count: assignment.count || 1,
    propertyId: assignment.propertyId || assignment.buildingId,
    propertyName: assignment.propertyName || 'Propriété inconnue'
  };
};

export const adaptSlaveAssignments = (
  assignments: BaseSlaveAssignment[]
): SlaveAssignment[] => {
  return assignments.map(adaptSlaveAssignment);
};

export const createSlaveAssignment = (
  slaveId: string,
  buildingId: string,
  propertyId: string,
  propertyName: string,
  buildingName?: string
): SlaveAssignment => {
  return {
    slaveId,
    buildingId,
    startDate: new Date(),
    efficiency: 100,
    propertyId,
    propertyName,
    buildingName,
    count: 1
  };
};
