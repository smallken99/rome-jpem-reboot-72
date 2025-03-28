
export enum BuildingType {
  VILLA = 'villa',
  FARM = 'farm',
  WORKSHOP = 'workshop',
  MINE = 'mine',
  VINEYARD = 'vineyard',
  OLIVE_GROVE = 'olive_grove',
  INSULAE = 'insulae',
  TEMPLE = 'temple',
  MARKET = 'market',
  DOCK = 'dock',
  WAREHOUSE = 'warehouse',
  OTHER = 'other'
}

export interface OwnedBuilding {
  id: string;
  name: string;
  type: BuildingType;
  location: string;
  size: number;
  value: number;
  income: number;
  maintenanceCost: number;
  condition: number;
  upgrades: string[];
  workers: number;
  maxWorkers: number;
  slaves?: string[];
  description?: string;
}

export interface BuildingDescription {
  type: BuildingType;
  name: string;
  description: string;
  baseValue: number;
  baseIncome: number;
  baseMaintenance: number;
  minSize: number;
  maxSize: number;
  workersPerUnit: number;
  icon: string;
}
