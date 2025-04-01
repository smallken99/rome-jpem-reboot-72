
export type BuildingType = 
  'domus' | 'villa' | 'temple' | 'forum' | 'warehouse' | 'shop' | 
  'tavern' | 'bath' | 'theater' | 'stadium' | 'farm' | 'mine' | 
  'urban' | 'rural' | 'religious' | 'other';

export type BuildingStatus = 
  'excellent' | 'good' | 'average' | 'poor' | 'ruined' | 'fair' | 'damaged' |
  'under_construction' | 'planned' | 'in_progress' | 'completed' | 'abandoned';

export interface BuildingFilter {
  types: string[];
  locations: string[];
  status: string;
  minRevenue: number;
  maxMaintenance: number;
  searchTerm: string;
}

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  location: string;
  owner: string;  // Made required as per error message
  value: number;
  maintenance: number;
  maintenanceCost: number;
  condition: number;
  status: BuildingStatus;
  workers?: number;
  description: string;
  constructionYear: number;
  cost: number;
  revenue: number;
  capacity: number;
  income?: number;
  maintenanceLevel?: number;
  securityLevel?: number;
}

export interface BuildingCreationData {
  name: string;
  type: BuildingType;
  location: string;
  owner: string;  // Made required as per error message
  value: number;
  maintenance: number;
  maintenanceCost: number;
  condition: number;
  status: BuildingStatus;
  workers?: number;
  description: string;
  constructionYear: number;
  cost: number;
  revenue: number;
  capacity: number;
  income?: number;
}

export interface MaintenanceTask {
  id: string;
  buildingId: string;
  buildingName?: string; // Added based on error messages
  type: 'repair' | 'upgrade' | 'routine';
  description: string;
  cost: number;
  duration: number;
  startDate: Date;
  completionDate?: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo?: string;
}

export interface MaintenanceRecord {
  id: string;
  buildingId: string;
  date: Date;
  type: 'repair' | 'upgrade' | 'routine';
  cost: number;
  description: string;
  performedBy: string;
  conditionBefore: number;
  conditionAfter: number;
}

export interface RevenueRecord {
  id: string;
  buildingId: string;
  period: {
    start: Date;
    end: Date;
  };
  amount: number;
  expenses: number;
  netProfit: number;
  occupancyRate?: number;
  notes?: string;
}

export interface ConstructionProject {
  id: string;
  name: string;
  type: BuildingType;
  location: string;
  estimatedCost: number;
  actualCost?: number;
  startDate: Date;
  estimatedCompletionDate?: Date;
  estimatedEndDate?: Date;  // Added based on error in useBuildingManagement.ts
  expectedCompletionYear?: number; // Added based on errors
  actualCompletionDate?: Date;
  status: 'planned' | 'in_progress' | 'completed' | 'abandoned';
  progress: number; // 0-100
  supervisor?: string;
  description?: string;
  workers?: number;
  approved?: boolean;
}

export type BuildingPriority = 'high' | 'medium' | 'low'; // Added based on errors
export type BuildingOwner = 'public' | 'private' | 'religious' | 'state' | 'imperial'; // Added based on errors
