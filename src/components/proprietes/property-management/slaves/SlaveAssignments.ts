
import { SlaveAssignment as BaseSlaveAssignment } from '@/types/slave';

export interface SlaveAssignment extends BaseSlaveAssignment {
  count: number;
}

// Adapter pour convertir entre les différents types d'assignation
export const adaptSlaveAssignment = (
  assignment: BaseSlaveAssignment & { count?: number }
): SlaveAssignment => {
  return {
    ...assignment,
    count: assignment.count || 1,
  };
};

// Fonction pour créer une assignation
export const createSlaveAssignment = (
  slaveId: string,
  buildingId: string,
  propertyId: string,
  propertyName: string
): SlaveAssignment => {
  return {
    slaveId,
    buildingId,
    startDate: new Date(),
    efficiency: 100,
    propertyId,
    propertyName,
    count: 1
  };
};
