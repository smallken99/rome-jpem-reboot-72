
export type BuildingType = 'domus' | 'villa' | 'insula' | 'farmland' | 'temple' | string;

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  name: string;
  buildingType: string;
  type: BuildingType;
  location: string;
  condition: number;
  income: number;
  workers: number;
  description: string;
  purchaseDate: Date;
  
  // Additional required properties
  size: number;
  value: number;
  maintenanceCost: number;
  maxWorkers: number;
  upgrades: PropertyUpgrade[];
  
  // Properties used in code but not in initial interface
  maintenanceLevel: number;
  securityLevel: number;
  buildingDescription?: any;
  status?: string;
  maintenance?: number;
}

export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: string;
  applied: boolean;
  buildingType: BuildingType[];
  duration?: number;
  
  // Missing properties found in code
  effects?: Record<string, any>;
  requirements?: {
    buildingLevel?: number;
    previousUpgrade?: string;
    minCondition?: number;
    specialBuilding?: string;
    minIncome?: number;
  };
}

export interface WorkerAssignment {
  buildingId: string;
  count: number;
  efficiency: number;
  cost: number;
}

export interface BuildingDescription {
  name: string;
  type: BuildingType;
  description: string;
  
  // Additional properties used in code
  id?: string;
  cost?: number;
  maintenanceCost?: number;
  income?: number;
  piete?: number;
  popularite?: number;
  reputation?: number;
  production?: number;
  workers?: {
    min: number;
    max: number;
    optimal: number;
    required?: number;
    maxProfit?: number;
  };
  subType?: string;
  requirements?: any;
  maintenance?: any;
  security?: any;
}
