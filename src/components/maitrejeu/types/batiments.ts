
import { GameDate, Season } from "./common";

export enum BuildingType {
  TEMPLE = 'temple',
  FORUM = 'forum',
  BATHS = 'baths',
  MARKET = 'market',
  THEATRE = 'theatre',
  VILLA = 'villa',
  DOMUS = 'domus',
  FARM = 'farm',
  WAREHOUSE = 'warehouse',
  WORKSHOP = 'workshop',
  MINE = 'mine',
  PORT = 'port',
  AQUEDUCT = 'aqueduct',
  MILITARY = 'military',
  INFRASTRUCTURE = 'infrastructure',
  ADMINISTRATIVE = 'administrative',
  OTHER = 'other'
}

export enum BuildingStatus {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  AVERAGE = 'average',
  FAIR = 'fair',
  POOR = 'poor',
  DAMAGED = 'damaged',
  RUINED = 'ruined',
  UNDER_CONSTRUCTION = 'under_construction',
  UNDER_RENOVATION = 'under_renovation',
  PLANNED = 'planned'
}

export enum BuildingPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  location: string;
  description: string;
  owner: string;
  value: number;
  maintenanceCost: number;
  maintenance: number;
  condition: number;
  status: BuildingStatus;
  constructionYear: number;
  cost: number;
  revenue: number;
  capacity: number;
}

export interface BuildingCreationData {
  name: string;
  type: BuildingType;
  location: string;
  description?: string;
  owner?: string;
  value?: number;
  maintenanceCost?: number;
  maintenance?: number;
  condition?: number;
  status?: BuildingStatus;
  constructionYear?: number;
  cost?: number;
  revenue?: number;
  capacity?: number;
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
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  completionDate?: string;
  priority?: BuildingPriority;
}

export interface ConstructionProject {
  id: string;
  name: string;
  type: BuildingType;
  location: string;
  description: string;
  supervisor: string;
  estimatedCost: number;
  cost: number;
  startDate: Date;
  estimatedCompletion: Date;
  expectedCompletionYear: number;
  status: 'planned' | 'in_progress' | 'completed' | 'abandoned';
  progress: number;
  workers: number;
  slaves: number;
  approved?: boolean;
}
