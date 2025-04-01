
export enum BuildingType {
  DOMUS = 'domus',
  VILLA = 'villa',
  TEMPLE = 'temple',
  FORUM = 'forum',
  WAREHOUSE = 'warehouse',
  SHOP = 'shop',
  TAVERN = 'tavern',
  BATH = 'bath',
  THEATER = 'theater',
  STADIUM = 'stadium',
  FARM = 'farm',
  MINE = 'mine',
  URBAN = 'urban',
  RURAL = 'rural',
  RELIGIOUS = 'religious',
  OTHER = 'other'
}

export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: {
    income?: number;
    popularity?: number;
    security?: number;
    maintenance?: number;
    condition?: number;
    value?: number;
    conditionBoost?: number;
    maintenanceReduction?: number;
  };
  // Add this to support the code using 'effects' instead of 'effect'
  effects?: {
    income?: number;
    popularity?: number;
    security?: number;
    maintenance?: number;
    condition?: number;
    value?: number;
    conditionBoost?: number;
    maintenanceReduction?: number;
  };
  installed: boolean;
  applied?: boolean;
  buildingTypes: BuildingType[];
  // Add requirements field
  requirements?: {
    minWorkers?: number;
    minSecurity?: number;
    minMaintenance?: number;
    minIncome?: number;
    minCondition?: number;
    minBuildingLevel?: number;
    minValue?: number;
    otherUpgrades?: string[];
    buildingLevel?: number;
    buildingCondition?: number;
    previousUpgrade?: string;
    value?: number;
    upgrades?: string[];
  };
}

export interface BuildingDescription {
  id?: string;
  name: string;
  type: BuildingType;
  description: string;
  size?: number;
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

export interface OwnedBuilding {
  id: string;
  buildingId: string;
  name: string;
  type: BuildingType;
  buildingType: string;
  location: string;
  size: number;
  value: number;
  maintenanceCost: number;
  condition: number;
  maintenanceLevel: number;
  securityLevel: number;
  income: number;
  workers: number;
  maxWorkers: number;
  upgrades: PropertyUpgrade[];
  description: string;
  purchaseDate: Date;
  buildingDescription?: BuildingDescription;
  status?: string;
  maintenance?: number;
}
