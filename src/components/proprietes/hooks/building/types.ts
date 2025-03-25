
export interface BuildingDescription {
  id: string;
  name: string;
  type: string;
  description: string;
  cost: number;
  maintenanceCost: number;
  income?: number;
  piete?: number;
  popularite?: number;
  reputation?: number;
  production?: number;
  workers: {
    required: number;
    optimal: number;
    maxProfit: number;
  };
  subType?: string;
  requirements?: string[];
  maintenance?: number;
  security?: number;
  initialCost?: number;
  slaves: {
    required: number;
    optimal: number;
    maxProfit: number;
  };
  prestige?: number;
  advantages?: string[];
}

export interface OwnedBuilding {
  id: string | number;
  buildingId: string;
  name: string;
  type?: string;
  location: string;
  condition: number;
  maintenanceLevel?: number;
  income?: number;
  workers?: number;
  securityLevel?: number;
  description?: string;
  buildingDescription?: BuildingDescription;
  buildingType?: string;
  maintenanceEnabled?: boolean;
  maintenanceCost?: number;
  slaves?: number;
  purchaseDate?: Date;
  lastMaintenance?: Date;
  size?: string;
  status?: string;
}

export interface BuildingOperations {
  maintenance: (buildingId: string, level: number) => void;
  security: (buildingId: string, level: number) => void;
  workers: (buildingId: string, workers: number) => void;
  sell: (buildingId: string) => void;
  renovate: (buildingId: string) => void;
}

export interface BuildingMaintenanceLevels {
  MINIMAL: number;
  BASIC: number;
  STANDARD: number;
  HIGH: number;
  LUXURY: number;
}

export interface BuildingPurchaseOptions {
  buildingId: string;
  type: "urban" | "rural" | "religious" | "public";
  name: string;
  location: string;
  initialCost: number;
  maintenanceCost: number;
  slaves?: number;
  customName?: string;
  buildingType?: string;
}

export interface SlaveAssignment {
  buildingId: string | number;
  buildingName: string;
  count: number;
  maxCount: number;
  efficiency: number;
}
