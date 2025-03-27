
// Types pour les propriétés
export type PropertyType = 
  "urban" | "rural" | "villa" | "commercial" | "domus" | "insula" | 
  "taberna" | "horreum" | "officina" | "balneum" | "villa_urbana" | 
  "villa_rustica" | "temple" | "forum" | "market" | "warehouse" | 
  "workshop" | "bath" | "bridge" | "road" | "port" | "aqueduct" | 
  "other";

export type PropertyStatus = "excellent" | "good" | "fair" | "poor" | "ruins";

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  location: string;
  description?: string;
  value: number;
  size?: number;
  owner?: string;
  acquired?: string;
  income?: number;
  incomePerYear?: number;
  maintenance?: number;
  maintenanceCost?: number;
  condition?: number;
  status?: PropertyStatus;
  workers?: number;
  slaves?: number;
  features?: string[];
  taxes?: number;
  image?: string;
  upgrades?: PropertyUpgrade[];
  maintenanceLevel?: number;
  securityLevel?: number;
}

export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  benefits: string[];
  requirements?: {
    propertyType?: PropertyType[];
    condition?: number;
    value?: number;
  };
  installed: boolean;
  inProgress?: boolean;
  timeToComplete?: number;
}

export interface PropertyStats {
  totalValue: number;
  totalIncome: number;
  totalMaintenance: number;
  netProfit: number;
  totalProperties: number;
  breakdown: {
    urban: number;
    rural: number;
    commercial: number;
  };
}

export interface OwnedBuilding {
  id: string;
  name: string;
  type: PropertyType;
  buildingId: string;
  location: string;
  value: number;
  maintenanceEnabled?: boolean;
  maintenanceCost?: number;
  income?: number;
  condition: number;
  upgrades?: PropertyUpgrade[];
}

export interface BuildingType {
  id: string;
  name: string;
  type: PropertyType;
  baseValue: number;
  baseIncome: number;
  baseMaintenance: number;
  description: string;
  requirements?: {
    minWealth?: number;
    rank?: string;
    permission?: boolean;
  };
}
