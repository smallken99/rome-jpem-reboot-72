
export interface OwnedBuilding {
  id: number;
  buildingId: string;
  buildingType: 'urban' | 'rural' | 'religious' | 'public' | string;
  name: string;
  location: string;
  maintenanceEnabled: boolean;
  maintenanceCost: number;
  slaves: number;
  condition: number;
  purchaseDate: Date;
  lastMaintenance?: Date;
  income?: number;
  description?: string;
  size?: 'small' | 'medium' | 'large';
}

export interface BuildingPurchaseOptions {
  buildingId: string;
  name: string;
  location: string;
  maintenanceCost: number;
  slaves?: number;
  type: 'urban' | 'rural' | 'religious' | 'public';
  initialCost: number;
}
