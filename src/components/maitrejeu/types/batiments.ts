
export interface Building {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  owner?: string;
  constructionDate?: Date;
  lastMaintenance?: Date;
  description?: string;
  
  // Propriétés obligatoires pour la gestion des bâtiments
  value: number;
  maintenanceCost: number;
  condition: number;
  
  // Propriétés optionnelles pour la gestion
  income?: number;
  capacity?: number;
  staff?: number;
  slaves?: number;
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
}

export interface ConstructionProject {
  id: string;
  name: string;
  type: string;
  location: string;
  cost: number;
  startDate: string;
  estimatedCompletion: string;
  progress: number;
  status: string;
  workers: number;
  slaves: number;
  overseer?: string;
  description?: string;
}
