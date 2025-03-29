
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
  description?: string;
  purchaseDate: Date;
  
  // Propriétés supplémentaires requises
  size: number;
  value: number;
  maintenanceCost: number;
  maxWorkers: number;
  securityLevel: number;
  maintenanceLevel: number;
  status?: string;
  maintenance?: number;
  maintenanceEnabled?: boolean;
  slaves?: number;
  upgrades: PropertyUpgrade[];
}

export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: string;
  effects?: {
    income?: number;
    maintenance?: number;
    security?: number;
    condition?: number;
    [key: string]: any;
  };
  type: string;
  installed?: boolean;
  applied?: boolean;
  buildingType?: BuildingType[];
  duration?: number;
  
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
  
  // Propriétés supplémentaires utilisées dans le code
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
