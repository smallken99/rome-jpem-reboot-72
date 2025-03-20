
// Types communs pour tous les bâtiments
export type BuildingType = 'temple' | 'forum' | 'market' | 'villa' | 'domus' | 'insula' | 'warehouse' | 'baths' | 'theater' | 'port' | 'aqueduct' | 'road' | 'wall' | 'barracks' | 'palace' | 'senate' | 'other' | 'basilica' | 'amphitheater' | 'circus' | 'bath' | 'bridge';

export type BuildingCategory = 'administrative' | 'religious' | 'entertainment' | 'infrastructure' | 'military' | 'commercial' | 'urban' | 'rural';

export interface BaseBuildingDescription {
  id: string;
  name: string;
  description: string;
  type: string;
  initialCost: number;
  maintenanceCost: number;
  prestige: number;
  advantages: string[];
  income?: number;
  piete?: number;
  popularite?: number;
  reputation?: number;
  production?: {
    type: string;
    amount: number;
    unit: string;
  };
  slaves?: {
    required: number;
    optimal: number;
    maxProfit?: number;
  };
  basePrice?: number;
  buildingType?: string;
  category?: BuildingCategory;
  subType?: string;
  requirements?: string[] | string;
  maintenance?: number | string;
  security?: number | string;
}

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  buildingType: string;
  name: string;
  location: string;
  type: BuildingType; // Rendre cette propriété non optionnelle
  maintenanceEnabled?: boolean;
  maintenanceCost: number;
  condition: number;
  slaves?: number;
  workers?: number;
  purchaseDate: Date;
  lastMaintenance?: Date;
  maintenanceLevel?: number;
  securityLevel?: number;
  income?: number;
  status?: string;
  size?: string;
  description?: string;
}

export interface BuildingOperations {
  maintenance: (buildingId: string, level: number) => void;
  security: (buildingId: string, level: number) => void;
  workers: (buildingId: string, workers: number) => void;
  sell: (buildingId: string) => void;
  renovate: (buildingId: string) => void;
}

export interface BuildingPurchaseOptions {
  buildingId: string;
  type: string;
  name: string;
  location: string;
  initialCost: number;
  maintenanceCost: number;
  slaves?: number;
  customName?: string;
}

export interface BuildingStatistics {
  totalValue: number;
  totalIncome: number;
  totalMaintenance: number;
  propertyCount: number;
  averageCondition: number;
}
