
import { PropertyType, PropertyStatus } from '@/types/proprietes';

export interface Property {
  id: string;
  name: string;
  location: string;
  type: PropertyType | string;
  value: number;
  incomePerYear?: number;
  maintenanceCost: number;
  condition: number;
  status?: PropertyStatus | string;
  upgrades?: PropertyUpgrade[];
  size?: number;
}

export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect?: string | Record<string, any>;
  effects?: {
    income?: number;
    maintenance?: number;
    security?: number;
    condition?: number;
    [key: string]: any;
  };
  requirements?: {
    value?: number;
    condition?: number;
    upgrades?: string[];
    [key: string]: any;
  };
  installed?: boolean;
  applied?: boolean;
  category?: string;
  tier?: number;
  buildingTypes: string[];
  buildingType?: string[];
  prerequisiteUpgradeId?: string;
}

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  buildingType: string;
  name: string;
  type?: string;
  location: string;
  value: number;
  maintenance: number;
  condition: number;
  status?: PropertyStatus | string;
  maintenanceCost: number;
  maintenanceLevel?: number;
  maintenanceEnabled?: boolean;
  slaves?: number;
  workers?: number;
  securityLevel?: number;
  purchaseDate?: Date | string;
  lastMaintenance?: Date | string;
  income?: number;
  size?: number | string;
  maxWorkers?: number;
  upgrades?: PropertyUpgrade[];
  description?: string;
}

export interface BuildingPurchaseOptions {
  buildingId: string;
  type: "urban" | "rural" | "religious" | "public";
  name: string;
  location: string;
  initialCost: number;
  maintenanceCost: number;
  slaves?: number;
  customName?: string;
  buildingType?: string;
}

export interface SlaveAssignment {
  id: string;
  slaveId: string;
  propertyId: string;
  buildingId?: string;
  assignedAt?: any;
  productivity?: number;
  startDate: Date | string;
  role: string;
  efficiency: number;
}

export interface PropertyTransaction {
  id: string;
  propertyId: string;
  type: "purchase" | "sale" | "maintenance" | "upgrade" | "income" | "expense" | "acquisition" | "consumption" | "transfer";
  amount: number;
  date: Date | string;
  description: string;
  resourceName?: string;
  resourceId?: string;
  responsible?: string;
  reason?: string;
  quantity?: number;
}
