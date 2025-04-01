
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

// Define Slave interface with all possible properties
export interface Slave {
  id: string;
  name: string;
  age?: number;
  gender?: 'male' | 'female';
  status?: 'healthy' | 'sick' | 'injured';
  acquired?: Date;
  value?: number;
  assignedTo?: string;
  assigned: boolean;
  specialties: string[];
  notes?: string;
  // Additional compatibility properties
  health?: number;
  skills?: string[];
  origin?: string;
}

// Define SlaveAssignment interface with all possible properties
export interface SlaveAssignment {
  id?: string;
  slaveId?: string;
  propertyId: string;
  buildingId?: string;
  startDate: Date;
  efficiency: number;
  buildingName?: string;
  count?: number;
  maxCount?: number;
  // Additional compatibility properties 
  role?: string;
  productivity?: number;
  assignedAt?: Date;
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
  // Alias for compatibility with code using 'effects'
  effects?: {
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
  applied?: boolean;  // Add for compatibility
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
    buildingLevel?: number;
    buildingCondition?: number;
    previousUpgrade?: string;
    value?: number;
    upgrades?: string[];
  };
  type?: string;
  buildingType?: string[];
}

// Re-export building types
export type { OwnedBuilding };
