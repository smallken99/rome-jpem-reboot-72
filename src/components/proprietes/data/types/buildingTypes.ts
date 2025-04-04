
export interface BuildingDescription {
  id: string;
  name: string;
  description: string;
  type: "urban" | "rural" | "religious" | "public";
  initialCost: number;
  maintenanceCost: number;
  slaves?: {
    required: number;
    optimal: number;
  };
  prestige: number;
  income: number;
  advantages: string[];
}

export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  buildingTypes: string[];
  prerequisiteUpgradeId?: string;
  effects: {
    income?: number;
    maintenance?: number;
    security?: number;
    condition?: number;
    [key: string]: any;
  };
  requirements?: {
    value?: number;
    condition?: number;
    upgrades?: string[];
    [key: string]: any;
  };
  installed?: boolean;
  category?: string;
  tier?: number;
}

export enum BuildingType {
  URBAN = "urban",
  RURAL = "rural",
  RELIGIOUS = "religious",
  PUBLIC = "public",
  OTHER = "other"
}
