
// Common types for building management
export interface OwnedBuilding {
  id: number;
  buildingId: string;
  buildingType: 'urban' | 'rural' | 'religious' | 'public';
  name: string;
  location: string;
  maintenanceEnabled: boolean;
  maintenanceCost: number;
  slaves: number;
  condition: number; // 0-100
  purchaseDate: Date;
  lastMaintenance?: Date;
}
