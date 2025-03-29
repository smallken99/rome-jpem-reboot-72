
export interface OwnedBuilding {
  id: string;
  buildingId?: string;
  name: string;
  buildingType: string;
  type: string;
  location: string;
  size: number;
  value: number;
  condition: number;
  maintenanceLevel: number;
  maintenanceCost: number;
  income: number;
  workers: number;
  maxWorkers: number;
  securityLevel: number;
  description?: string;
  purchaseDate?: Date;
  status?: string;
  upgrades?: PropertyUpgrade[];
}

export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: string;
  effects?: string[];
  installed: boolean;
  type: string;
  requirements?: {
    funds?: number;
    workers?: number;
    buildingCondition?: number;
    maintenance?: number;
  };
}
