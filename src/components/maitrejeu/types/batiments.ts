
// Types pour les bâtiments

export type BuildingType = 'temple' | 'villa' | 'domus' | 'insula' | 'forum' | 'baths' | 'theater' | 'amphitheater' | 'senate' | 'basilica' | 'market' | 'warehouse' | 'workshop' | 'port' | 'aqueduct' | 'road' | 'bridge' | 'military' | 'other' | 'wall';

export type BuildingStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'ruins' | 'construction' | 'renovation' | 'average' | 'damaged' | 'ruined' | 'under_construction';

export type BuildingPriority = 'high' | 'medium' | 'low' | 'critical';

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  location: string;
  value: number;
  maintenance: number;
  maintenanceCost: number;
  condition: number;
  workers?: number;
  maxWorkers?: number;
  securityLevel?: number;
  maintenanceLevel?: number;
  status?: BuildingStatus;
  upgrades?: any[];
  income?: number;
  description?: string;
  purchaseDate?: Date;
  constructionYear?: number;
  revenue?: number;
  // Propriétés additionnelles pour compatibilité
  cost?: number;
  capacity?: number;
  owner?: string;
  buildingType?: string;
  size?: number | string;
}

export interface MaintenanceTask {
  id: string;
  buildingId: string;
  buildingName: string;
  description: string;
  estimatedCost: number;
  priority: BuildingPriority;
  deadline: {
    year: number;
    season: Season;
  };
  status: string;
  startDate?: Date;
}

export interface MaintenanceRecord {
  id: string;
  buildingId: string;
  date: Date;
  cost: number;
  description: string;
  workersAssigned: number;
  completionDate?: Date;
  status: string;
}

export interface ConstructionProject {
  id: string;
  name: string;
  type: BuildingType;
  location: string;
  cost: number;
  progress: number;
  startDate: any;
  estimatedEndDate: any;
  status: string;
  responsibleMagistrate?: string;
  workers: number;
  description?: string;
  estimatedCost?: number;
  expectedCompletionYear?: number;
  buildingType?: string;
  buildingName?: string;
  totalCost?: number;
  sponsor?: string;
  approved?: boolean;
}

export interface BuildingFilter {
  types: string[];
  locations: string[];
  status: string;
  minRevenue: number;
  maxMaintenance: number;
  searchTerm: string;
}

export interface BuildingRevenueRecord {
  id: string;
  buildingId: string;
  amount: number;
  date: Date;
  source: string;
  description: string;
  year?: number;
  season?: string;
  taxRate?: number;
}

export interface BuildingCreationData {
  name: string;
  type: BuildingType;
  location: string;
  maintenanceCost: number;
  value: number;
  condition: number;
  workers?: number;
  status?: BuildingStatus;
  description?: string;
  constructionYear?: number;
  cost?: number;
  capacity?: number;
  owner?: string;
}

export interface PublicBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (building: BuildingCreationData) => void;
  building?: Building;
}

export type BuildingOwner = 'république' | 'privé' | 'religieux' | 'autre';
