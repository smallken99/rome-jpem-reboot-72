
export interface Building {
  id: string;
  name: string;
  type: string;
  location: string;
  status: BuildingStatus;
  owner?: string;
  constructionDate?: Date;
  lastMaintenance?: Date;
  description: string;
  
  // Required properties for building management
  value: number;
  maintenanceCost: number;
  condition: number;
  
  // Additional required properties
  constructionYear: number;
  cost: number;
  maintenance: number;
  revenue: number;
  
  // Optional properties for management
  income?: number;
  capacity?: number;
  staff?: number;
  slaves?: number;
  workers?: number;
  upgrades?: string[];
  maintenanceLevel?: number;
  securityLevel?: number;
  hasTax?: boolean;
  taxRate?: number;
  isFortified?: boolean;
  maintenanceEnabled?: boolean;
}

export enum BuildingType {
  TEMPLE = 'temple',
  VILLA = 'villa',
  DOMUS = 'domus',
  INSULA = 'insula',
  FORUM = 'forum',
  BATHHOUSE = 'bathhouse',
  THEATRE = 'theatre',
  WAREHOUSE = 'warehouse',
  FARM = 'farm',
  WORKSHOP = 'workshop',
  MARKET = 'market',
  ACADEMY = 'academy',
  BARRACKS = 'barracks'
}

export enum BuildingStatus {
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
  DAMAGED = 'damaged',
  RUINED = 'ruined',
  UNDER_CONSTRUCTION = 'under_construction',
  UNDER_RENOVATION = 'under_renovation',
  EXCELLENT = 'excellent',
  AVERAGE = 'average'
}

export enum BuildingOwner {
  REPUBLIC = 'république',
  PRIVATE = 'private',
  SENATORIAL = 'senatorial',
  RELIGIOUS = 'religious',
  MILITARY = 'military'
}

export interface BuildingCreationData {
  name: string;
  type: string;
  location: string;
  owner?: string;
  description: string;
  status?: BuildingStatus;
  maintenanceCost?: number;
  value?: number;
  condition?: number;
  constructionYear?: number;
  cost?: number;
  maintenance: number;
  revenue?: number;
  capacity?: number;
  income?: number;
  workers?: number;
}

export enum BuildingPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface BuildingFilter {
  types: string[];
  locations: string[];
  status: string;
  minRevenue: number;
  maxMaintenance: number;
  searchTerm: string;
}

export interface MaintenanceTask {
  id: string;
  buildingId: string;
  buildingName?: string;
  type: 'repair' | 'upgrade' | 'routine' | 'maintenance';
  description?: string;
  cost: number;
  duration: number;
  startDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedWorkers?: number;
  completionDate?: string;
  estimatedCompletion?: string;
  priority?: BuildingPriority;
}

export interface ConstructionProject {
  id: string;
  name: string;
  type: string;
  location: string;
  cost: number;
  startDate: string | Date;
  estimatedCompletion: string;
  progress: number;
  status: string;
  workers: number;
  slaves: number;
  overseer?: string;
  description?: string;
  supervisor?: string;
  expectedCompletionYear?: number;
  approved?: boolean;
  estimatedCost?: number;
}
