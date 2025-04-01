
export type BuildingType = 
  'domus' | 'villa' | 'temple' | 'forum' | 'warehouse' | 'shop' | 
  'tavern' | 'bath' | 'theater' | 'stadium' | 'farm' | 'mine' | 
  'urban' | 'rural' | 'religious' | 'other';

export type BuildingStatus = 
  'excellent' | 'good' | 'average' | 'poor' | 'ruined' | 
  'under_construction' | 'planned' | 'abandoned';

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  location: string;
  owner?: string;  // Rendu optionnel pour résoudre le conflit de types
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
}

export interface BuildingCreationData extends Omit<Building, 'id'> {
  income?: number;
}

export interface MaintenanceTask {
  id: string;
  buildingId: string;
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
  estimatedCompletionDate: Date;
  actualCompletionDate?: Date;
  status: 'planned' | 'in_progress' | 'completed' | 'abandoned';
  progress: number; // 0-100
  supervisor?: string;
  description?: string;
}
