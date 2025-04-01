
export enum ResourceType {
  RAW_MATERIAL = 'raw_material',
  FOOD = 'food',
  LUXURY = 'luxury',
  WEAPON = 'weapon',
  CONSTRUCTION = 'construction',
  FURNITURE = 'furniture',
  CLOTHING = 'clothing',
  OTHER = 'other'
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType | string;
  quantity: number;
  unit: string;
  value: number;
  description?: string;
  origin?: string;
  storageId?: string;
  perishable?: boolean;
  expirationDate?: Date;
  quality?: 'poor' | 'standard' | 'good' | 'excellent';
}

export interface ResourceTransaction {
  id: string;
  resourceId: string;
  resourceName: string;
  type: 'acquisition' | 'consumption' | 'transfer';
  quantity: number;
  date: Date;
  responsible: string;
  source?: string;
  destination?: string;
  cost?: number;
  reason?: string;
}

export interface Storage {
  id: string;
  name: string;
  buildingId: string;
  capacity: number;
  usedCapacity: number;
  resources: Resource[];
  location: string;
}
