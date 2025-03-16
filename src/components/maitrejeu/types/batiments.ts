
import { GameDate } from './common';

export type BuildingType = 
  'temple' | 'basilica' | 'forum' | 'market' | 'aqueduct' | 
  'theater' | 'amphitheater' | 'circus' | 'bath' | 'bridge' | 
  'villa' | 'road' | 'port' | 'warehouse' | 'other';

export type BuildingStatus = 
  'excellent' | 'good' | 'damaged' | 'poor' | 'ruined' | 'under_construction' | 'average';

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
  condition?: 'good' | 'fair' | 'poor' | 'critical';
  totalCost?: number;
}

export interface ConstructionProject {
  id: string;
  buildingId?: string;
  buildingType: BuildingType;
  name: string;
  buildingName?: string;
  location: string;
  description: string;
  cost: number;
  totalCost?: number;
  estimatedCompletionDate: GameDate;
  startDate: GameDate;
  progress: number; // 0-100
  approved: boolean;
  sponsor: string;
  workers: number;
  expectedCompletionYear: number;
  payments?: number[];
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

export interface MaintenanceTask {
  id: string;
  buildingId: string;
  buildingName: string;
  deadline: GameDate;
  estimatedCost: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
  description: string;
  startDate?: GameDate;
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

export interface BuildingCondition {
  excellent: number;
  good: number;
  damaged: number;
  poor: number;
  ruined: number;
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

export interface BuildingsByType {
  temples: Building[];
  government: Building[];
  entertainment: Building[];
  infrastructure: Building[];
  commercial: Building[];
  other: Building[];
}

export interface BuildingDetailsProps {
  building: Building;
  onEdit: () => void;
  onDelete: () => void;
  onMaintenance: () => void;
}

export interface PublicBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (building: BuildingCreationData) => void;
  building?: Building;
}

export interface BuildingsListProps {
  buildings?: Building[];
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (id: string) => void;
}

export interface PublicBuildingData {
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
