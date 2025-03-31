
import { BuildingType } from '@/components/maitrejeu/types/batiments';

export type OwnedBuildingType = 'urban' | 'rural' | 'religious' | 'public' | 'commercial';

export interface PropertyUpgrade {
  id: string;
  name: string;
  cost: number;
  description: string;
  effect: string;
  applied: boolean;
  requirements?: {
    minBuildingLevel?: number;
    minValue?: number;
    minWorkers?: number;
    minCondition?: number;
    otherUpgrades?: string[];
  };
  effects?: {
    income?: number;
    maintenanceReduction?: number;
    conditionBoost?: number;
    workers?: number;
    value?: number;
  };
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
