
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
  // Propriétés pour la rétrocompatibilité
  income?: number;
  maintenance?: number;
  condition?: number;
  acquired?: string | Date;
  maintenanceLevel?: number;
  securityLevel?: number;
  workers?: number;
}

export type PropertyType = 'urban' | 'rural' | 'villa' | 'commercial' | 'domus' | 'insula';

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
  // Pour la compatibilité
  maintenanceLevel?: number;
  securityLevel?: number;
  workers?: number;
  condition?: number;
}

export type BuildingType = 
  'domus' | 
  'insula' | 
  'taberna' | 
  'horreum' | 
  'officina' | 
  'balneum' | 
  'villa_urbana' | 
  'villa_rustica' |
  'urban' |
  'rural' |
  'villa' |
  'commercial' |
  'other' |
  'temple' |
  'forum' |
  'market' |
  'warehouse' |
  'farm' |
  'vineyard' |
  'olive_grove' |
  'grain_field' |
  'pasture' |
  'mine' |
  'port' |
  'workshop' |
  'school' |
  'baths' |
  'theater' |
  'arena' |
  'bridge';

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

// Pour la compatibilité avec le code existant
export interface OwnedBuilding extends Building {
  buildingId: string;
  buildingType?: string;
  condition: number;
  purchaseDate?: Date;
}
