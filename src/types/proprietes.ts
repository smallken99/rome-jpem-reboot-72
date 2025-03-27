
export type PropertyType = 'urban' | 'rural' | 'commercial' | 'villa' | 'other' | 'domus' | 'insula';

export type PropertyStatus = 'excellent' | 'good' | 'fair' | 'ruins' | 'dilapidated' | 'poor';

export interface Property {
  id: string;
  type: PropertyType;
  location: string;
  value: number;
  acquired?: string;
  income?: number;
  incomePerYear: number;
  maintenance?: number;
  maintenanceCost: number;
  status: PropertyStatus;
  condition?: number;
  upgrades?: PropertyUpgrade[];
  name?: string;
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
  income?: number;
  status?: string;
  upgrades?: PropertyUpgrade[];
}

export interface OwnedBuilding extends Building {
  buildingId: string;
  condition: number;
}

export interface PropertyUpgrade {
  id: string;
  name: string;
  cost: number;
  description: string;
  installed: boolean;
  type: string;
  effect: {
    income?: number;
    value?: number;
    maintenance?: number;
  };
  prerequisiteUpgradeId?: string;
  benefitDescription?: string;
}
