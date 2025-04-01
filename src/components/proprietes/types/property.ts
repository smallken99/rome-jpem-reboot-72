
// Add PropertyTransaction type to property.ts

import { OwnedBuilding } from './buildingTypes';

export interface PropertyTransaction {
  id: string;
  resourceId: string;
  resourceName: string;
  type: 'acquisition' | 'consumption' | 'transfer';
  quantity: number;
  date: Date;
  responsible: string;
  source?: string;
  destination?: string;
  cost?: number;
  reason?: string;
}

export interface TransactionsListProps {
  searchTerm?: string;
  resourceId?: string;
  onTransactionSelect?: (transaction: PropertyTransaction) => void;
  onAddTransaction?: () => void;
  filters?: {
    resourceName?: string;
    type?: string;
    startDate?: Date;
    endDate?: Date;
    responsible?: string;
  };
}

// Define Slave interface
export interface Slave {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  status: 'healthy' | 'sick' | 'injured';
  acquired: Date;
  value: number;
  assignedTo?: string;
  assigned: boolean;
  specialties: string[];
  notes?: string;
}

// Define SlaveAssignment interface
export interface SlaveAssignment {
  propertyId: string;
  slaveId: string;
  buildingId: string;
  startDate: Date;
  efficiency: number;
  id?: string;
  buildingName?: string;
  count?: number;
  maxCount?: number;
}

// Define PropertyUpgrade interface
export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: {
    income?: number;
    popularity?: number;
    security?: number;
    maintenance?: number;
    condition?: number;
    value?: number;
    conditionBoost?: number;
    maintenanceReduction?: number;
  };
  installed: boolean;
  buildingTypes: string[];
  requirements?: {
    minWorkers?: number;
    minSecurity?: number;
    minMaintenance?: number;
    minIncome?: number;
    minCondition?: number;
    minBuildingLevel?: number;
    minValue?: number;
    otherUpgrades?: string[];
  };
  applied?: boolean;
}

// Re-export building types
export type { OwnedBuilding };
