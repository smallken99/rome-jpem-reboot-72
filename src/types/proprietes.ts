
export type PropertyType = 'commercial' | 'urban' | 'rural' | 'other' | 'villa' | 'domus' | 'insula' | 'religious' | 'public';
export type PropertyStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'dilapidated' | 'ruins';

export interface Property {
  id: string;
  type: PropertyType;
  name: string;
  location: string;
  value: number;
  maintenance: number;
  condition: number;
  incomePerYear: number;
  maintenanceCost: number;
  status: PropertyStatus;
  income?: number;
  upgrades?: PropertyUpgrade[];
  acquired?: string;
  buildingType?: string;
}

export interface Building {
  id: string;
  type: string;
  buildingType?: string;
  name: string;
  location: string;
  value: number;
  maintenance: number;
  condition: number;
  workers?: number;
  slaves?: number;
  securityLevel?: number;
  maintenanceLevel?: number;
  status?: string;
  upgrades?: PropertyUpgrade[];
  income?: number;
  maintenanceEnabled?: boolean;
  maintenanceCost?: number;
}

export interface PropertyUpgrade {
  id: string;
  name?: string;
  cost?: number;
  effect?: string | Record<string, any>;
  description?: string;
  prerequisites?: string[];
  type?: string;
  benefitDescription?: string;
  prerequisiteUpgradeId?: string;
  installed?: boolean;
  buildingTypes?: string[];
  requirements?: {
    value?: number;
    condition?: number;
    upgrades?: string[];
    [key: string]: any;
  };
  effects?: {
    income?: number;
    maintenance?: number;
    security?: number;
    condition?: number;
    [key: string]: any;
  };
  category?: string;
  tier?: number;
}

export interface OwnedBuilding extends Building {
  buildingId: string;
  buildingType: string;
  size?: number;
  maxWorkers?: number;
  purchaseDate?: Date;
  lastMaintenance?: Date;
}

export interface PropertyStats {
  totalIncome: number;
  totalMaintenance: number;
  totalValue: number;
  yearlyMaintenance?: number;
  totalProperties?: number;
}
