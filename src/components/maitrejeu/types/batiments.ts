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
  owner: string;  // Required property
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
  owner: string;  // Required property
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

export type BuildingPriority = 'high' | 'medium' | 'low';

export interface MaintenanceTask {
  id: string;
  buildingId: string;
  buildingName?: string; // Nom du bâtiment pour faciliter l'affichage
  type: 'repair' | 'upgrade' | 'routine' | 'maintenance';
  description?: string;
  cost: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: BuildingPriority;
  createdAt: string;
  completionDate?: string;
  assignedTo?: string;
  notes?: string;
  estimatedCompletion?: string;
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
  estimatedEndDate?: Date;
  expectedCompletionYear?: number;
  actualCompletionDate?: Date;
  status: 'planned' | 'in_progress' | 'completed' | 'abandoned';
  progress: number;
  supervisor?: string;
  description?: string;
  workers?: number;
  approved?: boolean;
}

export type BuildingOwner = 'public' | 'private' | 'religious' | 'state' | 'imperial';
