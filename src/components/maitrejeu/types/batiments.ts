
export type BuildingType = 'temple' | 'villa' | 'domus' | 'insula' | 'forum' | 'baths' | 'theater' | 'amphitheater' | 'senate' | 'basilica' | 'market' | 'warehouse' | 'workshop' | 'port' | 'aqueduct' | 'road' | 'bridge' | 'military' | 'other';

export type BuildingStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'ruins' | 'construction' | 'renovation';

export type BuildingPriority = 'high' | 'medium' | 'low' | 'critical';

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  location: string;
  value: number;
  maintenance: number;
  maintenanceCost: number; // Champ manquant ajouté ici
  condition: number;
  workers?: number;
  securityLevel?: number;
  maintenanceLevel?: number;
  status?: BuildingStatus;
  upgrades?: any[];
  income?: number;
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
}

export interface BuildingFilter {
  types: string[];
  locations: string[];
  status: string;
  minRevenue: number;
  maxMaintenance: number;
  searchTerm: string;
}
