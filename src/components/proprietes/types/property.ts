
// Define the property upgrade interface
export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: string;
  effect: {
    [key: string]: number;
  };
  effects?: Array<{
    type: string;
    value: number;
    description: string;
  }>;
  requirements?: {
    minBuildingSize?: number;
    minBuildingValue?: number;
    minOwnerPrestige?: number;
    otherUpgrades?: string[];
    buildingLevel?: number;
    buildingCondition?: number;
    minIncome?: number;
    value?: number;
    previousUpgrade?: string;
    upgrades?: string[];
  };
  installed: boolean;
  installDate?: Date;
  buildingType?: string;
}

// Define the owned building interface
export interface OwnedBuilding {
  id: string;
  buildingId: string;
  name: string;
  buildingType: string;
  type: string;
  location: string;
  size: number;
  value: number;
  condition: number;
  maintenanceLevel: number;
  maintenanceCost: number;
  maintenance?: number; // For compatibility
  income: number;
  workers: number;
  maxWorkers: number;
  securityLevel: number;
  description: string;
  purchaseDate: Date;
  status?: string;
  upgrades: PropertyUpgrade[];
}

// Define property tax information
export interface PropertyTax {
  id: string;
  buildingId: string;
  amount: number;
  paid: boolean;
  dueDate: Date;
  taxType: 'property' | 'luxury' | 'income' | 'other';
  period: string;
}
