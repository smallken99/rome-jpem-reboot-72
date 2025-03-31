
import { SlaveAssignment, Slave, OwnedBuilding } from '@/components/proprietes/types/property';

export interface SlaveAssignmentComponentProps {
  assignment: Partial<SlaveAssignment> & { 
    id?: string;
    slaveId?: string;
    buildingId?: string;
  };
  buildings: OwnedBuilding[];
  onRevoke: (assignmentId: string) => void;
}

export interface SlavesListProps {
  slaves: Partial<Slave>[];
  onDeleteSlave: (id: string) => void;
}
