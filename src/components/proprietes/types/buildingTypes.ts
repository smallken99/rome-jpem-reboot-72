
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
  };
  effects?: {
    income?: number;
    popularity?: number;
    security?: number;
    maintenance?: number;
    condition?: number;
  };
  installed: boolean;
  buildingTypes: BuildingType[];
  requirements?: {
    minWorkers?: number;
    minSecurity?: number;
    minMaintenance?: number;
    minIncome?: number;
    minCondition?: number;
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
