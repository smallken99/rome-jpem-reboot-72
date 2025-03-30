
import { SlaveAssignment as BaseSlaveAssignment } from '@/types/slave';

export interface SlaveAssignment extends BaseSlaveAssignment {
  count: number;
  propertyId: string;
  propertyName: string;
  buildingName?: string;
}
