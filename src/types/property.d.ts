
export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: Record<string, number>;
  effects?: Record<string, number>; // Added for compatibility
  type: string;
  installed: boolean;
  available: boolean;
  requirements?: {
    money?: number;
    condition?: number;
    propertyType?: string[];
    level?: number;
    otherUpgrades?: string[];
  };
}

export interface Building {
  id: string;
  name: string;
  type: string;
  description: string;
  cost: number;
  maintenance: number;
  income: number;
  buildingId?: string; // For compatibility
}

export interface OwnedBuilding extends Building {
  location: string;
  condition: number;
  value: number;
  upgrades?: PropertyUpgrade[];
  status?: string;
  buildingId: string;
  buildingType?: string;
  maintenanceLevel?: number;
  securityLevel?: number;
  workers?: number;
}
