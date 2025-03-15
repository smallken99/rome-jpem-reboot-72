
import { GameDate } from './common';

export type BuildingType = 
  'temple' | 'basilica' | 'forum' | 'market' | 'aqueduct' | 
  'theater' | 'amphitheater' | 'circus' | 'bath' | 'bridge' | 
  'villa' | 'road' | 'port' | 'warehouse' | 'other';

export type BuildingStatus = 
  'excellent' | 'good' | 'damaged' | 'poor' | 'ruined' | 'under_construction';

export type BuildingOwner = 
  'république' | 'sénat' | 'censeur' | 'édile' | 'private' | string;

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
  nextMaintenanceNeeded?: GameDate;
}

export interface ConstructionProject {
  id: string;
  buildingId?: string;
  buildingType: BuildingType;
  name: string;
  location: string;
  description: string;
  cost: number;
  estimatedCompletionDate: GameDate;
  startDate: GameDate;
  progress: number; // 0-100
  approved: boolean;
  sponsor: string;
  workers: number;
  expectedCompletionYear: number;
}

export interface MaintenanceRecord {
  id: string;
  buildingId: string;
  date: GameDate;
  cost: number;
  description: string;
  performedBy: string;
  repairLevel: 'minor' | 'moderate' | 'major' | 'restoration';
  previousStatus: BuildingStatus;
  newStatus: BuildingStatus;
}

export interface RevenueRecord {
  id: string;
  buildingId: string;
  year: number;
  season: string;
  amount: number;
  source: string;
  taxRate: number;
  collectedBy: string;
}

export interface BuildingCreationData {
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
}
