
export type PropertyType = 'commercial' | 'urban' | 'rural' | 'other' | 'villa' | 'domus' | 'insula';
export type PropertyStatus = 'excellent' | 'good' | 'fair' | 'ruins' | 'poor' | 'dilapidated';

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
}

export interface Building {
  id: string;
  type: string;
  name: string;
  location: string;
  value: number;
  maintenance: number;
  condition: number;
  workers?: number;
  securityLevel?: number;
  maintenanceLevel?: number;
  status?: string;
  upgrades?: PropertyUpgrade[];
  income?: number;
}

export interface PropertyUpgrade {
  id: string;
  name?: string;
  cost?: number;
  effect?: string;
  description?: string;
  prerequisites?: string[];
  type?: string;
  benefitDescription?: string;
  prerequisiteUpgradeId?: string;
  installed?: boolean;
}

export interface OwnedBuilding extends Building {
  buildingId: string;
}

export interface PropertyStats {
  totalIncome: number;
  totalMaintenance: number;
  totalValue: number;
  yearlyMaintenance?: number;
  totalProperties?: number;
}
