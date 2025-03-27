
export type BuildingType = 'domus' | 'insula' | 'villa' | 'taberna' | 'horti' | 'warehouse' | 'temple' | 'other';

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  name: string;
  buildingType: 'urban' | 'rural' | 'commercial' | 'religious';
  type: BuildingType;
  location: string;
  condition: number;
  maintenanceLevel?: number;
  maintenanceEnabled: boolean;
  maintenanceCost: number;
  income?: number;
  workers?: number;
  slaves?: number;
  securityLevel?: number;
  description?: string;
  purchaseDate: Date;
  lastMaintenance?: Date;
  size?: 'small' | 'medium' | 'large' | 'huge';
}

export interface BuildingPurchaseOptions {
  buildingId: string;
  type: BuildingType;
  name: string;
  location: string;
  initialCost: number;
  maintenanceCost: number;
  slaves?: number;
  size?: string;
}

export interface BuildingStatistics {
  totalValue: number;
  monthlyIncome: number;
  monthlyMaintenance: number;
  totalSlaves: number;
  averageCondition: number;
  count: {
    total: number;
    urban: number;
    rural: number;
    commercial: number;
    religious: number;
  };
}

export interface BuildingDescription {
  id: string;
  name: string;
  type: BuildingType;
  category: 'urban' | 'rural' | 'commercial' | 'religious';
  description: string;
  baseCost: number;
  maintenanceCost: number;
  baseIncome: number;
  slaves: {
    required: number;
    optimal: number;
    maxProfit: number;
  };
  size?: 'small' | 'medium' | 'large' | 'huge';
  profitability: 'low' | 'medium' | 'high';
  prestige: 'low' | 'medium' | 'high';
  requirements?: {
    rank?: string;
    minimumWealth?: number;
    minimumReputation?: number;
  };
}

// Type pour le résumé du patrimoine immobilier
export interface PropertySummary {
  totalValue: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netMonthlyProfit: number;
  propertyCount: number;
  totalSlaves: number;
}
