
export enum BuildingType {
  VILLA = 'villa',
  FARM = 'farm',
  WORKSHOP = 'workshop',
  ESTATE = 'estate',
  DOMUS = 'domus',
  INSULA = 'insula',
  SHOP = 'shop',
  WAREHOUSE = 'warehouse',
  TEMPLE = 'temple',
  FORUM = 'forum'
}

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
}

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  name: string;
  type: string; // Propriété obligatoire
  location: string;
  condition: number;
  maintenanceLevel: number; // Propriété obligatoire
  income: number;
  workers: number;
  securityLevel: number;
  description?: string;
  buildingDescription?: BuildingDescription;
  buildingType?: string; // Pour la compatibilité
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
