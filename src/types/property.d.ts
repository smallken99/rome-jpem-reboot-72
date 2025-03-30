
export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: string | Record<string, any>;
  effects?: {
    income?: number;
    maintenance?: number;
    security?: number;
    condition?: number;
    [key: string]: any;
  };
  installed?: boolean;
  category?: string;
  tier?: number;
  type: string;
  requirements?: {
    buildingLevel?: number;
    previousUpgrade?: string;
    minCondition?: number;
    specialBuilding?: string;
    minIncome?: number;
    funds?: number;
    workers?: number;
    buildingCondition?: number;
    maintenance?: number;
    value?: number;
    upgrades?: string[];
    condition?: number;
    buildingType?: string[];
  };
}

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  name: string;
  location: string;
  type: string;
  value: number;
  maintenance: number;
  condition: number;
  status?: string;
  upgrades?: PropertyUpgrade[];
  buildingType: string;
  size: number;
  maintenanceCost: number;
  income: number;
  workers: number;
  maxWorkers: number;
  securityLevel: number;
  maintenanceLevel: number;
  maintenanceEnabled?: boolean;
  slaves?: number;
  description?: string;
  purchaseDate?: Date;
}

// Add any other missing property-related interfaces
