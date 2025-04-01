

// Types pour les bâtiments

export type BuildingType = 'temple' | 'villa' | 'domus' | 'insula' | 'forum' | 'baths' | 'theater' | 'amphitheater' | 'senate' | 'basilica' | 'market' | 'warehouse' | 'workshop' | 'port' | 'aqueduct' | 'road' | 'bridge' | 'military' | 'other' | 'wall';

export type BuildingStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'ruins' | 'construction' | 'renovation' | 'average' | 'damaged' | 'ruined' | 'under_construction';

export type BuildingPriority = 'high' | 'medium' | 'low' | 'critical';

export type BuildingOwner = 'république' | 'privé' | 'religieux' | 'autre';

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  location: string;
  value: number;
  maintenance: number;
  maintenanceCost: number;
  condition: number;
  description: string;
  status: BuildingStatus;
  constructionYear: number;
  cost: number;
  revenue: number;
  workers?: number;
  maxWorkers?: number;
  securityLevel?: number;
  maintenanceLevel?: number;
  upgrades?: any[];
  income?: number;
  capacity?: number;
  purchaseDate?: Date;
  // Propriétés additionnelles pour compatibilité
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
    season: string;
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
  workers: number;
  description?: string;
  estimatedCost?: number;
  responsibleMagistrate?: string;
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
  description: string;
  source: string;
  year?: number;
  season?: string;
  taxRate?: number;
  collectedBy?: string;
}

export interface BuildingCreationData {
  name: string;
  type: BuildingType;
  location: string;
  maintenanceCost: number;
  value: number;
  condition: number;
  description: string;
  constructionYear: number;
  cost: number;
  revenue: number;
  status?: BuildingStatus;
  workers?: number;
  capacity?: number;
  owner?: string;
  income?: number;
}

export interface PublicBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (building: BuildingCreationData) => void;
  building?: Building;
}

