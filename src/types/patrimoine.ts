
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

export interface PropertyStats {
  totalValue: number;
  totalIncome: number;
  totalMaintenance: number;
  propertyCount: number;
  averageCondition: number;
}

// Export des types depuis le module buildings
export type { OwnedBuilding, BuildingPurchaseOptions, BuildingStatistics } from './buildings';
