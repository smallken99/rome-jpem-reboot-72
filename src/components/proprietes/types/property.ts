
import { BuildingType } from '@/components/maitrejeu/types/batiments';

export type OwnedBuildingType = 'urban' | 'rural' | 'religious' | 'public' | 'commercial';

export interface PropertyUpgrade {
  id: string;
  name: string;
  cost: number;
  description: string;
  effect: string;
  applied: boolean;
  installed?: boolean; // Add this for compatibility with some code
  buildingType?: BuildingType[]; // Add this for compatibility with some code
  requirements?: {
    minBuildingLevel?: number;
    minValue?: number;
    minWorkers?: number;
    minCondition?: number;
    otherUpgrades?: string[];
    buildingLevel?: number; // Add for compatibility
    buildingCondition?: number; // Add for compatibility
    minIncome?: number; // Add for compatibility
    value?: number; // Add for compatibility
    previousUpgrade?: string; // Add for compatibility
    upgrades?: string[]; // Add for compatibility
  };
  effects?: {
    income?: number;
    maintenanceReduction?: number;
    conditionBoost?: number;
    workers?: number;
    value?: number;
    maintenance?: number; // Add for compatibility
    condition?: number; // Add for compatibility
    security?: number; // Add for compatibility
  };
  type?: string; // Add for compatibility
}

export interface OwnedBuilding {
  id: string | number;
  buildingId: string;
  name: string;
  buildingType: OwnedBuildingType | string;
  type: BuildingType | string;
  location: string;
  size: number | string;
  value: number;
  condition: number;
  maintenanceLevel: number;
  maintenanceCost: number;
  maintenance: number;
  income?: number;
  workers?: number;
  maxWorkers?: number;
  securityLevel?: number;
  description?: string;
  purchaseDate: Date;
  lastMaintenance?: Date;
  status?: string;
  maintenanceEnabled?: boolean;
  slaves?: number;
  upgrades?: PropertyUpgrade[];
}

export interface BuildingPurchaseOptions {
  buildingId: string;
  type: string;
  name: string;
  location: string;
  initialCost: number;
  maintenanceCost: number;
  slaves?: number;
  size?: string;
}

export interface BuildingStats {
  totalValue: number;
  monthlyIncome: number;
  monthlyMaintenance: number;
  totalBuildings: number;
  averageCondition: number;
  byType: Record<string, number>;
}

export interface PropertyUpgradeEffects {
  income?: number;
  maintenance?: number;
  condition?: number;
  workers?: number;
  value?: number;
  securityLevel?: number;
}

// Add these for compatibility with slaves components
export interface Slave {
  id: string;
  name: string;
  age: number;
  gender: string;
  status: string;
  acquired: Date;
  value: number;
  assignedTo?: string;
  health?: number;
  skills?: string[];
  origin?: string;
  notes?: string;
}

export interface SlaveAssignment {
  id: string;
  slaveId: string;
  buildingId: string;
  propertyId: string;
  startDate: Date;
  efficiency: number;
  buildingName?: string;
  assignedAt?: Date;
  role?: string;
  productivity?: number;
  count?: number;
  maxCount?: number;
}
