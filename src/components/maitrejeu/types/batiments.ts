export enum BuildingType {
  TEMPLE = 'temple',
  FORUM = 'forum',
  BASILICA = 'basilica',
  THERMES = 'thermes',
  THEATRE = 'theatre',
  AMPHITHEATRE = 'amphitheatre',
  AQUEDUC = 'aqueduc',
  ROUTE = 'route',
  BATHHOUSE = 'bathhouse',
  BARRACKS = 'barracks',
  ACADEMY = 'academy',
  MARKET = 'market',
  WAREHOUSE = 'warehouse'
}

export enum BuildingStatus {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  AVERAGE = 'average',
  POOR = 'poor',
  FAIR = 'fair',
  RUINED = 'ruined',
  DAMAGED = 'damaged',
  UNDER_CONSTRUCTION = 'under_construction',
  UNDER_RENOVATION = 'under_renovation'
}

export enum BuildingPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum BuildingOwner {
  REPUBLIC = 'republic',
  SENATORIAL = 'senatorial',
  RELIGIOUS = 'religious',
  MILITARY = 'military',
  PRIVATE = 'private'
}

export interface BuildingOwnerInfo {
  id: string;
  name: string;
  type: 'senateur' | 'famille' | 'public' | 'temple';
}

export interface BuildingFilter {
  type?: BuildingType | string;
  status?: string;
  minCondition?: number;
  maxCondition?: number;
  location?: string;
  owner?: string;
  search?: string;
  types?: string[];
  locations?: string[];
  minRevenue?: number;
  maxMaintenance?: number;
  searchTerm?: string;
}

export interface Building {
  id: string;
  name: string;
  type: BuildingType | string;
  location: string;
  condition: number;
  status: string;
  value: number;
  maintenance: number;
  constructionDate?: Date | string;
  lastMaintenance?: Date | string;
  owner?: BuildingOwnerInfo | string;
  description?: string;
  workers?: number;
  income?: number;
  maintenanceLevel?: number;
  revenue?: number;
  capacity?: number;
  cost?: number;
  constructionYear?: number;
}

export interface BuildingCreationData {
  name: string;
  type: BuildingType | string;
  location: string;
  condition: number;
  status: string;
  value: number;
  maintenance: number;
  constructionDate?: Date | string;
  lastMaintenance?: Date | string;
  owner?: BuildingOwnerInfo | string;
  description?: string;
  workers?: number;
  revenue?: number;
  capacity?: number;
  cost?: number;
  constructionYear?: number;
}

export interface ConstructionProject {
  id: string;
  buildingTypeId: string;
  name: string;
  location: string;
  estimatedCost: number;
  duration: number; // in years
  progress: number; // 0-100
  startedYear?: number;
  expectedCompletionYear?: number;
  benefits: string[];
  sponsors: string[];
  approved: boolean;
  proposedBy?: string; // Magistrate who proposed the project
  requiredResources?: {
    stone?: number;
    timber?: number;
    marble?: number;
    labor?: number;
  };
  buildingType?: string;
  startDate?: Date;
  supervisor?: string;
  status?: string;
  description?: string;
}

export interface MaintenanceTask {
  id: string;
  buildingId: string;
  buildingName: string;
  type: 'repair' | 'maintenance' | 'upgrade' | 'routine';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
  cost: number;
  duration: number; // in days
  startDate: string;
  completionDate?: string;
  priority: BuildingPriority;
  assignedWorkers?: number;
}
