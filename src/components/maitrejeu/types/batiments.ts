
import { GameDate } from './common';

export type BuildingType = 'temple' | 'forum' | 'market' | 'villa' | 'domus' | 'insula' | 'warehouse' | 'baths' | 'theater' | 'port' | 'aqueduct' | 'road' | 'wall' | 'barracks' | 'palace' | 'senate' | 'other';

export type BuildingStatus = 'excellent' | 'good' | 'damaged' | 'poor' | 'ruined';

export type BuildingOwner = 'république' | 'private' | 'temple' | 'military';

export type MaintenanceLevel = 'minor' | 'moderate' | 'major';

export type BuildingPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  location: string;
  status: BuildingStatus;
  constructionYear: number;
  description: string;
  cost: number;
  maintenanceCost: number;
  revenue: number;
  capacity: number;
  owner: BuildingOwner;
  lastMaintenance?: GameDate;
  condition?: string;
}

export interface BuildingCreationData {
  name: string;
  type: BuildingType;
  location: string;
  status?: BuildingStatus;
  constructionYear: number;
  description: string;
  cost: number;
  maintenanceCost: number;
  revenue: number;
  capacity: number;
  owner: BuildingOwner;
}

export interface ConstructionProject {
  id: string;
  name: string;
  buildingName?: string;
  buildingType?: BuildingType;
  location: string;
  description: string;
  estimatedCost: number;
  expectedCompletionYear: number;
  startDate?: GameDate;
  sponsor?: string;
  approved: boolean;
  progress: number;
  estimatedCompletionDate?: GameDate;
  duration?: number;
  cost?: number;
  totalCost?: number;
}

export interface MaintenanceTask {
  id: string;
  buildingId: string;
  buildingName: string;
  description: string;
  estimatedCost: number;
  priority: BuildingPriority;
  deadline?: GameDate;
  assignedTeam?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  notes?: string;
  startDate?: GameDate;
}

export interface MaintenanceRecord {
  id: string;
  buildingId: string;
  date: GameDate;
  cost: number;
  description: string;
  performedBy: string;
  repairLevel: MaintenanceLevel;
  previousStatus: BuildingStatus;
  newStatus: BuildingStatus;
}

export interface BuildingRevenueRecord {
  id: string;
  buildingId: string;
  year: number;
  season: string;
  amount: number;
  source: string;
  taxRate: number;
  collectedBy: string;
}

export interface PublicBuildingData {
  id: string;
  name: string;
  type: BuildingType;
  description: string;
  constructionCost: number;
  constructionTime: number;
  maintenanceCost: number;
  revenueGeneration: number;
  effects: Record<string, number>;
  unlockRequirements?: Record<string, any>;
  isUnlocked: boolean;
}
