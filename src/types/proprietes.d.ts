
export interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  value: number;
  income: number;
  maintenance: number;
  condition: number;
  status?: string;
  acquired?: string;
  upgrades?: PropertyUpgrade[];
  incomePerYear?: number;
  maintenanceCost?: number;
}

export interface Building extends Property {
  workers?: number;
  securityLevel?: number;
  maintenanceLevel?: number;
  buildingId?: string;
  buildingType?: string;
}

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  buildingType: string;
  type: string;
  name: string;
  location: string;
  condition: number;
  value?: number;
  maintenance?: number;
}

export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effects: {
    income?: number;
    maintenance?: number;
    security?: number;
    condition?: number;
  };
  requirements?: {
    value?: number;
    condition?: number;
    upgrades?: string[];
  };
  installed?: boolean;
}

export interface PropertyStats {
  totalValue: number;
  totalIncome: number;
  totalMaintenance: number;
}
