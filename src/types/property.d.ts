
export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: {
    income?: number;
    maintenance?: number;
    condition?: number;
    security?: number;
    value?: number;
    productivity?: number;
  };
  installed: boolean;
  type: string;
  installDate?: Date;
  requirements?: string[];
  effects?: string[] | {
    income?: number;
    maintenance?: number;
    condition?: number;
    security?: number;
    value?: number;
    productivity?: number;
  };
}

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  name: string;
  type: string;
  buildingType: string;
  location: string;
  condition: number;
  maintenanceLevel: number;
  income: number;
  workers: number;
  securityLevel: number;
  description: string;
  maintenanceEnabled?: boolean;
  maintenanceCost: number;
  slaves?: number;
  purchaseDate?: Date;
  lastMaintenance?: Date;
  size: string;
  status?: string;
  value: number;
  maxWorkers: number;
  maintenance?: number;
  upgrades?: PropertyUpgrade[];
}
