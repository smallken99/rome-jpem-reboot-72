
import { GameDate } from '@/utils/types/gameDate';

export interface Slave {
  id: string;
  name: string;
  age: number;
  health: number;
  skill: number;
  specialty: string;
  price: number;
  origin: string;
  status: string;
  gender?: 'male' | 'female';
  buildingId?: string;
  propertyId?: string;
  skills?: string[];
  assigned?: boolean;
  assignedTo?: string;
  count?: number;
}

export interface SlaveAssignment {
  slaveId: string;
  buildingId: string;
  startDate: Date;
  efficiency: number;
  count?: number;
  propertyId?: string;
  propertyName?: string;
  buildingName?: string;
}
