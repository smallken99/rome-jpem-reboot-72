
import { PropertyType, PropertyStatus } from '@/types/proprietes';

export interface Property {
  id: string | number;
  name: string;
  location: string;
  type: PropertyType;
  value: number;
  incomePerYear?: number;
  maintenanceCost: number;
  condition: number;
  status?: PropertyStatus;
  upgrades?: PropertyUpgrade[];
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
  category?: string;
  tier?: number;
  buildingTypes: string[];
  prerequisiteUpgradeId?: string;
}

export interface OwnedBuilding {
  id: string | number;
  buildingId: string;
  buildingType: string;
  name: string;
  type?: string;
  location: string;
  value: number;
  maintenance: number;
  condition: number;
  status?: string;
  maintenanceCost: number;
  maintenanceEnabled?: boolean;
  slaves?: number;
  workers?: number;
  securityLevel?: number;
  maintenanceLevel?: number;
  purchaseDate?: Date;
  lastMaintenance?: Date;
  income?: number;
  size?: number;
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
