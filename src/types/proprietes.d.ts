
export interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  value: number;
  incomePerYear: number;
  maintenanceCost: number;
  condition: number;
  status?: string;
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
}

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  buildingType: string;
  name: string;
  type: string;
  location: string;
  value: number;
  maintenance: number;
  condition: number;
  status?: string;
}

export interface Building {
  id: string;
  name: string;
  location: string;
  type: string;
  value: number;
  maintenance: number;
  condition: number;
  status?: string;
  upgrades?: PropertyUpgrade[];
  buildingId?: string;
  buildingType?: string;
}

export interface BuildingType {
  id: string;
  name: string;
  description: string;
  value: number;
  category: string;
}

// Add any other missing property-related interfaces
