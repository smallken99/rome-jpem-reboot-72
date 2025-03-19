
import { BuildingType } from '@/components/maitrejeu/types/batiments';

export type PropertyType = 'villa' | 'domus' | 'insula' | 'domaine' | 'terrain' | 'commerce';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  location: string;
  value: number;
  income: number;
  maintenance: number;
  condition: number;
  familyId?: string;
  ownerId?: string;
  acquired: string; // Date ISO string
  description?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export interface OwnedBuilding {
  id: number | string;
  buildingId: string;
  buildingType: BuildingType | string;
  name: string;
  location: string;
  size?: 'small' | 'medium' | 'large' | 'huge';
  maintenanceEnabled: boolean;
  maintenanceCost: number;
  slaves: number;
  condition: number;
  purchaseDate: Date;
  income?: number;
  workers?: number;
  maintenanceLevel?: number;
  securityLevel?: number;
  description?: string;
  type?: string;
}

export interface BuildingPurchaseOptions {
  buildingId: string;
  type: string;
  name: string;
  location: string;
  initialCost: number;
  maintenanceCost: number;
  slaves?: number;
}

export interface PropertyStats {
  totalValue: number;
  totalIncome: number;
  totalMaintenance: number;
  propertyCount: number;
  averageCondition: number;
}
