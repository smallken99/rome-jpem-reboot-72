
export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  location: string;
  value: number;
  incomePerYear: number;
  maintenanceCost: number;
  status: PropertyStatus;
  description?: string;
  image?: string;
  upgrades?: PropertyUpgrade[];
  size?: number;
  buildings?: Building[];
}

export type PropertyType = 'urban' | 'rural' | 'villa' | 'commercial';

export type PropertyStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'dilapidated';

export interface PropertyUpgrade {
  id: string;
  name: string;
  cost: number;
  description: string;
  benefitDescription: string;
  incomeBonus?: number;
  valueBonus?: number;
  installed: boolean;
  prerequisiteUpgradeId?: string;
}

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  size: number;
  cost: number;
  value: number;
  income: number;
  maintenance: number;
  status: PropertyStatus;
  description: string;
  image?: string;
  location: string;
  purchaseYear?: number;
  upgrades?: PropertyUpgrade[];
}

export type BuildingType = 
  'domus' | 
  'insula' | 
  'taberna' | 
  'horreum' | 
  'officina' | 
  'balneum' | 
  'villa_urbana' | 
  'villa_rustica';

export interface PropertyStats {
  totalValue: number;
  yearlyIncome: number;
  yearlyMaintenance: number;
  netYearlyProfit: number;
  propertyCount: number;
  buildingCount: number;
  upgradePotential: number;
}

export interface PropertyFilter {
  types: PropertyType[];
  locations: string[];
  statuses: PropertyStatus[];
  minValue?: number;
  maxValue?: number;
  minProfit?: number;
}
